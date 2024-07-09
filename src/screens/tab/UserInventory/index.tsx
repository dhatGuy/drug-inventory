import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { StyledSafeAreaView } from "~/components";
import { Button } from "~/components/ui";
import { H3, H4, P } from "~/components/ui/typography";
import { useAddUserInventory } from "~/hooks/userInventory.hook";
import { userInventoryQueryOptions } from "~/lib/queryOptions";
import { cn } from "~/lib/utils";

const Item = ({ item }) => {
  const addToInventory = useAddUserInventory();

  const onAddToInventory = () => {
    addToInventory.mutate(
      {
        product: item.product?.$id,
        user: item.user?.$id,
        productId: item.product?.$id,
        userId: item.user?.$id,
        action: "update",
        id: item.$id,
      },
      {
        onError(error) {
          console.log(error);
        },
      }
    );
  };

  return (
    <View className="flex-row items-center gap-3 !px-0 active:bg-transparent">
      <View className={cn("size-[50px] rounded-xl items-center justify-center")}>
        <Image source={{ uri: item.product.imageUrl }} className="size-full object-cover" />
      </View>

      <View className="">
        <H4 className="mb-1 font-PoppinsSemiBold text-[#131313]">{item.product.name}</H4>

        <Text className="text-[#7f7f7f]">
          Expires: {new Date(item.product.expiryDate).toLocaleDateString()}
        </Text>
      </View>

      <Button variant="destructive" size="icon" className="ml-auto" onPress={onAddToInventory}>
        <Feather name="trash-2" size={24} color="#fff" />
      </Button>
    </View>
  );
};

export default function UserInventory() {
  const { data, isPending } = useQuery(userInventoryQueryOptions);

  return (
    <StyledSafeAreaView>
      <FlatList
        data={data?.documents}
        className=""
        ListHeaderComponent={<H3>Your Inventory</H3>}
        contentContainerClassName="gap-4 flex-1"
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={
          <View className="items-center flex-1 justify-center">
            {isPending ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <H4 className="text-lg font-PoppinsSemiBold text-center">
                  Your inventory is empty
                </H4>
                <P className="text-center text-gray-500">
                  Once you add an item to your inventory, it will appear here
                </P>
              </>
            )}
          </View>
        }
      />
    </StyledSafeAreaView>
  );
}
