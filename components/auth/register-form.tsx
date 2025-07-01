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
import { useRouter } from "next/navigation";
import { authRegister } from "@/lib/api/AuthApi";
import { LoaderCircleIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(1, "Username field cannot be empty"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.string().min(1, "Please select a role"),
});

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await authRegister(values);

      if (response.status === 200) {
        router.push("/login");
      } else {
        toast.error("Ada yang salah", {
          description: "Ada sesuatu yang salah",
        });
      }
      toast.success("Berhasil register", {
        description: "User telah berhasil register",
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

            <FormField
              disabled={isSubmitting}
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
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
                Register...
              </Button>
            ) : (
              <Button type="submit" className="cursor-pointer">
                Register
              </Button>
            )}

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline text-primary">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}