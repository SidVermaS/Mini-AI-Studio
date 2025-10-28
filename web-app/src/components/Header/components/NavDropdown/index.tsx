"use client";

import {  useEffect, useRef, useState } from "react";
import DropdownItem from "./DropdownItem";
import { useAuth } from "@/contexts";
import { useRouter } from "next/navigation";

export type NavDropdownProps = {
  children?: React.ReactNode;
};
const NavDropdown = ({ children }: NavDropdownProps) => {
  const router = useRouter();
  const {logout}=useAuth()
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
  const handleProfileClick = () => { 
    router.push("/profile");
    setIsDropdownOpen(false);
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        className=" z-7"
        type="button"
        onClick={toggleDropdown}
        data-dropdown-toggle="fiat-currency-dropdown-menu"
      >
        {children}
      </button>
      {isDropdownOpen && (
        <div className="absolute top-10 right-8 " ref={dropdownRef}>
          <ul
            id="fiat-currency-dropdown-menu"
            className="bg-var-secondary flex flex-col shadow-lg rounded-lg py-1  gap-1"
          >
            <DropdownItem text="Profile" onClick={handleProfileClick} />
            <DropdownItem text="Logout" onClick={logout} />
          </ul>
        </div>
      )}
    </>
  );
};

export default NavDropdown;
