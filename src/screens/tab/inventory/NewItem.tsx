import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, Image, View } from "react-native";
import { ID } from "react-native-appwrite/src";
import DatePicker from "react-native-date-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { StyledSafeAreaView } from "~/components";
import RHFInput from "~/components/rhfInput";
import { Button, Input, Text } from "~/components/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { H2, P } from "~/components/ui/typography";
import { useCreateProduct } from "~/hooks/product";
import { storage } from "~/lib/appWrite";
import { cn } from "~/lib/utils";
import { NewItemSchema } from "~/lib/validation";

export default function NewItem({ navigation }) {
  const insets = useSafeAreaInsets();
  const createProductMutation = useCreateProduct();
  const [imageUploading, setImageUploading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [openManufactureDate, setOpenManufactureDate] = React.useState(false);
  const [openExpiryDate, setOpenExpiryDate] = React.useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom + 10,
    left: 12,
    right: 12,
  };

  const formMethods = useForm({
    resolver: zodResolver(NewItemSchema),
    defaultValues: {
      price: "0",
      minStockLevel: "0",
      itemName: "",
      nafdacNumber: "",
      quantity: "0",
      expDate: new Date().toDateString(),
      manufactureDate: new Date().toDateString(),
    },
  });

  const [image, quantity, price, manufactureDate, expiryDate] = formMethods.watch([
    "image",
    "quantity",
    "price",
    "manufactureDate",
    "expDate",
  ]);

  const pickImage = async () => {
    if (!status?.granted) {
      const res = await requestPermission();
      if (!res.granted) {
        alert("Camera permission denied");
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];

      formMethods.setValue("image", {
        name: image.fileName!,
        type: image.mimeType!,
        uri: image.uri,
        size: image.fileSize!,
      });
    } else {
      alert("You did not select any image.");
    }

    setOpen(false);
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];

      formMethods.setValue("image", {
        name: image.fileName!,
        type: image.mimeType!,
        uri: image.uri,
        size: image.fileSize!,
      });
    } else {
      alert("You did not select any image.");
    }

    setOpen(false);
  };

  const onSubmit: SubmitHandler<NewItemSchema> = async (data) => {
    try {
      const ext = data.image.name?.split(".")?.pop();
      const filename = `${data.itemName}-${Date.now()}.${ext}`;

      const pickedFile = {
        ...data.image,
        name: filename,
      };

      setImageUploading(true);
      const uploaded = await storage.createFile(
        "images",
        ID.unique(),
        pickedFile,
        undefined,
        (progress) => {
          console.log(progress.chunksUploaded);
        }
      );

      setImageUploading(false);

      const url = storage.getFilePreview("images", uploaded.$id);

      createProductMutation.mutate(
        {
          ...data,
          imageId: uploaded.$id,
          imageUrl: url,
        },
        {
          onSuccess: () => {
            formMethods.reset();
          },
          onError: () => {
            // delete file
            storage.deleteFile("images", uploaded.$id);
          },
        }
      );
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error occurred while uploading image",
      });
    }
  };

  return (
    <StyledSafeAreaView className="!p-4">
      <FormProvider {...formMethods}>
        <View className="mb-3 flex-row items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="flex-row items-center gap-1 p-0"
            onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} />

            <Text>Back</Text>
          </Button>
        </View>

        <H2>New Item</H2>

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-4">
            <Label nativeID="image">Item Image</Label>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className={cn(
                    "!h-44 w-full border border-gray-400 bg-white py-4",
                    formMethods.formState.errors.image && "border-red-500"
                  )}>
                  {image ? (
                    <Image
                      source={{ uri: image?.uri }}
                      className="size-full"
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <>
                      <Feather name="plus-circle" size={28} />
                      <Text>Choose an image</Text>
                    </>
                  )}
                </Button>
              </DialogTrigger>
              {formMethods.formState.errors.image ? (
                <P className="pl-1 text-red-500">{formMethods.formState.errors.image?.message}</P>
              ) : null}
              <DialogContent className="mx-4 min-w-[90%]">
                <DialogHeader>
                  <DialogTitle>Select option</DialogTitle>
                </DialogHeader>

                <View className="">
                  <Button variant="ghost" className="items-start" onPress={openCamera}>
                    <Text>Take a photo</Text>
                  </Button>
                  <Button variant="ghost" className="items-start" onPress={pickImage}>
                    <Text>Choose from gallery</Text>
                  </Button>
                </View>
              </DialogContent>
            </Dialog>
          </View>

          <View className="mb-4">
            <Label nativeID="itemName">Item Name</Label>

            <RHFInput name="itemName" autoCapitalize="words" />
          </View>

          <View className="mb-4">
            <Label nativeID="nafdacNo">NAFDAC Number</Label>

            <RHFInput name="nafdacNumber" />
          </View>

          <View style={{ flexDirection: "row", gap: 15 }}>
            <View className="mb-4 flex-1">
              <Label nativeID="quantity">Quantity</Label>
              <RHFInput keyboardType="numeric" selectTextOnFocus name="quantity" />
            </View>
            <View className="mb-4 flex-1">
              <Label nativeID="minLevel">Minimum Stock Level</Label>
              <RHFInput keyboardType="numeric" selectTextOnFocus name="minStockLevel" />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 15 }}>
            <View className="mb-4 flex-1">
              <Label nativeID="price">Price</Label>
              <RHFInput keyboardType="numeric" selectTextOnFocus name="price" />
            </View>
            <View className="mb-4 flex-1">
              <Label nativeID="totalValue">Total Value</Label>
              <Input readOnly value={(+price * +quantity).toString()} />
            </View>
          </View>

          <View className="mb-4">
            <Label nativeID="manufactureDate">Manufacture Date</Label>
            <View className="relative">
              <RHFInput
                name="manufactureDate"
                readOnly
                className="pr-3"
                IconRight={
                  <Button size="icon" variant="ghost" onPress={() => setOpenManufactureDate(true)}>
                    <MaterialCommunityIcons name="calendar-clock" size={24} />
                  </Button>
                }
              />
              <DatePicker
                modal
                open={openManufactureDate}
                mode="date"
                date={new Date(manufactureDate)}
                onConfirm={(date) => {
                  formMethods.setValue("manufactureDate", date.toDateString());
                  setOpenManufactureDate(false);
                }}
                onCancel={() => {
                  setOpenManufactureDate(false);
                }}
              />
            </View>
          </View>
          <View className="mb-4">
            <Label nativeID="expDate">Expiry Date</Label>
            <View className="relative">
              <RHFInput
                readOnly
                name="expDate"
                className="pr-3"
                IconRight={
                  <Button size="icon" variant="ghost" onPress={() => setOpenExpiryDate(true)}>
                    <MaterialCommunityIcons name="calendar-alert" size={24} />
                  </Button>
                }
              />
              <DatePicker
                modal
                open={openExpiryDate}
                mode="date"
                date={new Date(expiryDate)}
                onConfirm={(date) => {
                  formMethods.setValue("expDate", date.toDateString());
                  setOpenExpiryDate(false);
                }}
                onCancel={() => {
                  setOpenExpiryDate(false);
                }}
              />
            </View>
          </View>

          <Button
            onPress={formMethods.handleSubmit(onSubmit)}
            className="flex-row items-center justify-center gap-2"
            disabled={createProductMutation.isPending || imageUploading}>
            {(createProductMutation.isPending || imageUploading) && <ActivityIndicator />}
            <Text className="uppercase ">Save</Text>
          </Button>

          {/* <View className="mb-4">
            <Label nativeID="Category">Category</Label>
            <Select>
              <SelectTrigger className="">
                <SelectValue
                  className="native:text-lg font-PoppinsMedium text-sm text-foreground"
                  placeholder="Select category"
                />
                </SelectTrigger>
              <SelectContent className="w-full" insets={contentInsets}>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectSeparator />
                  {emojisWithIcons.map((item) => (
                    <SelectItem key={item.title} label={item.title} value={item.value}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </View> */}
        </KeyboardAwareScrollView>
      </FormProvider>
    </StyledSafeAreaView>
  );
}

const emojisWithIcons = [
  { title: "Pain Reliever", value: "pain-reliever" },
  { title: "Anti-Relaxants", value: "anti-relaxants" },
  { title: "Antibiotics", value: "antibiotics" },
  { title: "Hormonal Medications", value: "hormonal-medications" },
  { title: "Vitamins", value: "vitamins" },
  { title: "Other", value: "other" },
];
