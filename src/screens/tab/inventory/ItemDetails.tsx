import { Feather } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";

import { StyledSafeAreaView } from "~/components";
import { Button, Text } from "~/components/ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TextClassContext } from "~/components/ui/text";
import { H3 } from "~/components/ui/typography";
import { useDeleteProduct, useGetProduct } from "~/hooks/product";
import { cn } from "~/lib/utils";

const ItemDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const { data, isPending, isError } = useGetProduct(id);
  const deleteMutation = useDeleteProduct(id);
  const [value, setValue] = React.useState("account");

  if (isPending) {
    return (
      <StyledSafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </StyledSafeAreaView>
    );
  }

  if (isError) {
    return (
      <StyledSafeAreaView className="flex-1 items-center justify-center">
        <Text>Something went wrong</Text>
      </StyledSafeAreaView>
    );
  }

  const onDelete = () => {
    deleteMutation.mutate(
      { imageId: data.imageId },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      }
    );
  };

  return (
    <StyledSafeAreaView className="gap-4">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            style={{ height: "auto" }}
            className="flex-row items-center p-2"
            onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} />
          </Button>
          <Text className="native:text-lg">Item Details</Text>
        </View>

        <View className="flex-row items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="flex-row items-center gap-1 p-1"
            onPress={() => navigation.navigate("UpdateItem", { id })}>
            <Feather name="edit" size={20} />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="flex-row items-center gap-1 p-1">
                <Feather name="trash-2" size={20} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <Text>Cancel</Text>
                </AlertDialogCancel>
                <AlertDialogAction disabled={deleteMutation.isPending} onPress={onDelete}>
                  {deleteMutation.isPending ? <ActivityIndicator /> : null}
                  <Text>{deleteMutation.isPending ? "Deleting..." : "Continue"}</Text>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="gap-4">
        <View className="flex-row gap-4 bg-white p-2 shadow-lg">
          <Image source={{ uri: data.imageUrl }} style={{ height: 80, width: 80 }} />

          <View className="flex-1">
            <H3 className="">{data.name}</H3>
            <Text className="text-[#7f7f7f]">{data.quantity} units left</Text>

            <Badge className="self-start py-2">
              <Text className="text-white">In Stock</Text>
            </Badge>
          </View>
        </View>

        <Button className="flex-row">
          <Text>Update Stock (quantity)</Text>
          <Feather style={{ position: "absolute", right: 10 }} name="plus" color="#fff" size={20} />
        </Button>

        <Tabs value={value} onValueChange={setValue} className="mx-auto w-full flex-col gap-1.5">
          <TabsList className={cn("w-full flex-row h-14")}>
            <TabsTrigger value="account" className="h-full flex-1 rounded-lg">
              <Text>Overview</Text>
            </TabsTrigger>
            <TabsTrigger value="password" className="h-full flex-1 rounded-lg">
              <Text>Stock History</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="gap-4">
            <TextClassContext.Provider value="text-lg">
              <Card className="p-3">
                <Text className="text-gray-600">
                  Minimum stock level: <Text>{data.minStockLevel}</Text>
                </Text>
                <Text>Quantity in stock: {data.quantity}</Text>
              </Card>

              <Card className="p-3">
                <Text>Price: &#8358;{data.price}</Text>
                <Text>Total value: &#8358;{data.price * data.quantity}</Text>
              </Card>

              <Card className="p-3">
                <Text>NAFDAC number: {data.nafdacNumber}</Text>
                <Text>Manufacture date: {new Date(data.manufactureDate).toLocaleDateString()}</Text>
                <Text>Expiry date: {new Date(data.expiryDate).toLocaleDateString()}</Text>
              </Card>
              <View />
            </TextClassContext.Provider>
          </TabsContent>
          <TabsContent value="password">
            <Card />
          </TabsContent>
        </Tabs>
      </ScrollView>
    </StyledSafeAreaView>
  );
};
export default ItemDetails;
