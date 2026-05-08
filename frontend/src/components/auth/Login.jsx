import React from "react";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { BellElectric, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import z from "zod";
import { useAuth } from "@/context/AuthContext";

const loginValidate = z.object({
  email: z.string().email({ message: "Enter Valid Email ID" }),
  password: z
    .string()
    .min(8, { message: "minimum 8" })
    .regex(/[A-Z]/, { message: "At lest one Upper Case" })
    .regex(/[a-z]/, { message: "At lest one lower case" })
    .regex(/[0-9]/, { message: "At lest one digit" })
    .regex(/[!@#$%&]/, { message: "At lest one special char" }),
});

function login() {
  const { signIn } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginValidate),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    signIn(data);
    form.reset();
  };

  return (
    <div className="flex h-full">
      <div className="w-full sm:w-1/2 flex justify-center items-center sm:h-full border">
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[95%] sm:w-[70%] border p-2 rounded-lg bg-[#fdfbef]"
        >
          <div className="mb-6 text-center">
            <header className="h-1/20 text-2xl font-semibold text-blue-600 mb-2">
              StoryPulse
            </header>
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="text-xs">Enter your credentials to access your technical feed.</p>
          </div>
          <FieldGroup>
            
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email ID</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Email ID"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="w-full flex flex-col gap-1">
              <Button className="w-full cursor-pointer" type="submit">
                LOGIN
              </Button>
              <p className="text-sm text-end px-2">
                <Link to="/login">
                  Don't have an account?{" "}
                  <span className="text-blue-700 underline"> Sign Up </span>
                </Link>
              </p>
            </div>
          </FieldGroup>
        </form>
      </div>

      <div className="hidden w-1/2 sm:flex h-full justify-center items-center">
        <div
          className="w-[60%] h-7/10 flex flex-col 
        justify-center gap-4"
        >
          <div className="flex flex-col border p-2 gap-2 bg-[#fdfbef] rounded-md">
            <h1 className="font-semibold">Stary ahead of the pulse.</h1>
            <p className="text-sm">
              Join a community of curious minds. Get the most relevant technical
              insights, curated and discussed by experts.
            </p>
          </div>

          <div className="flex border py-2 bg-[#fdfbef] rounded-md">
            <div className="w-25 flex justify-center items-center">
              <div className="border p-1 rounded-md bg-[#fdfbef]">
                <BellElectric className="text-blue-700" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold">Real-time Curation</h1>
              <p className="text-xs">
                Aggregate from the werb's most technical sources in miliseconds.
              </p>
            </div>
          </div>

          <div className="flex border py-2 bg-[#fdfbef] rounded-md">
            <div className="w-25 flex justify-center items-center">
              <div className="border p-1 rounded-md bg-[#FFF6E8]">
                <MessageCircle className="text-[#855300]" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold">Noise-free Discourse</h1>
              <p className="text-xs">
                High-signal discussions focused on data and technical merit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
