import { SectionTitle } from "@/components/ui/section-title"
import Image from "next/image"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQsSection } from "@/components/faqs-section"
import { Lightbulb, Handshake, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="metallic-text text-4xl md:text-5xl font-bold mb-6">Who We Are: The Kryptoxotis Story</h1>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Empowering Businesses with Smart Technology & Innovation" />
              <p className="text-white mb-6">
                At Kryptoxotis, we don't just build solutions—we create revolutions. Our mission is to transform bold
                ideas into reality with precision 3D printing, intuitive web design, and intelligent automation. Through
                innovation and efficiency, we help businesses streamline operations, enhance their digital footprint,
                and scale effortlessly. Integrity, creativity, and excellence drive us as we shape the future—one
                breakthrough at a time.
              </p>
            </div>
            <div className="relative">
              <div className="cyber-border rounded-sm p-1 bg-black overflow-hidden">
                <div className="relative">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-12%2014.30.06%20-%20A%20futuristic%20business-themed%20image%20representing%20empowerment%2C%20innovation%2C%20and%20technology-driven%20growth.%20The%20scene%20features%20a%20high-tech%20office%20with%20digi-Sp1fzhyrWlBRZPLoVSgeldlkaAqWvO.webp"
                    alt="Futuristic Business Solutions"
                    width={600}
                    height={600}
                    className="rounded-sm w-full aspect-square object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 text-lg font-medium">
                      Transforming ideas into revolutionary solutions
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Core Values" centered />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 bg-zinc-900 rounded-sm cyber-border group hover:bg-zinc-800 transition-all duration-300 hover:translate-y-[-5px]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-black mb-4 cyber-border group-hover:shadow-[0_0_15px_rgba(27,77,62,0.5)] transition-all duration-300">
                <Lightbulb className="h-8 w-8 text-emerald-500 group-hover:animate-pulse" />
              </div>
              <h3 className="metallic-text text-xl font-bold mb-3">Innovation</h3>
              <p className="text-white">
                We turn ambitious ideas into reality through creative problem-solving and cutting-edge technology.
              </p>
            </div>

            <div className="text-center p-6 bg-zinc-900 rounded-sm cyber-border group hover:bg-zinc-800 transition-all duration-300 hover:translate-y-[-5px]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-black mb-4 cyber-border group-hover:shadow-[0_0_15px_rgba(27,77,62,0.5)] transition-all duration-300">
                <Handshake className="h-8 w-8 text-emerald-500 group-hover:animate-pulse" />
              </div>
              <h3 className="metallic-text text-xl font-bold mb-3">Loyalty</h3>
              <p className="text-white">
                Your success is our success. We build long-term relationships based on trust and mutual respect.
              </p>
            </div>

            <div className="text-center p-6 bg-zinc-900 rounded-sm cyber-border group hover:bg-zinc-800 transition-all duration-300 hover:translate-y-[-5px]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-black mb-4 cyber-border group-hover:shadow-[0_0_15px_rgba(27,77,62,0.5)] transition-all duration-300">
                <Shield className="h-8 w-8 text-emerald-500 group-hover:animate-pulse" />
              </div>
              <h3 className="metallic-text text-xl font-bold mb-3">Integrity</h3>
              <p className="text-white">
                We do what we say, and we say what we do—transparency and honesty in every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQsSection />
    </div>
  )
}
