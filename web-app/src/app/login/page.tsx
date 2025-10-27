"use client";

import Image from "next/image";
import Input from "@/components/Input";
import { useAuth } from "@/contexts";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AuthLogin, AuthLoginSchema } from "@/schemas";
import Link from "next/link";
import { pause } from "@/utils";
import { APIResError, ErrorCode } from "@/errors";

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
    if(isSubmitting) return;
    try {
      // await pause(10000)
      await login(data);
    } catch (error) {
      if (error instanceof APIResError) {
        if (new Set<ErrorCode>(["AUTH002"]).has(error.code!)) {
          setError("email", { message: error.message });
        } 
        // else if (new Set<ErrorCode>(["AUTH001",'AUTH006']).has(error.code!)) {
        //   setError("password", { message: error.message });
        // }
        else {
          setError("password", { message: error.message });
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
          <div className="">Log in to Modelia</div>
        </div>
        <div>
          <form className="mt-2" onSubmit={handleFormSubmit}>
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

            <Button
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="mt-7"
              text="Log in"
            />
            <div className="mt-2 text-center text-sm">
              <span className="text-var-quaternary">New user? </span>
              <Link
                href="/register"
                className="text-var-tertiary font-semibold"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
