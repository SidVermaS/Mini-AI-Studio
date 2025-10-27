"use client";
import { useTheme } from "@/contexts/ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import SunOutlined from "@ant-design/icons/SunOutlined";
import MoonOutlined from "@ant-design/icons/MoonOutlined";
import HistoryOutlined from "@ant-design/icons/HistoryOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import NavOption from "./components/NavOption";
import { useAuth } from "@/contexts";
import ProfileDropdown from "./components/NavDropdown";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) return null;
  return (
    <header className="flex fixed flex-row justify-between bg-white w-full px-10 py-4 items-center z-5">
      <Link href="/">
        <Image
          src="/brand-name.png"
          alt="modelia"
          width={100}
          height={100}
          className="w-29 h-6"
        />
      </Link>
      <nav className="flex flex-row">
        <ul className="flex flex-row gap-7">
          <li>
            <Link href="/">
              <NavOption
                icon={<HomeOutlined className="text-[14px]" />}
                text="Home"
              />
            </Link>
          </li>
          <li>
            <Link href="/history">
              <NavOption
                icon={<HistoryOutlined className="text-[14px]" />}
                text="History"
              />
            </Link>
          </li>
          <li onClick={toggleTheme}>
            <NavOption
              icon={
                theme === "dark" ? (
                  <MoonOutlined className="text-[14px]" />
                ) : (
                  <SunOutlined className="text-[14px]" />
                )
              }
              text="Theme"
            />
          </li>
          <ProfileDropdown>
            <li>
              <NavOption
                icon={<UserOutlined className="text-[14px]" />}
                text="Profile"
              />
            </li>
          </ProfileDropdown>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
