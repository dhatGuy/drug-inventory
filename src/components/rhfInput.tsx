import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { TextInputProps, View } from "react-native";

import { Button, Input } from "./ui";
import { Textarea } from "./ui/textarea";
import { P } from "./ui/typography";

import { cn } from "~/lib/utils";

type InputProps = TextInputProps & {
  placeholder?: string;
  name: string;
  rules?: RegisterOptions;
  isPassword?: boolean;
  IconRight?: ReactNode;
};

const RHFInput = ({ name, placeholder, rules, className, ...props }: InputProps) => {
  const { control, formState } = useFormContext();
  const [show, setShow] = useState(false);
  const isError = Boolean(formState.errors[name]);

  return (
    <View className="relative flex gap-0.5">
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return props.multiline ? (
            <Textarea
              {...props}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              className={cn(isError && "border-red-500", className)}
            />
          ) : props.secureTextEntry ? (
            <View className="relative">
              <Input
                {...props}
                className={cn(isError && "border-red-500", className)}
                secureTextEntry={!show}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder={placeholder}
                autoCapitalize="none"
              />
              <Button
                className="absolute inset-y-0 right-2 h-full"
                variant="ghost"
                size="icon"
                onPress={() => setShow((state) => !state)}>
                {show ? (
                  <MaterialCommunityIcons size={18} name="eye-off-outline" />
                ) : (
                  <MaterialCommunityIcons size={18} name="eye-outline" />
                )}
              </Button>
            </View>
          ) : (
            <View className="relative">
              <Input
                {...props}
                placeholder={placeholder}
                className={cn(isError && "border-red-500", className)}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
              <View className="absolute inset-y-0 right-2 h-full flex-row items-center">
                {props.IconRight}
              </View>
            </View>
          );
        }}
        name={name}
      />
      {formState.errors[name] ? (
        <P className="pl-1 text-red-500">{formState.errors[name]?.message}</P>
      ) : null}
    </View>
  );
};

export default RHFInput;
