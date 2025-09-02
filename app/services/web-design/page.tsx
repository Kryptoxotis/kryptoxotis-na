import Link from "next/link"
import Image from "next/image"
import { SectionTitle } from "@/components/ui/section-title"
import { CyberButton } from "@/components/ui/cyber-button"
import { Check, ArrowRight, Globe, Smartphone, ShoppingCart } from "lucide-react"
import { WebPortfolioSection } from "@/components/web-portfolio-section"

export default function WebDesignServicePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="metallic-text text-4xl md:text-5xl font-bold mb-6">Web Design & Development</h1>
            <h2 className="text-white text-xl">Don't Just Build a Website – Build a Brand That Converts.</h2>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="cyber-border rounded-sm p-1 bg-black">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-12%2014.42.51%20-%20A%20futuristic%20web%20design%20and%20development%20workspace%20showcasing%20the%20benefits%20of%20professional%20web%20services.%20The%20scene%20features%20high-tech%20monitors%20displayi-grDFZw49mvnPTxl95L93eGWttINvDU.webp"
                  alt="Web Design and Development"
                  width={600}
                  height={600}
                  className="rounded-sm w-full aspect-square object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-gradient-to-bl from-red-500/20 to-transparent"></div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionTitle title="Overview" />
              <p className="text-white mb-6">
                A website is more than a digital presence—it is the foundation of your brand's credibility and a
                powerful tool for business growth. Our web design and development services focus on building
                aesthetically compelling, highly functional, and conversion-optimized websites tailored to your goals.
              </p>

              <div className="relative mt-8 mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-sm"></div>
                <div className="relative bg-zinc-900/80 p-6 rounded-sm cyber-border">
                  <h3 className="metallic-text text-xl font-bold mb-4">Key Services:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Custom website design and development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">UI/UX strategy and wireframing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">eCommerce platform development and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">SEO-driven architecture and performance optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Security, accessibility, and compliance solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Continuous website management and technical support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Process" centered />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">1</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Discovery & Strategy Development</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Conduct in-depth market research and competitor analysis.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Identify core business objectives, target audience, and conversion goals.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Establish key design elements, branding consistency, and feature sets.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">2</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Design & Prototyping</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Develop wireframes and interactive prototypes for user experience validation.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Refine user interface elements to maximize engagement and navigation efficiency.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Implement responsive design principles to ensure seamless cross-device compatibility.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">3</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Development & Functionality Implementation</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Build a high-performance website using modern web technologies.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Integrate essential features such as eCommerce, booking systems, or interactive elements.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Implement SEO best practices, security protocols, and speed optimizations.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">4</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Launch, Maintenance & Growth</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Conduct extensive testing to ensure optimal functionality and performance.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Deploy the website with structured SEO indexing and analytics tracking.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Provide continuous updates, performance enhancements, and security patches.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Web Design That Drives Results" centered />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-zinc-900 p-6 rounded-sm cyber-border text-center">
              <Globe className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="metallic-text text-xl font-bold mb-3">Brand-Focused Design</h3>
              <p className="text-white">
                Create a memorable digital presence that reflects your unique brand identity and values.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border text-center">
              <Smartphone className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="metallic-text text-xl font-bold mb-3">Responsive Experience</h3>
              <p className="text-white">
                Deliver a seamless experience across all devices with mobile-first, responsive design.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border text-center">
              <ShoppingCart className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="metallic-text text-xl font-bold mb-3">Conversion-Optimized</h3>
              <p className="text-white">
                Transform visitors into customers with strategic CTAs and user-friendly navigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <WebPortfolioSection title="Our Web Design Portfolio" />

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black p-8 rounded-sm cyber-border">
              <h2 className="metallic-text text-3xl md:text-4xl font-bold mb-4 text-center">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-white text-center mb-8">
                Your website should be more than just a digital presence—it should be a high-converting platform that
                drives engagement and business growth. Let's create a solution tailored to your needs. Contact us today
                to start building a website that delivers results.
              </p>
              <div className="flex justify-center">
                <Link href="/contact">
                  <CyberButton size="lg">Schedule a Strategy Session</CyberButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
