"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import { useRouter } from "next/navigation";
import { authLogin } from "@/lib/api/AuthApi";
import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(1, "Username field cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function LoginForm() {
  const router = useRouter();
  const [_, setToken] = useLocalStorage("token", "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await authLogin(values);

      if (response.status === 200) {
        const token = response.data.token;
        setToken(token);
        router.push("/");
      } else {
        toast.error("Ada yang salah", {
          description: "Ada sesuatu yang salah",
        });
      }
      toast.success("Berhasil masuk", {
        description: "Anda akan dipindahkan ke halaman utama",
      });
    } catch (error) {
      console.log(error)
      toast.error("Ada yang salah", {
        description: "Ada sesuatu yang salah",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>LogoIpsum</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              disabled={isSubmitting}
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input username"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isSubmitting}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Input password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isSubmitting ? (
              <Button disabled className="cursor-pointer" type="submit">
                <LoaderCircleIcon
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
                Login...
              </Button>
            ) : (
              <Button type="submit" className="cursor-pointer">
                Login
              </Button>
            )}

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline text-primary">
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}