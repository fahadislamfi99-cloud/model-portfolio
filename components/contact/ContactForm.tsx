"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Campaign",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setStatus("submitting");
    // Simulate pristine asynchronous booking inquiry submission
    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#E8DFDC] p-8 sm:p-12">
      {status === "success" ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#C98A90] mx-auto" />
          <h3 className="font-editorial-serif text-3xl sm:text-4xl text-[#191617]">
            Message Received
          </h3>
          <p className="font-sans text-sm text-[#7A7273] max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. Your message has been received and will be reviewed shortly.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setFormData({
                name: "",
                email: "",
                company: "",
                projectType: "Campaign",
                message: "",
              });
            }}
            className="mt-6 text-xs tracking-[0.2em] font-sans uppercase underline text-[#191617] hover:text-[#C98A90]"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-[10px] tracking-[0.25em] font-sans uppercase text-[#7A7273] mb-2"
              >
                FULL NAME *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full bg-[#FAF8F5] border-b border-[#E8DFDC] focus:border-[#191617] py-3 text-sm text-[#191617] outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[10px] tracking-[0.25em] font-sans uppercase text-[#7A7273] mb-2"
              >
                EMAIL ADDRESS *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@studio.com"
                className="w-full bg-[#FAF8F5] border-b border-[#E8DFDC] focus:border-[#191617] py-3 text-sm text-[#191617] outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="company"
                className="block text-[10px] tracking-[0.25em] font-sans uppercase text-[#7A7273] mb-2"
              >
                BRAND / AGENCY / COMPANY
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Maison de Couture"
                className="w-full bg-[#FAF8F5] border-b border-[#E8DFDC] focus:border-[#191617] py-3 text-sm text-[#191617] outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="projectType"
                className="block text-[10px] tracking-[0.25em] font-sans uppercase text-[#7A7273] mb-2"
              >
                PROJECT TYPE
              </label>
              <select
                id="projectType"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-[#FAF8F5] border-b border-[#E8DFDC] focus:border-[#191617] py-3 text-sm text-[#191617] outline-none transition-colors"
              >
                <option value="Campaign">High Fashion Campaign</option>
                <option value="Editorial">Editorial / Cover Feature</option>
                <option value="Runway">Haute Couture Runway</option>
                <option value="Commercial">Commercial / Lookbook</option>
                <option value="Beauty">Beauty / Jewelry</option>
                <option value="Other">Other Collaboration</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-[10px] tracking-[0.25em] font-sans uppercase text-[#7A7273] mb-2"
            >
              PROJECT DETAILS & DATES *
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Outline project concept, tentative shoot dates, shooting location, and usage parameters..."
              className="w-full bg-[#FAF8F5] border border-[#E8DFDC] focus:border-[#191617] p-3 text-sm text-[#191617] outline-none transition-colors"
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-rose-600 font-sans">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-4 bg-[#191617] text-[#FAF8F5] text-xs tracking-[0.25em] font-sans uppercase hover:bg-[#C98A90] transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{status === "submitting" ? "TRANSMITTING..." : "TRANSMIT INQUIRY"}</span>
            <ArrowUpRight className="w-4 h-4 text-[#C98A90]" />
          </button>
        </form>
      )}
    </div>
  );
}
