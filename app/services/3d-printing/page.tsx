import Link from "next/link"
import Image from "next/image"
import { SectionTitle } from "@/components/ui/section-title"
import { CyberButton } from "@/components/ui/cyber-button"
import { Check, ArrowRight, Printer, Layers, Cog } from "lucide-react"
import { MaterialsSection } from "@/components/materials-section"
import { ThreeDModelGallery } from "@/components/three-d-model-gallery"

export default function ThreeDPrintingServicePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="metallic-text text-4xl md:text-5xl font-bold mb-6">3D Printing Services</h1>
            <h2 className="text-white text-xl">See Your Vision Come to Life – Get Your Custom Prototype Today.</h2>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Overview" />
              <p className="text-white mb-6">
                Precision 3D printing is revolutionizing the way businesses and creators bring concepts to life. Whether
                for prototyping, production, or custom design, our services offer high-quality, reliable, and scalable
                solutions tailored to your needs.
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
                      <span className="text-white">Advanced 3D model printing for prototyping and production</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">
                        High-resolution, industry-grade materials for durability and precision
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Small-batch and large-scale manufacturing solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Post-processing, finishing, and detailing services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Consultation and design optimization for manufacturability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Quality assurance and dimensional accuracy testing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="cyber-border rounded-sm p-1 bg-black">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-12%2014.44.14%20-%20A%20futuristic%203D%20printing%20lab%20showcasing%20the%20benefits%20of%20advanced%203D%20printing%20services.%20The%20scene%20features%20high-tech%203D%20printers%20producing%20detailed%20pro-P4tc3bdpEvhEGuSiCIDNkC5ZeQAHzi.webp"
                  alt="3D Printing Services"
                  width={600}
                  height={600}
                  className="rounded-sm w-full aspect-square object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Model Gallery Section */}
      <ThreeDModelGallery />

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
                <h3 className="metallic-text text-xl font-bold pt-2">Consultation & Design Optimization</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Review project specifications and material requirements.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Optimize designs for printability, structural integrity, and cost-effectiveness.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Select the best 3D printing technology for the desired output.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">2</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Prototyping & Testing</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Produce an initial prototype for validation and testing.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Perform structural, functional, and material testing as needed.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Make necessary refinements to improve performance and aesthetics.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">3</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Production & Finishing</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Execute final production with advanced 3D printing technology.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Apply finishing techniques such as smoothing, painting, or additional assembly.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Ensure quality control with precise dimensional verification.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">4</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Delivery & Ongoing Support</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Pack and deliver finished parts with careful handling to prevent damage.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Offer post-production support for additional modifications or scaling.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Provide consultation for future projects or manufacturing scalability.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="3D Printing Applications & Benefits" centered />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-zinc-900 p-6 rounded-sm cyber-border text-center">
              <Printer className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="metallic-text text-xl font-bold mb-3">Rapid Prototyping</h3>
              <p className="text-white">
                Accelerate product development with quick iterations and testing, reducing time-to-market by up to 70%.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border text-center">
              <Layers className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="metallic-text text-xl font-bold mb-3">Complex Geometries</h3>
              <p className="text-white">
                Create intricate designs and structures that would be impossible with traditional manufacturing methods.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border text-center">
              <Cog className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="metallic-text text-xl font-bold mb-3">Custom Production</h3>
              <p className="text-white">
                Produce small batches of customized parts without the high costs of traditional manufacturing setups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <MaterialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black p-8 rounded-sm cyber-border">
              <h2 className="metallic-text text-3xl md:text-4xl font-bold mb-4 text-center">
                Ready to Bring Your Ideas to Life?
              </h2>
              <p className="text-white text-center mb-8">
                Whether you need high-quality prototypes or precision manufacturing, our 3D printing solutions provide
                accuracy, speed, and innovation. Let's bring your designs to life with the best materials and expert
                guidance. Request a quote today to get started.
              </p>
              <div className="flex justify-center">
                <Link href="/contact">
                  <CyberButton size="lg">Get a Custom Quote</CyberButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
