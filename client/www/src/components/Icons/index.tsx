"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcons from "./icons/HomeIcon";
import SettingsIcons from "./icons/SettingsIcon";
import UserIcon from "./icons/UserIcon";
import VideoIcon from "./icons/VideosIcon";

const iconsMap = {
  home: <HomeIcons />,
  videos: <VideoIcon />,
  users: <UserIcon />,
  settings: <SettingsIcons />,
};

export default function Icons({ icon }: { icon: keyof typeof iconsMap }) {
  const pathname = usePathname();

  const path = {
    home: "/",
    videos: "/room",
    users: "/users",
    settings: "/settings",
  }[icon];

  return (
    <Link href={path} data-active={path === pathname && true}>
      {iconsMap[icon]}
    </Link>
  );
}
