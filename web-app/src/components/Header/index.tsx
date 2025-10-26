"use client";
import { useTheme } from "@/contexts/ThemeProvider";
import Link from "next/link";
import SunOutlined from "@ant-design/icons/SunOutlined";
import MoonOutlined from "@ant-design/icons/MoonOutlined";
import HistoryOutlined from "@ant-design/icons/HistoryOutlined";
import NavOption from "./components/NavOption";
import { useAuth } from "@/contexts";
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  
  return (
    <header className="flex fixed flex-row justify-between bg-white w-full px-10 py-4">
      <Link href="/">modelia</Link>
      <nav className="flex flex-row">
        <ul className="flex flex-row">
          <li className="mr-10">
            <Link href="/history">
              <NavOption
                icon={<HistoryOutlined className="text-[14px]" />}
                text="History"
              />
            </Link>
          </li>
          <li className="" onClick={toggleTheme}>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
