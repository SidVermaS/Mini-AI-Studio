"use client";
import { useTheme } from "@/contexts/ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import SunOutlined from "@ant-design/icons/SunOutlined";
import MoonOutlined from "@ant-design/icons/MoonOutlined";
import HistoryOutlined from "@ant-design/icons/HistoryOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import HomeOutlined from "@ant-design/icons/HomeOutlined";
import MenuOutlined from "@ant-design/icons/MenuOutlined";
import CloseOutlined from "@ant-design/icons/CloseOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import NavOption from "./components/NavOption";
import { useAuth } from "@/contexts";
import ProfileDropdown from "./components/NavDropdown";
import { useState, useEffect } from "react";
import useScreenWidth from "@/hooks/useScreenWidth";
import { BREAKPOINTS } from "@/consts/common/responsive";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { width } = useScreenWidth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = width < BREAKPOINTS.md;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    closeMobileMenu();
    logout();
  };

  return (
    <header className="flex fixed flex-row justify-between bg-white w-full px-4 md:px-10 py-4 items-center z-50 shadow-sm">
      <Link href="/" onClick={closeMobileMenu}>
        <Image
          src="/brand-name.png"
          alt="modelia"
          width={100}
          height={100}
          className="w-24 md:w-29 h-5 md:h-6"
        />
      </Link>

      {/* Show nothing until mounted to prevent hydration mismatch */}
      {!mounted ? (
        <div className="w-8 h-8" />
      ) : (
        <>
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex flex-row">
              <ul className="flex flex-row gap-7 items-center">
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
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="text-var-secondary hover:text-var-secondary-hover z-50 p-2 transition-transform duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div
                className={`transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                {isMobileMenuOpen ? (
                  <CloseOutlined className="text-[20px]" />
                ) : (
                  <MenuOutlined className="text-[20px]" />
                )}
              </div>
            </button>
          )}

          {/* Mobile Navigation Menu */}
          {isMobile && (
            <>
              {/* Backdrop */}
              <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
                  isMobileMenuOpen ? "opacity-50 visible" : "opacity-0 invisible"
                }`}
                onClick={closeMobileMenu}
              />
              {/* Slide-in menu */}
              <div
                className={`fixed inset-y-0 right-0 w-64 bg-white z-50 shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
                  isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                {/* Close button inside menu */}
                <div className="flex justify-end px-4 pt-4">
                  <button
                    onClick={closeMobileMenu}
                    className="text-var-secondary hover:text-var-secondary-hover p-2 rounded-full hover:bg-gray-100 transition-colors duration-150"
                    aria-label="Close menu"
                  >
                    <CloseOutlined className="text-[20px]" />
                  </button>
                </div>

                <nav className="flex flex-col px-4 py-2">
                  <ul className="flex flex-col gap-2">
                    <li
                      onClick={closeMobileMenu}
                      className="transition-all duration-200 hover:translate-x-1"
                    >
                      <Link href="/">
                        <NavOption
                          icon={<HomeOutlined className="text-[16px]" />}
                          text="Home"
                          className="py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                        />
                      </Link>
                    </li>
                    <li
                      onClick={closeMobileMenu}
                      className="transition-all duration-200 hover:translate-x-1"
                    >
                      <Link href="/history">
                        <NavOption
                          icon={<HistoryOutlined className="text-[16px]" />}
                          text="History"
                          className="py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                        />
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        toggleTheme();
                        closeMobileMenu();
                      }}
                      className="transition-all duration-200 hover:translate-x-1"
                    >
                      <NavOption
                        icon={
                          theme === "dark" ? (
                            <MoonOutlined className="text-[16px]" />
                          ) : (
                            <SunOutlined className="text-[16px]" />
                          )
                        }
                        text="Theme"
                        className="py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                      />
                    </li>
                    <hr className="my-2" />
                    <li
                      onClick={closeMobileMenu}
                      className="transition-all duration-200 hover:translate-x-1"
                    >
                      <Link href="/profile">
                        <NavOption
                          icon={<UserOutlined className="text-[16px]" />}
                          text="Profile"
                          className="py-3 px-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                        />
                      </Link>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="transition-all duration-200 hover:translate-x-1"
                    >
                      <NavOption
                        icon={<LogoutOutlined className="text-[16px]" />}
                        text="Logout"
                        className="py-3 px-2 hover:bg-gray-100 rounded-lg text-red-600 transition-colors duration-150"
                      />
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
