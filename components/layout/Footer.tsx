import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF8F5] border-t border-[#EFE8E6] text-[#1A1718] py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand Left */}
          <div className="md:col-span-4 flex flex-col items-start">
            <span className="font-editorial-serif text-3xl tracking-[0.16em] font-normal text-[#1A1718]">
              COMATOZZE
            </span>
            <span className="text-[8px] tracking-[0.35em] text-[#C98A90] font-sans font-medium uppercase mt-0.5 mb-6">
              MODEL
            </span>
            <p className="text-xs text-[#7A7273] font-sans">
              © {currentYear} Comatozze. All rights reserved.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[9px] tracking-[0.25em] font-sans font-bold uppercase text-[#1A1718] block mb-3">
              NAVIGATION
            </span>
            <div className="flex flex-col space-y-1.5 text-xs text-[#7A7273] font-sans">
              <Link href="/" className="hover:text-[#D85E78]">Home</Link>
              <Link href="/about" className="hover:text-[#D85E78]">About</Link>
              <Link href="/work" className="hover:text-[#D85E78]">Work</Link>
              <Link href="/videos" className="hover:text-[#D85E78]">Videos</Link>
              <Link href="/gallery" className="hover:text-[#D85E78]">Gallery</Link>
              <Link href="/contact" className="hover:text-[#D85E78]">Contact</Link>
            </div>
          </div>

          {/* Info Column */}
          <div className="md:col-span-2 space-y-2">
            <span className="text-[9px] tracking-[0.25em] font-sans font-bold uppercase text-[#1A1718] block mb-3">
              INFO
            </span>
            <div className="flex flex-col space-y-1.5 text-xs text-[#7A7273] font-sans">
              <Link href="/contact" className="hover:text-[#D85E78]">Official Hubs</Link>
              <Link href="/contact" className="hover:text-[#D85E78]">Press & Media</Link>
              <span className="cursor-pointer hover:text-[#D85E78]">Privacy Policy</span>
              <span className="cursor-pointer hover:text-[#D85E78]">Terms & Conditions</span>
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-[9px] tracking-[0.25em] font-sans font-bold uppercase text-[#1A1718] block mb-3">
              CONTACT
            </span>
            <div className="flex flex-col space-y-1.5 text-xs text-[#7A7273] font-sans">
              <a href="mailto:hello@comatozze.com" className="hover:text-[#D85E78]">
                hello@comatozze.com
              </a>
              <span>Based in Worldwide</span>
              {/* Social & Platform Links */}
              <div className="flex flex-col space-y-1.5 pt-2 text-xs">
                <a
                  href="https://fansly.com/comatozze"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#D85E78] hover:underline"
                >
                  Fansly: @comatozze
                </a>
                <a
                  href="https://instagram.com/umaanorth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D85E78]"
                >
                  Instagram: @umaanorth
                </a>
                <a
                  href="https://t.me/comatozze"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D85E78]"
                >
                  Telegram: @comatozze
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
