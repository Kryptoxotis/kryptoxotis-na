import Link from "next/link"
import Image from "next/image"
import { SectionTitle } from "@/components/ui/section-title"
import { CyberButton } from "@/components/ui/cyber-button"
import { Check } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="metallic-text text-4xl md:text-5xl font-bold mb-6">
              Our Services – Powering Your Business with Innovation
            </h1>
            <p className="text-white text-xl">Tailored Solutions to Automate, Elevate & Accelerate Growth</p>
          </div>
        </div>
      </section>

      {/* Database Management Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Business Database Management & Automation" />
              <p className="text-white text-xl mb-6">
                Eliminate Inefficiencies. Automate Workflows. Scale with Precision.
              </p>

              <h3 className="text-emerald-500 font-bold text-lg mb-4">What We Do:</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">
                    Custom Database Architecture – Scalable, efficient, and built for growth.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">
                    Workflow Automation – Cut manual tasks with intelligent automation.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">
                    Seamless Data Migration & Integration – No disruptions, just smooth transitions.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">
                    Advanced Analytics & Reporting – Real-time insights at your fingertips.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">Enterprise-Grade Security & Compliance – Protect what matters.</span>
                </li>
              </ul>

              <div className="bg-zinc-800/50 p-4 rounded-sm border-l-4 border-emerald-500 mb-6">
                <h4 className="text-white font-bold mb-1">Why It Matters:</h4>
                <p className="text-white">
                  Businesses waste 30% of their time on inefficient data management. We fix that.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Your Next Step:</h4>
                <h3 className="metallic-text text-xl font-bold mb-3">Supercharge Your Operations Today</h3>
              </div>

              <Link href="/services/database">
                <CyberButton>Optimize My Business</CyberButton>
              </Link>
            </div>
            <div className="relative">
              <div className="cyber-border rounded-sm p-1 bg-black">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-12%2014.41.01%20-%20A%20futuristic%20business%20overview%20scene%20showcasing%20the%20benefits%20of%20database%20management%20and%20automation.%20The%20image%20features%20a%20sleek%2C%20high-tech%20control%20cent-6XtMI7JofXoVkc2JffC6qs09HiFDpW.webp"
                  alt="Business Database Management Overview"
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

      {/* Web Design Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="cyber-border rounded-sm p-1 bg-black">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-12%2014.42.51%20-%20A%20futuristic%20web%20design%20and%20development%20workspace%20showcasing%20the%20benefits%20of%20professional%20web%20services.%20The%20scene%20features%20high-tech%20monitors%20displayi-grDFZw49mvnPTxl95L93eGWttINvDU.webp"
                  alt="Professional Web Design and Development Services"
                  width={600}
                  height={600}
                  className="rounded-sm w-full aspect-square object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-gradient-to-bl from-red-500/20 to-transparent"></div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionTitle title="Web Design & Development" />
              <p className="text-white text-xl mb-6">Beyond Aesthetics – Build a Digital Presence That Converts.</p>

              <h3 className="text-emerald-500 font-bold text-lg mb-4">What We Offer:</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">Custom, Responsive Website Design – Stunning, mobile-first sites.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">
                    E-commerce & Conversion-Optimized Stores – More sales, less friction.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">SEO & Performance Optimization – Rank higher, load faster.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">User-Centered UI/UX Design – Keep visitors engaged.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">
                    Ongoing Support & Maintenance – Focus on your business, we'll handle the rest.
                  </span>
                </li>
              </ul>

              <div className="bg-zinc-800/50 p-4 rounded-sm border-l-4 border-emerald-500 mb-6">
                <h4 className="text-white font-bold mb-1">Why It Matters:</h4>
                <p className="text-white">
                  94% of first impressions are design-related. Let's make yours unforgettable.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Your Next Step:</h4>
                <h3 className="metallic-text text-xl font-bold mb-3">Transform Your Website into a Business Asset</h3>
              </div>

              <Link href="/services/web-design">
                <CyberButton>Build My Website</CyberButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Printing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="3D Printing & Prototyping" />
              <p className="text-white text-xl mb-6">From Concept to Reality – High-Precision, High-Quality Prints.</p>

              <h3 className="text-emerald-500 font-bold text-lg mb-4">Our Capabilities:</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">Rapid Prototyping – Test, refine, and perfect your ideas fast.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">Custom Part Manufacturing – Durable, functional, and tailored.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">Expert 3D Modeling & Design Support – Bring your vision to life.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">
                    Material Selection & Consultation – Get the best fit for your project.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">
                    <Check size={16} />
                  </span>
                  <span className="text-white">
                    Professional Finishing & Small-Batch Production – Quality you can see and feel.
                  </span>
                </li>
              </ul>

              <div className="bg-zinc-800/50 p-4 rounded-sm border-l-4 border-emerald-500 mb-6">
                <h4 className="text-white font-bold mb-1">Why It Matters:</h4>
                <p className="text-white">3D printing reduces production costs by 70%—let's make it work for you.</p>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Your Next Step:</h4>
                <h3 className="metallic-text text-xl font-bold mb-3">Get Your Custom Prototype Today</h3>
              </div>

              <Link href="/services/3d-printing">
                <CyberButton>Start Printing</CyberButton>
              </Link>
            </div>
            <div className="relative">
              <div className="cyber-border rounded-sm p-1 bg-black">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-12%2014.44.14%20-%20A%20futuristic%203D%20printing%20lab%20showcasing%20the%20benefits%20of%20advanced%203D%20printing%20services.%20The%20scene%20features%20high-tech%203D%20printers%20producing%20detailed%20pro-P4tc3bdpEvhEGuSiCIDNkC5ZeQAHzi.webp"
                  alt="Advanced 3D Printing Lab and Technology"
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="metallic-text text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business? Let's make it happen.
            </h2>
            <Link href="/contact">
              <CyberButton size="lg">Get in Touch</CyberButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
