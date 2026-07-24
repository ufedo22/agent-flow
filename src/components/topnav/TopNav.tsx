"use client"

import Image from "next/image"
import AuthButton  from "../auth/AuthButton"
import { ThemeSwitch } from "../theme/ThemeSwitch"
import { Button } from "../ui/button"



const TopNav = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b bg-white dark:bg-gray-900">
      {/* left logo */}
      <div className="flex items-center">
        <Image
          src="/icons/logo.png"
          alt="logo"
          width={120}
          height={20}
          className="h-12 w-auto"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Theme switcher */}

        {/* Auth Button */}
        <div className="hidden sm:flex gap-2 ml-2 hover:bg-muted p-2 rounded-md cursor-pointer">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}

export default TopNav