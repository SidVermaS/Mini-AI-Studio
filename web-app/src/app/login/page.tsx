"use client";

import Image from "next/image";
import Input from "@/components/Input";
import { useAuth } from "@/contexts";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLogin, AuthLoginSchema } from "@/schemas";

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AuthLogin>({
    resolver: zodResolver(AuthLoginSchema),
  });
  const onSubmit = async (data: AuthLogin) => {
    console.log("1 onSubmit");

    try {
      await login(data);
    } catch (_error) {
      console.log(_error);
    }
  };
  console.log('1 errors',errors);
  
  return (
    <div className="bg-var-primary h-screen flex justify-center items-center ">
      <div className="rounded-lg shadow-xl p-5 min-w-2/5 min-h-2/5">
        <div className=" text-center">
          <Image
            src="/logo.png"
            alt="modelia"
            width={300}
            height={300}
            className="mx-auto w-15 h-15"
          />
          <div className="">Log in to Modelia</div>
        </div>
        <div>
          <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email")}
              labelClassName="mt-5"
              id="email"
              type="email"
              placeholder="Enter email..."
              text="Email"
              errorText={errors.email?.message}
            />
            <Input
              {...register("password")}
              labelClassName="mt-5"
              id="password"
              type="password"
              placeholder="Enter password..."
              text="Password"
              errorText={errors.password?.message}
            />
            <Button className="mt-7" text="Log in" />
          </form>
        </div>
      </div>
    </div>
  );
}
