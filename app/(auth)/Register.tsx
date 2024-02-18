import { formData } from "@/Types/FormTypes";
import InputField from "@/components/Form/InputField";
import { Link } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  return (
    <View className="h-screen w-full ">
      <SafeAreaView>
        <View className="h-screen bg-slate-50 w-full flex px-10 pt-20 ">
          <View className="space-y-2">
            <Text className="text-3xl font-bold">Hi there</Text>
            <Text>Register to Ecommerce App</Text>
          </View>

          <View className="my-6 h-max">
            <InputField
              title="Enter username"
              errors={errors}
              error={errors.username}
              keyboardType={"default"}
              name={"username"}
              control={control}
            />

            <InputField
              title="Enter your email"
              errors={errors}
              error={errors.email}
              keyboardType={"email-address"}
              name={"email"}
              control={control}
            />
            <InputField
              errors={errors}
              title="Enter your password"
              error={errors.password}
              keyboardType={"default"}
              secureTextEntry={true}
              name={"email"}
              control={control}
            />
            <InputField
              errors={errors}
              error={errors.password}
              title="Confirm your password"
              keyboardType={"default"}
              secureTextEntry={true}
              name={"email"}
              control={control}
            />

            <TouchableOpacity
              //   onPress={handleSubmit(onSubmit)}
              className="bg-black dark:bg-white w-full flex items-center mt-1   px-4 py-3 rounded-lg"
            >
              <Text className="text-white ">Submit</Text>
            </TouchableOpacity>
          </View>
          <View className="w-full p-0 flex-row items-center justify-center gap-4">
            <Text>Already have an account ?</Text>
            <Link href={"/(auth)/"} className="text-blue-400">
              Login
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Register;
