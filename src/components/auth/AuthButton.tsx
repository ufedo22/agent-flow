"use client";

import { LogOutIcon, PaletteIcon } from "lucide-react";
// import { signOut } from "next-auth/react";

// import { cn } from "@/lib/utils";

// import UserAvatar from "./user-avatar";
// import ThemeSwitch from "./theme-switch";

// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@//components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "@//lib/utils";
// import UserAvatar from "./UserAvatar";
import { ThemeSwitch } from "../theme/ThemeSwitch";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";

const UserAvatar = ({
  user,
  className,
}: {
  user: {image:string | null | undefined, email:string}
  className?: string;
}) => {
  const [imgUrl, setImgUrl] = useState<string>(" ");

  useEffect(() => {
    if (user?.image) setImgUrl(user.image) 
  }, [user]);
  return (
    <Avatar className={cn(className)}>
      <AvatarImage alt="avatar" src={imgUrl} />
      <AvatarFallback>
        {user?.email.match(/^([^@]+)/)?.[1] ?? "(No Name)"}
      </AvatarFallback>
    </Avatar>
  );
};

const AuthButton = () => {

const {data:session} = useSession()

  // const signOut = async () => {
  //   console.log("...")
  // }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full p-0">
            <UserAvatar
              user={{ email: "", image: session?.user?.image }}
              className="w-8 h-8 bg-muted-foreground/20 text-primary"
            />
          </Button>
        }
      />

      <DropdownMenuContent
        align="end"
        className="ml-4 flex w-64 flex-col gap-1 p-1 text-sm"
      >
        {/* User */}
        <div className="flex items-center gap-2 p-2">
          <UserAvatar
            user={{
              email: "",
              image: session?.user?.image,
            }}
            className="h-10 w-10 bg-muted-foreground/20 text-primary"
          />

          <div className="flex flex-col gap-1">
            <span className="font-bold">{session?.user?.name}</span>

            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              {session?.user?.email}
              {/* {user.confirmed_at && (
                <Icons.badgeCheck className="w-3 h-3 text-green-600" />
              )} */}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Theme */}
        <div className="flex items-center justify-between rounded-md px-2 py-2">
          <div className="flex items-center gap-2">
            <PaletteIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Theme</span>
          </div>

          <ThemeSwitch />
        </div>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={() => signOut()}
          className={cn("flex cursor-pointer items-center gap-2")}
        >
          <LogOutIcon className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
