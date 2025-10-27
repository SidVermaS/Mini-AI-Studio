"use client";

import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerAPI } from "@/lib";
import { AuthRegister, AuthRegisterSchema } from "@/schemas";
import Link from "next/link";
import { APIResError, ErrorCode } from "@/errors";
import { useAuth } from "@/contexts";

export default function RegisterPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AuthRegister>({
    resolver: zodResolver(AuthRegisterSchema),
  });
  const onSubmit = async (data: AuthRegister) => {
    if (isSubmitting) return;
    try {
      const _result = await registerAPI(data);
      await login({ email: data.email, password: data.password });
    } catch (error) {
      if (error instanceof APIResError) {
        if (new Set<ErrorCode>(["AUTH002", "AUTH003"]).has(error.code!)) {
          setError("email", { message: error.message });
        }
        // else if (
        //   new Set<ErrorCode>(["AUTH001", "AUTH006"]).has(error.code!)
        // ) {
        //   setError("confirm_password", { message: error.message });
        // }
        else {
          setError("confirm_password", { message: error.message });
        }
      }
    }
  };
  // Wrap handleSubmit to prevent multiple submissions
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      if (isSubmitting) {
        e.preventDefault();
        return;
      }
      handleSubmit(onSubmit)(e);
    };
  return (
    <div className="bg-var-primary h-screen pt-12 px-2 md:pt-0 md:px-0 md:flex md:justify-center md:items-center ">
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
          <form className="mt-2" onSubmit={handleFormSubmit}>
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
            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
              className="mt-7"
              text="Sign up"
            />
            <div className="mt-2 text-center text-sm">
              <span className="text-var-quaternary">
                Already have an account?{" "}
              </span>
              <Link href="/login" className="text-var-tertiary font-semibold">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
