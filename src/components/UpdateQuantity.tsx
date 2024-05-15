import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, View } from "react-native";

import { Input } from "./ui";
import { H4 } from "./ui/typography";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";
import { ProductSchema } from "~/entities/product.schema";
import { useCreateStockHistory } from "~/hooks/stockHistory.hook";

function UpdateQuantity({
  item,
  open,
  setOpen,
}: {
  item: ProductSchema;
  open: boolean;
  setOpen: any;
}) {
  const [qty, setQty] = useState(0);
  const mutation = useCreateStockHistory();
  const onSubmit = () => {
    mutation.mutate(
      {
        quantity: qty,
        closingStock: item.quantity,
        product: item.$id,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setQty(0);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) setQty(0);
        setOpen(state);
      }}>
      <DialogTrigger asChild>
        <Button className="flex-row">
          <Text>Update Stock (quantity)</Text>
          <Feather style={{ position: "absolute", right: 10 }} name="plus" color="#fff" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Quantity</DialogTitle>
        </DialogHeader>

        <View>
          <View className="flex-row items-center gap-2">
            <Image
              source={{
                height: 60,
                width: 60,
                uri: item.imageUrl,
              }}
              className="rounded-sm"
            />
            <View>
              <H4 className="mb-1 font-PoppinsSemiBold text-[#131313]">{item.name}</H4>
              <Text className="text-sm text-[#7f7f7f]">
                Units left: <Text className="font-PoppinsSemiBold text-lg">{item.quantity}</Text>
              </Text>
              <Text className="text-sm text-[#7f7f7f]">
                Expires: {new Date(item.expiryDate).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View className="mt-4 w-full flex-row items-center justify-around">
            <Text className="ml-4">Stock Out</Text>
            <Button
              className=""
              variant="secondary"
              size="icon"
              onPress={() => setQty(qty - 1)}
              disabled={item.quantity + qty <= 0}>
              <Feather name="minus" size={20} />
            </Button>
            <Input
              value={qty.toString()}
              onChange={(e) => setQty(parseInt(e.nativeEvent.text, 10) || 0)}
              className="rounded-none border-0 border-b-2 border-gray-300 py-0"
              style={{ minWidth: 70, height: "auto" }}
              placeholderClassName="text-center"
              textAlign="center"
              selectTextOnFocus
              keyboardType="numeric"
              placeholder="0"
            />
            <Button className="" variant="secondary" size="icon" onPress={() => setQty(qty + 1)}>
              <Feather name="plus" size={20} />
            </Button>
            <Text>Stock In</Text>
          </View>
        </View>

        <DialogFooter>
          <Button
            onPress={onSubmit}
            disabled={mutation.isPending || qty === 0 || item.quantity + qty < 0}>
            <Text>SAVE</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateQuantity;
