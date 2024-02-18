import { formData } from "@/Types/FormTypes";
import { ErrorMessage } from "@hookform/error-message";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { KeyboardType, TextInput, View } from "react-native";
import { Text } from "react-native-paper";

interface InputProps {
  title: string;
  control: Control<formData>;
  keyboardType: KeyboardType;
  secureTextEntry?: boolean;
  name: "email" | "password" | "username";
  error: any;
  errors: any;
}

const InputField: FC<InputProps> = ({
  title,
  control,
  keyboardType,
  secureTextEntry = false,
  name,
  error,
  errors,
}) => {
  return (
    <View className="space-y-2 !mb-2 ">
      {/* <Text>{title}</Text> */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={` rounded-md  bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-3 px-2 mt-2  border-[.5px] border-gray-300 
            `}
            onChangeText={onChange}
            placeholder={title}
            keyboardType={keyboardType}
            // autoCorrect={autoComplete}
            secureTextEntry={secureTextEntry}
            value={value}
          />
        )}
        name={name}
      />
      <View className="h-max !pb-1">
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <Text className="text-sm font-semibold text-red-500">
              * {message}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default InputField;
