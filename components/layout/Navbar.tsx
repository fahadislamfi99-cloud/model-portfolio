"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "WORK" },
  { href: "/videos", label: "VIDEOS" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/contact", label: "CONTACT" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EFE8E6] py-5">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start focus:outline-none">
            <span className="font-editorial-serif text-2xl tracking-[0.16em] font-normal text-[#1A1718]">
              COMATOZZE
            </span>
            <span className="text-[8px] tracking-[0.35em] text-[#C98A90] font-sans font-medium uppercase -mt-0.5">
              MODEL
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-9 text-[11px] tracking-[0.22em] font-sans">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    active
                      ? "text-[#D85E78] font-semibold"
                      : "text-[#3D3A3B] hover:text-[#1A1718]"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#D85E78]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Button */}
          <div className="hidden lg:block">
            <a
              href="https://fansly.com/comatozze"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[10px] tracking-[0.25em] font-sans font-semibold uppercase px-6 py-2.5 bg-[#D85E78] text-white hover:bg-[#C24B65] transition-colors shadow-sm"
            >
              VISIT FANSLY
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1 text-[#1A1718] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#FAF8F5] flex flex-col justify-between p-8 transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
      >
        <div className="pt-24 flex flex-col space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#7A7273] font-sans">
            NAVIGATION
          </span>
          <nav className="flex flex-col space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-editorial-serif text-3xl tracking-wide ${
                  pathname === link.href ? "text-[#D85E78]" : "text-[#1A1718]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-[#E8DFDC]">
          <a
            href="https://fansly.com/comatozze"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3.5 bg-[#D85E78] text-white text-xs tracking-[0.2em] font-sans uppercase font-medium"
          >
            VISIT FANSLY
          </a>
        </div>
      </div>
    </>
  );
}
