import { formData } from "@/Types/FormTypes";
import InputField from "@/components/Form/InputField";
import useAuthStore from "@/hooks/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const zodSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(2, { message: "password field is required" }),
});

const index = () => {
  const { setToken } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleLogin = useMutation({
    mutationFn: async (data: formData) => {
      const res = await axios.post(
        "http://192.168.29.18:4000/route/employee/login",
        data
      );
      return res;
    },
    onSuccess: async (res) => {
      setToken(res.data?.token);
      Alert.alert("Login successfully");
      router.replace("/home/");
    },
    onError: (err: Error) => {
      Alert.alert(err.message);
    },
  });

  const onSubmit = (data: formData) => {
    handleLogin.mutate(data);
  };

  return (
    <View>
      <SafeAreaView>
        <View className="h-screen w-full flex px-10 pt-20 ">
          <View className="space-y-2">
            <Text className="text-3xl font-bold">Welcome Back</Text>
            <Text>Login to Ecommerce App</Text>
          </View>

          <View className="my-6 h-max">
            <InputField
              title="Enter your email"
              keyboardType={"email-address"}
              name={"email"}
              error={errors.email}
              errors={errors}
              control={control}
            />
            <InputField
              title="Enter your password"
              keyboardType={"default"}
              secureTextEntry={true}
              name={"password"}
              error={errors.password}
              errors={errors}
              control={control}
            />

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="bg-black dark:bg-white w-full flex items-center mt-1   px-4 py-3 rounded-lg"
            >
              <Text className="text-white ">Submit</Text>
            </TouchableOpacity>
          </View>
          <View className="w-full p-0 flex-row items-center justify-center gap-4">
            <Text>Dont have an account ?</Text>
            <Link href={"/(auth)/Register"} className="text-blue-400">
              Register now
            </Link>
          </View>
          <Link
            href={"/home/"}
            className="bg-blue-500 text-white p-2 rounded-md text-center mt-2"
          >
            home page
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default index;
