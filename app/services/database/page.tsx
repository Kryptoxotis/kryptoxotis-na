import Link from "next/link"
import Image from "next/image"
import { SectionTitle } from "@/components/ui/section-title"
import { CyberButton } from "@/components/ui/cyber-button"
import { Check, ArrowRight, Database, BarChart, Shield, Cog } from "lucide-react"
// Import the ProjectsSection component at the top of the file
import { ProjectsSection } from "@/components/projects-section"

export default function DatabaseServicePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="metallic-text text-4xl md:text-5xl font-bold mb-6">
              Business Database Management & Automation
            </h1>
            <h2 className="text-white text-xl">Transform Your Operations – Streamline, Scale, Succeed.</h2>
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
                Data is the backbone of modern businesses, and efficient database management can significantly impact
                operational efficiency and decision-making. Our database solutions are designed to streamline data
                handling, automate key processes, and ensure security while improving accessibility and reliability.
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
                      <span className="text-white">Custom database architecture and development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Process automation and workflow optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Data migration and system integration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Advanced analytics and reporting solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Continuous maintenance, scaling, and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2 mt-1">
                        <Check size={16} />
                      </span>
                      <span className="text-white">Security, compliance, and data protection</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="cyber-border rounded-sm p-1 bg-black">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-12%2014.41.01%20-%20A%20futuristic%20business%20overview%20scene%20showcasing%20the%20benefits%20of%20database%20management%20and%20automation.%20The%20image%20features%20a%20sleek%2C%20high-tech%20control%20cent-6XtMI7JofXoVkc2JffC6qs09HiFDpW.webp"
                  alt="Database Management Overview"
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
                <h3 className="metallic-text text-xl font-bold pt-2">Strategic Assessment</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Conduct a comprehensive evaluation of existing database infrastructure and workflow.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Identify bottlenecks, inefficiencies, and opportunities for automation.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Define objectives based on business needs and regulatory compliance.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">2</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Solution Architecture & Planning</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>
                    Design a tailored database solution that aligns with the business model and operational goals.
                  </span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Establish automation protocols for data entry, processing, and reporting.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Develop an integration plan for seamless connectivity with existing software.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">3</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Implementation & Deployment</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Build and configure the database system with robust automation features.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Ensure seamless data migration while maintaining integrity and security.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Implement user-friendly dashboards and reporting tools.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border border border-emerald-500/30 hover:bg-zinc-800 transition-all duration-300 group">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-black flex items-center justify-center rounded-sm cyber-border mr-4">
                  <span className="text-3xl font-bold text-emerald-500">4</span>
                </div>
                <h3 className="metallic-text text-xl font-bold pt-2">Optimization, Security, & Support</h3>
              </div>
              <ul className="space-y-3 pl-20">
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Monitor performance and optimize for efficiency and scalability.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Implement multi-layered security measures to protect sensitive information.</span>
                </li>
                <li className="flex items-start text-white">
                  <ArrowRight className="h-4 w-4 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Provide ongoing support, maintenance, and updates to adapt to evolving business needs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Elements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="How Database Management Transforms Your Business" centered />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-zinc-900 p-6 rounded-sm cyber-border text-center">
              <Database className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="metallic-text text-xl font-bold mb-3">Centralized Data Management</h3>
              <p className="text-white">
                Eliminate data silos and create a single source of truth for your entire organization.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border text-center">
              <Cog className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="metallic-text text-xl font-bold mb-3">Automated Workflows</h3>
              <p className="text-white">
                Reduce manual tasks by up to 80% with intelligent automation of repetitive processes.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border text-center">
              <BarChart className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="metallic-text text-xl font-bold mb-3">Real-time Analytics</h3>
              <p className="text-white">
                Make data-driven decisions with instant access to critical business insights.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-zinc-900 p-6 rounded-sm cyber-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="metallic-text text-2xl font-bold mb-4">Before & After Implementation</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-24 text-red-500 font-bold">Before:</div>
                    <div className="flex-1 bg-zinc-800 p-3 rounded-sm text-white">
                      4+ hours daily spent on manual data entry and reporting
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-emerald-500 font-bold">After:</div>
                    <div className="flex-1 bg-zinc-800 p-3 rounded-sm text-white">
                      Automated processes reduce manual work by 90%
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-red-500 font-bold">Before:</div>
                    <div className="flex-1 bg-zinc-800 p-3 rounded-sm text-white">
                      Data inconsistencies leading to costly business errors
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-emerald-500 font-bold">After:</div>
                    <div className="flex-1 bg-zinc-800 p-3 rounded-sm text-white">
                      99.9% data accuracy with validation controls
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Shield className="h-48 w-48 mx-auto text-emerald-500 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold metallic-text mb-2">70%</div>
                    <p className="text-white">Average efficiency improvement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <ProjectsSection category="database" title="Our Database Projects" />

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black p-8 rounded-sm cyber-border">
              <h2 className="metallic-text text-3xl md:text-4xl font-bold mb-4 text-center">
                Ready to Transform Your Database Operations?
              </h2>
              <p className="text-white text-center mb-8">
                Efficient database management is critical to business success. Automate workflows, eliminate
                inefficiencies, and ensure data integrity with a tailored solution. Speak with our experts today to
                build a scalable, high-performance database system that meets your exact requirements.
              </p>
              <div className="flex justify-center">
                <Link href="/contact">
                  <CyberButton size="lg">Request a Consultation</CyberButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
