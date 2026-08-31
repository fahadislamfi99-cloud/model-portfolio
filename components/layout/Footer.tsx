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
              <Link href="/contact" className="hover:text-[#D85E78]">Book Comatozze</Link>
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
              {/* Social SVG Icons */}
              <div className="flex items-center space-x-3 pt-3 text-[#1A1718]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#D85E78] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:text-[#D85E78] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.48V8.65a8.28 8.28 0 0 0 3.9 1.13v-3.09z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="hover:text-[#D85E78] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
