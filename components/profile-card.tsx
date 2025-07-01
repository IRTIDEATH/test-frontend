"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";
import { useEffectOnce, useLocalStorage } from "react-use";
import { userDetail } from "@/lib/api/UserApi";

interface Session {
  username: string;
  role: string;
};

const ProfileCard = () => {
    const [session, setSession] = useState<Session | undefined>(undefined);
      const [token, _] = useLocalStorage("token", "");
    
      async function fetchUserDetail() {
        const response = await userDetail(token);
    
        console.log(response);
    
        if (response.status === 200) {
          setSession(response.data);
        } else {
          console.log("Error fetch user profile");
        }
      }
    
      useEffectOnce(() => {
        fetchUserDetail().then(() =>
          console.log("User detail fetched successfully")
        );
      });
  return (
    <Card className="w-full max-w-md bg-transparent border-0 shadow-none">
      <CardHeader className="text-center mb-2">
        <CardTitle className="text-xl font-semibold text-secondary-foreground">
          User Profile
        </CardTitle>
        <div className="flex justify-center mt-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={session?.username ?? ""}
              alt={session?.username ?? ""}
            />
            <AvatarFallback className="text-blue-800 text-xl font-medium bg-accent">
              {session?.username[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mb-7">
          <div className="bg-secondary px-4 py-3.5 rounded-md border-border border-2 w-full flex items-center justify-between">
            <div className="w-[100px] flex items-center justify-between">
              <h1 className="font-semibold text-[16px]">Username</h1>
              <span className="col-span-14">:</span>
            </div>
            <p className="text-secondary-foreground text-[16px]">
              {session?.username}
            </p>
          </div>
          <div className="bg-secondary px-4 py-3.5 rounded-md border-border border-2 w-full flex items-center justify-between">
            <div className="w-[100px] flex items-center justify-between">
              <h1 className="font-semibold text-[16px]">Password</h1>
              <span className="col-span-14">:</span>
            </div>
            <p className="text-secondary-foreground text-[16px]">********</p>
          </div>
          <div className="bg-secondary px-4 py-3.5 rounded-md border-border border-2 w-full flex items-center justify-between">
            <div className="w-[100px] flex items-center justify-between">
              <h1 className="font-semibold text-[16px]">Role</h1>
              <span className="col-span-14">:</span>
            </div>
            <p className="text-secondary-foreground text-[16px]">
              {session?.role}
            </p>
          </div>
        </div>
        <Button
          asChild
          size={"lg"}
          className="w-full text-[16px] font-medium cursor-pointer"
        >
          <Link aria-label="Navigate to home" href={"/"}>
            Back to home
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProfileCard