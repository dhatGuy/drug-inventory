import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { TextInputProps, View } from "react-native";

import { Button, Input } from "./ui";
import { Textarea } from "./ui/textarea";
import { P } from "./ui/typography";

import { cn } from "~/lib/utils";

type InputProps = TextInputProps & {
  placeholder: string;
  name: string;
  rules?: RegisterOptions;
  isPassword?: boolean;
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
            <Input
              {...props}
              placeholder={placeholder}
              autoCapitalize="none"
              className={cn(isError && "border-red-500", className)}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
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
