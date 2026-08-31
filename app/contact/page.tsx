import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { modelData } from "@/data/model";

export const metadata: Metadata = {
  title: "Connect with Comatozze — Official Inquiries & Socials",
  description:
    "Official contact and verified platform hubs for independent creator and model Comatozze (Uma North).",
  alternates: {
    canonical: "https://comatozze.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 md:pb-36 bg-[#FAF8F5]">
      <div className="max-w-[1560px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Page Header */}
        <div className="border-b border-[#E8DFDC] pb-12 mb-16">
          <span className="text-[10px] tracking-[0.35em] text-[#C98A90] font-sans uppercase font-medium">
            OFFICIAL HUBS & INQUIRIES
          </span>
          <h1 className="font-editorial-serif text-5xl sm:text-7xl lg:text-8xl text-[#191617] font-light mt-3 tracking-wide">
            Connect <span className="italic">with Her</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#7A7273] mt-4 max-w-xl">
            Direct verified channels, press inquiries, and official platform access for Comatozze (Uma North).
          </p>
        </div>

        {/* 2-Column Split: Representation Info & Direct Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Representation Details Column */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] font-sans uppercase text-[#C98A90] block mb-2">
                INDEPENDENT PRODUCTION
              </span>
              <h2 className="font-editorial-serif text-3xl text-[#191617] mb-1">
                Self-Produced & Independent
              </h2>
              <p className="text-sm font-sans text-[#7A7273]">
                Zero agency intermediaries · Direct creator management
              </p>
            </div>

            <div className="space-y-6 border-t border-[#E8DFDC] pt-8">
              <div>
                <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-[#7A7273] block mb-1">
                  OFFICIAL INQUIRIES
                </span>
                <a
                  href={`mailto:${modelData.contact.bookingEmail}`}
                  className="font-editorial-serif text-2xl text-[#191617] hover:text-[#C98A90] transition-colors"
                >
                  {modelData.contact.bookingEmail}
                </a>
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-[#7A7273] block mb-1">
                  PRESS & MEDIA
                </span>
                <a
                  href={`mailto:${modelData.contact.pressEmail}`}
                  className="font-editorial-serif text-2xl text-[#191617] hover:text-[#C98A90] transition-colors"
                >
                  {modelData.contact.pressEmail}
                </a>
              </div>
            </div>

            <div className="border-t border-[#E8DFDC] pt-8">
              <span className="text-[10px] tracking-[0.25em] font-sans uppercase text-[#7A7273] block mb-3">
                PRIMARY PLATFORMS
              </span>
              <div className="flex flex-col space-y-2 text-sm font-sans">
                <a
                  href={modelData.contact.fansly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D85E78] font-medium hover:underline"
                >
                  Fansly: {modelData.contact.fanslyHandle}
                </a>
                <a
                  href={modelData.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#191617] hover:text-[#D85E78]"
                >
                  Instagram: {modelData.contact.instagramHandle}
                </a>
                <a
                  href={modelData.contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#191617] hover:text-[#D85E78]"
                >
                  Telegram: {modelData.contact.telegramHandle}
                </a>
              </div>
            </div>
          </div>

          {/* Booking Inquiry Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
