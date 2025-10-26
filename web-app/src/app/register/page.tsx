"use client";

import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerAPI } from "@/lib";
import { AuthRegister, AuthRegisterSchema } from "@/schemas";
import Link from "next/link";

export default function RegisterPage() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AuthRegister>({
    resolver: zodResolver(AuthRegisterSchema),
  });
  const onSubmit = async (data: AuthRegister) => {

    try {
      const _result=await registerAPI(data);
      console.log(_result);
      
    } catch (_error) {
      console.log(_error);
    }
  };
  
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
          <div className="">Sign up to Modelia</div>
        </div>
        <div>
          <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("name")}
              labelClassName="mt-5"
              id="name"
              type="text"
              placeholder="Enter name..."
              text="Name"
              errorText={errors.name?.message}
            />
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
            <Input
              {...register("confirm_password")}
              labelClassName="mt-5"
              id="confirm_password"
              type="password"
              placeholder="Confirm password..."
              text="Confirm Password"
              errorText={errors.confirm_password?.message}
            />
            <Button type='submit' className="mt-7" text="Sign up" />
            <div className="mt-2 text-center text-sm">
              <span className="text-var-quaternary">Already have an account? </span>
              <Link
                href="/login"
                className="text-var-tertiary font-semibold"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
