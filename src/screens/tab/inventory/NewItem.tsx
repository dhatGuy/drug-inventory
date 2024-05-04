import { Feather, MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useStyles } from "react-native-unistyles";

import { stylesheet } from "./NewItem.style";

import { StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";
export default function NewItem({ navigation }) {
  const { styles } = useStyles(stylesheet);

  return (
    <StyledSafeAreaView style={styles.container}>
      <View style={styles.nav}>
        <Button variant="ghost" style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} />

          <Text>Back</Text>
        </Button>

        <Button style={styles.saveBtn}>
          <Text>Save</Text>
        </Button>
      </View>

      <Text style={styles.title}>New Item</Text>

      <View style={styles.imageSection}>
        <Text style={styles.inputLabel}>Item Image</Text>
        <Button variant="secondary" style={styles.imagePlaceholder}>
          <Feather name="plus-circle" size={28} />
          <Text>Choose an image</Text>
        </Button>
      </View>

      <View style={styles.input}>
        <Text style={styles.inputLabel}>Item Name</Text>

        <Input />
      </View>

      <View style={styles.input}>
        <Text style={styles.inputLabel}>NAFDAC Number</Text>

        <Input />
      </View>

      <View style={{ flexDirection: "row", gap: 15 }}>
        <View style={[styles.input, { flex: 1 }]}>
          <Text style={styles.inputLabel}>Quantity</Text>
          <Input />
        </View>
        <View style={[styles.input, { flex: 1 }]}>
          <Text style={styles.inputLabel}>Min Level (Low Stock)</Text>
          <Input />
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 15 }}>
        <View style={[styles.input, { flex: 1 }]}>
          <Text style={styles.inputLabel}>Price</Text>
          <Input />
        </View>
        <View style={[styles.input, { flex: 1 }]}>
          <Text style={styles.inputLabel}>Total Value</Text>
          <Input />
        </View>
      </View>

      <View style={[styles.input, { flex: 1 }]}>
        <Text style={styles.inputLabel}>Expiry Date</Text>
        <Input />
      </View>

      <View style={[styles.input, { flex: 1 }]}>
        <Text style={styles.inputLabel}>Category</Text>
        <SelectDropdown
          data={emojisWithIcons}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem?.title || "Select your mood"}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={styles.dropdownItemStyle(isSelected)}>
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                {isSelected ? <Feather name="check-circle" size={24} /> : null}
              </View>
            );
          }}
          search
          searchPlaceHolder="Search here"
          searchInputTxtStyle={styles.dropdownSearchTxt}
          dropdownStyle={styles.dropdownMenuStyle}
          renderSearchInputLeftIcon={() => <Feather name="search" size={20} />}
        />
      </View>
    </StyledSafeAreaView>
  );
}

const emojisWithIcons = [
  { title: "Pain Reliever", value: "pain-reliever" },
  { title: "Anti-Relaxants", value: "anti-relaxants" },
  { title: "Antibiotics", value: "antibiotics" },
  { title: "Hormonal Medications", value: "hormonal-medications" },
];
