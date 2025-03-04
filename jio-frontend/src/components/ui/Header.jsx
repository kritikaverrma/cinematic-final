"use client";

import Link from "next/link";
import Image from "next/image";
import { Crown, Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useRouter, usePathname } from "next/navigation";
import UserProfileSheet from "./user-profile-sheet";

export const navigation = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Tv Shows", href: "/tv" },
  { name: "Watchlist", href: "/watchlist" },
  { name: "Jio+", href: "/jio-plus" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="JioCinema Logo"
              width={136}
              height={36}
              className="md:h-9 md:max-w-[136px] max-w-24"
            />
            <span className="text-lg font-semibold ">Cinematic</span>
          </Link>

          {/* Premium Button */}
          <Link href="/subscription">
            <Button
              variant="outline"
              size="sm"
              className="hidden border-yellow-500 bg-transparent text-yellow-500 hover:bg-yellow-500/10 sm:inline-flex"
            >
              <Crown className="mr-2 h-4 w-4" />
              Go Premium
            </Button>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden flex-1 items-center justify-center md:flex">
          <ul className="flex space-x-6">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors hover:text-white/80
                    ${pathname === item.href ? "text-white" : "text-white/70"}
                    ${
                      pathname === item.href
                        ? "after:absolute after:-bottom-[17px] after:left-0 after:h-0.5 after:w-full after:bg-rose-500"
                        : ""
                    }
                  `}
                >
                  {item.name} {router.pathname}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search and Profile */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full max-w-[300px]">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-white/10 pl-8 text-sm text-white placeholder:text-white/50 focus-visible:ring-0"
              />
            </div>
          </div>
          <UserProfileSheet />
        </div>
      </div>
    </header>
  );
}

export default Header;
