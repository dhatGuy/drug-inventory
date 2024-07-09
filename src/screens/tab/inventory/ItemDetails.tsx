import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StyledSafeAreaView } from "~/components";
import UpdateQuantity from "~/components/UpdateQuantity";
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
} from "~/components/ui/alert-dialog";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import { TextClassContext } from "~/components/ui/text";
import { H3 } from "~/components/ui/typography";
import { useDeleteProduct, useGetProduct } from "~/hooks/product";
import { useAddUserInventory } from "~/hooks/userInventory.hook";
import {
  masNumberQueryByProductIdOptions,
  userInventoryQueryByIdOptions,
} from "~/lib/queryOptions";
import { useUser } from "~/store/authStore";

const ItemDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const user = useUser();
  const { data, isPending, isError, error } = useGetProduct(id);
  const deleteMutation = useDeleteProduct(id);
  const [open, setOpen] = React.useState(false);
  const [openQty, setOpenQty] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const insets = useSafeAreaInsets();
  const userInventory = useQuery(userInventoryQueryByIdOptions(id, user?.$id!));
  const addToInventory = useAddUserInventory();
  const masNumberQuery = useQuery(masNumberQueryByProductIdOptions(id));

  const contentInsets = {
    top: insets.top + 10,
    bottom: insets.bottom + 10,
    left: 12,
    right: 12,
  };

  const onAddToInventory = () => {
    addToInventory.mutate({
      product: data?.$id,
      user: user?.$id,
      productId: data?.$id,
      userId: user?.$id,
      action: userInventory?.data?.total === 0 ? "create" : "update",
      id: userInventory?.data?.documents[0]?.$id,
    });
  };

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
    <StyledSafeAreaView className="!p-0">
      <View className="flex-row items-center justify-between px-2">
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

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MaterialCommunityIcons name="dots-vertical" size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent insets={contentInsets} className="w-56">
            {user?.labels.includes("admin") && (
              <DropdownMenuItem onPress={() => navigation.navigate("UpdateItem", { id })}>
                <Feather name="edit" size={16} />
                <Text>Update Item</Text>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onPress={() => navigation.navigate("Reviews", { id })}>
              <Feather name="star" size={16} />
              <Text>Reviews</Text>
            </DropdownMenuItem>
            {user?.labels.includes("admin") && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onPress={() => setOpenDelete(true)}>
                  <Feather name="trash-2" size={16} />
                  <Text className="!text-lg">Delete Item</Text>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </View>

      <Separator className="" />

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
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

      <Tabs.Container
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            scrollEnabled
            labelStyle={{
              fontFamily: "Poppins_700Bold",
            }}
          />
        )}
        renderHeader={() => (
          <View className="px-2 pb-2">
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
            {user?.labels.includes("admin") ? (
              <UpdateQuantity open={openQty} setOpen={setOpenQty} item={data} />
            ) : null}

            {!user?.labels.length ? (
              <Button onPress={onAddToInventory} className="flex-row gap-3">
                <Text>
                  {userInventory?.data?.total ?? 0 > 0
                    ? "Remove from Inventory"
                    : "Add to Inventory"}
                </Text>
              </Button>
            ) : null}
          </View>
        )}>
        <Tabs.Tab name="Overview">
          <Tabs.ScrollView contentContainerClassName="gap-4 mt-4 px-4">
            <TextClassContext.Provider value="text-lg">
              <Card className="p-3">
                <Text className="text-gray-600">
                  Minimum stock level: <Text>{data.minStockLevel.toLocaleString()}</Text>
                </Text>
                <Text>Quantity in stock: {data.quantity.toLocaleString()}</Text>
              </Card>

              <Card className="p-3">
                <Text>Price: &#8358;{data.price.toLocaleString()}</Text>
                <Text>Total value: &#8358;{(data.price * data.quantity).toLocaleString()}</Text>
              </Card>

              <Card className="p-3">
                <Text>NAFDAC number: {data.nafdacNumber}</Text>
                <Text>Manufacture date: {new Date(data.manufactureDate).toLocaleDateString()}</Text>
                <Text>Expiry date: {new Date(data.expiryDate).toLocaleDateString()}</Text>
              </Card>
              <View />
            </TextClassContext.Provider>
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Stock History">
          <Tabs.FlatList
            data={data.stockHistory}
            ItemSeparatorComponent={() => <Separator />}
            contentContainerClassName="gap-4 mt-4 px-4"
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between">
                <Text className="font-PoppinsSemiBold">
                  {new Date(item.$createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                <View className="items-end">
                  <Text className="font-PoppinsSemiBold text-lg text-gray-600">
                    <MaterialCommunityIcons
                      name={item.quantity > 0 ? "arrow-up" : "arrow-down"}
                      size={16}
                    />
                    {item.quantity}
                  </Text>
                  <Text className="text-gray-600">Closing Stock: {item.closingStock}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.$id}
            showsVerticalScrollIndicator={false}
          />
        </Tabs.Tab>
        <Tabs.Tab name="MAS Number">
          <Tabs.FlatList
            data={masNumberQuery.data?.documents ?? []}
            ItemSeparatorComponent={() => <Separator />}
            contentContainerClassName="gap-4 mt-4 px-4"
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between">
                <Text className="font-PoppinsSemiBold">
                  {new Date(item.$createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.$id}
            showsVerticalScrollIndicator={false}
          />
        </Tabs.Tab>
      </Tabs.Container>
    </StyledSafeAreaView>
  );
};
export default ItemDetails;
