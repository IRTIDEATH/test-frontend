"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useEffectOnce, useLocalStorage } from "react-use";
import { userDetail } from "@/lib/api/UserApi";
import { useState } from "react";

type Session = {
  username: string;
  role: string;
};

export function HomeUserMenu({ scrolled }: { scrolled: boolean }) {
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
    <div className="flex items-center gap-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Avatar className="relative h-10 w-10 rounded-full cursor-pointer">
            <AvatarImage
              src={session?.username ?? ""}
              alt={session?.username ?? ""}
            />
            <AvatarFallback className="bg-accent text-lg text-accent-foreground">
              {session?.username[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[12rem]" align="end" forceMount>
          <DropdownMenuLabel className="text-muted-foreground">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              aria-label="Navigate to Profile"
              href={`/profile`}
              className="flex items-center gap-2"
            >
              <User /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button className="flex items-center gap-2 w-full">
              <LogOut /> Log out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span
        className={`hidden md:block underline font-medium ${
          scrolled ? "text-secondary-foreground" : "text-primary-foreground"
        }`}
      >
        {session?.username}
      </span>
    </div>
  );
}
