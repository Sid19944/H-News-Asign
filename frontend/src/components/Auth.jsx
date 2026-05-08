import React from "react";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { BellElectric, MessageCircle, TruckElectric } from "lucide-react";

function Auth() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {};

  return (
    <div className="flex h-full">
      <div className="w-full sm:w-1/2 flex justify-center items-center sm:h-full border">
        <form
          id="register-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[95%] sm:w-[70%] border p-2 rounded-lg bg-[#fdfbef]"
        >
          <div className="mb-6 text-center">
            <header className="h-1/20 text-2xl font-semibold text-blue-600 mb-2">
              StoryPulse
            </header>
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p className="text-xs">Start your journey with StroyPulse today.</p>
          </div>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    confirmPassword
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Confirm Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button>SIGN UP</Button>
          </FieldGroup>
        </form>
      </div>

      <div className="hidden w-1/2 sm:flex h-full justify-center items-center">
        <div className="w-[60%] h-7/10 flex flex-col 
        justify-center gap-4">
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

export default Auth;
