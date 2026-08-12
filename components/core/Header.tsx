'use client';

import { useEffect, useMemo, useState } from "react";
import { Link, Menu, X } from "lucide-react";
import StyledLink from "./StyledLink";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Games", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ];

  const [ developmentMode, setDevelopmentMode ] = useState(false);
  
  useEffect( () => {
    const host = window.location.hostname;
    setDevelopmentMode(host !== 'custommade.games')
  })  

  return (
    <header className="sticky top-0 z-50 bg-blue-700/80 backdrop-blur text-white">
      { developmentMode && 
        <div className="bg-yellow-200 flex justify-center">
          <span className="text-center text-black">You are on the DEVELOPMENT version of custommade.games. This version is highly unstable, your data may be lost! <StyledLink href={"https://custommade.games"}>Return to safety</StyledLink></span>
        </div>
      }
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-16 px-4 sm:px-6 lg:px-8 justify-between md:justify-normal">
        {/* Logo */}
        <a
          href="/"
          className="text-xl font-bold tracking-tight"
        >
          CustomMade Games
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-gray-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 transition hover:bg-gray-100/20 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-96 border-t border-gray-200" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col bg-white px-4 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-gray-700 transition hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}