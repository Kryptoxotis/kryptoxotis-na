"use client"

import type React from "react"
import { useState } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { CyberButton } from "@/components/ui/cyber-button"
import { submitContactForm } from "@/lib/notion"
import { Phone, Mail, MapPin, Check, AlertCircle, MessageSquare, Clock } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// Define validation types
type ValidationState = {
  valid: boolean
  message: string
}

type FormValidation = {
  name: ValidationState
  email: ValidationState
  subject: ValidationState
  message: ValidationState
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messageLength, setMessageLength] = useState(0)

  // Form validation state
  const [validation, setValidation] = useState<FormValidation>({
    name: { valid: true, message: "" },
    email: { valid: true, message: "" },
    subject: { valid: true, message: "" },
    message: { valid: true, message: "" },
  })

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const validateField = (name: string, value: string) => {
    let isValid = true
    let message = ""

    switch (name) {
      case "name":
        if (!value.trim()) {
          isValid = false
          message = "Name is required"
        } else if (value.trim().length < 2) {
          isValid = false
          message = "Name must be at least 2 characters"
        }
        break
      case "email":
        if (!value.trim()) {
          isValid = false
          message = "Email is required"
        } else if (!validateEmail(value)) {
          isValid = false
          message = "Please enter a valid email address"
        }
        break
      case "subject":
        if (!value.trim()) {
          isValid = false
          message = "Please select a subject"
        }
        break
      case "message":
        if (!value.trim()) {
          isValid = false
          message = "Message is required"
        } else if (value.trim().length < 10) {
          isValid = false
          message = "Message must be at least 10 characters"
        }
        break
      default:
        break
    }

    setValidation((prev) => ({
      ...prev,
      [name]: { valid: isValid, message },
    }))

    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Update message length for counter
    if (name === "message") {
      setMessageLength(value.length)
    }

    // Validate on change
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields before submission
    const nameValid = validateField("name", formData.name)
    const emailValid = validateField("email", formData.email)
    const subjectValid = validateField("subject", formData.subject)
    const messageValid = validateField("message", formData.message)

    if (!nameValid || !emailValid || !subjectValid || !messageValid) {
      setFormStatus({
        success: false,
        message: "Please correct the errors in the form before submitting.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      })

      setFormStatus({
        success: result.success,
        message: result.message,
      })

      if (result.success) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setMessageLength(0)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus({
        success: false,
        message: "An error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="metallic-text text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <h2 className="text-white text-xl">
              Ready to Scale Your Business? Let's Make It Happen – Book Your Free Consultation Now.
            </h2>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionTitle title="Get in Touch" />

              <div className="space-y-8 mt-8">
                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-sm bg-black flex items-center justify-center cyber-border mr-4 group-hover:shadow-[0_0_15px_rgba(27,77,62,0.5)] transition-all duration-300">
                    <Phone className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Phone</h3>
                    <a
                      href="tel:9153733640"
                      className="text-white hover:text-emerald-400 transition-colors duration-300"
                    >
                      915 373 3640
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-sm bg-black flex items-center justify-center cyber-border mr-4 group-hover:shadow-[0_0_15px_rgba(27,77,62,0.5)] transition-all duration-300">
                    <Mail className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email</h3>
                    <a
                      href="mailto:aidan@kryptoxotis.io"
                      className="text-white hover:text-emerald-400 transition-colors duration-300"
                    >
                      aidan@kryptoxotis.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-sm bg-black flex items-center justify-center cyber-border mr-4 group-hover:shadow-[0_0_15px_rgba(27,77,62,0.5)] transition-all duration-300">
                    <MapPin className="h-6 w-6 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Address</h3>
                    <p className="text-white">El Paso, Texas</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-zinc-900 p-6 rounded-sm cyber-border">
              <h2 className="metallic-text text-2xl font-bold mb-6">Let's Talk – Schedule Your Free Consultation</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="name" className="block text-white font-medium">
                      Name
                    </label>
                    {!validation.name.valid && (
                      <span className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {validation.name.message}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-zinc-800 border ${
                        validation.name.valid ? "border-zinc-700" : "border-red-500"
                      } rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300`}
                      placeholder="Your full name"
                    />
                    {validation.name.valid && formData.name.length > 0 && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="email" className="block text-white font-medium">
                      Email
                    </label>
                    {!validation.email.valid && (
                      <span className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {validation.email.message}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 bg-zinc-800 border ${
                        validation.email.valid ? "border-zinc-700" : "border-red-500"
                      } rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300`}
                      placeholder="your.email@example.com"
                    />
                    {validation.email.valid && formData.email.length > 0 && validateEmail(formData.email) && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="subject" className="block text-white font-medium">
                      Subject
                    </label>
                    {!validation.subject.valid && (
                      <span className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {validation.subject.message}
                      </span>
                    )}
                  </div>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      validation.subject.valid ? "border-zinc-700" : "border-red-500"
                    } rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 appearance-none`}
                  >
                    <option value="">What can we help you with?</option>
                    <option value="Business Database Inquiry">Business Database Management & Automation</option>
                    <option value="Web Design Quote">Web Design & Development</option>
                    <option value="3D Printing Order">3D Printing Services</option>
                    <option value="General Inquiry">General Information</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                  </select>
                  <div className="absolute right-10 mt-3 pointer-events-none text-emerald-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="message" className="block text-white font-medium">
                      Message
                    </label>
                    <div className="flex items-center">
                      {!validation.message.valid && (
                        <span className="text-red-500 text-sm flex items-center mr-2">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {validation.message.message}
                        </span>
                      )}
                      <span className="text-zinc-400 text-xs">{messageLength} characters</span>
                    </div>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 bg-zinc-800 border ${
                      validation.message.valid ? "border-zinc-700" : "border-red-500"
                    } rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 resize-y min-h-[120px]`}
                    placeholder="Tell us about your project or requirements..."
                  ></textarea>
                </div>

                <div>
                  <CyberButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 font-medium hover:scale-[1.02] transition-transform duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner size="sm" />
                        <span className="ml-2">Sending...</span>
                      </div>
                    ) : (
                      "Let's Talk – Schedule Your Free Consultation"
                    )}
                  </CyberButton>
                </div>

                {formStatus.message && (
                  <div
                    className={`p-4 rounded-sm ${
                      formStatus.success
                        ? "bg-emerald-500/20 border border-emerald-500"
                        : "bg-red-500/20 border border-red-500"
                    }`}
                  >
                    <p className={formStatus.success ? "text-emerald-300" : "text-red-300"}>{formStatus.message}</p>
                  </div>
                )}

                {/* Privacy assurance message */}
                <div className="text-center mt-4">
                  <p className="text-zinc-400 text-sm">
                    Your information is 100% confidential. We respect your privacy and will never share your details.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Location" centered />

          <div className="mt-12 cyber-border p-1 bg-black">
            <div className="aspect-video bg-zinc-800 rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217571.43944746902!2d-106.65772766953123!3d31.76133700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e73f8bc5fe3b69%3A0xe39184e3ab9d0222!2sEl%20Paso%2C%20TX!5e0!3m2!1sen!2sus!4v1710642047307!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="El Paso, Texas Map"
              ></iframe>
            </div>
          </div>

          <div className="mt-4 text-center">
            <a
              href="https://www.google.com/maps/dir/31.7751296,-106.3583744/el+paso/@31.7775222,-106.5047404,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x86e73f8bc5fe3b69:0xe39184e3ab9d0222!2m2!1d-106.4850217!2d31.7618778?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-emerald-500 hover:text-emerald-400 transition-colors"
            >
              <MapPin className="h-4 w-4 mr-2" />
              <span>Get directions to El Paso</span>
            </a>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-zinc-400 text-sm uppercase tracking-wider mb-8">Trusted By</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* These would be replaced with actual client logos */}
            <div className="w-24 h-12 bg-zinc-900 rounded-sm flex items-center justify-center cyber-border">
              <span className="metallic-silver-text">Client 1</span>
            </div>
            <div className="w-24 h-12 bg-zinc-900 rounded-sm flex items-center justify-center cyber-border">
              <span className="metallic-silver-text">Client 2</span>
            </div>
            <div className="w-24 h-12 bg-zinc-900 rounded-sm flex items-center justify-center cyber-border">
              <span className="metallic-silver-text">Client 3</span>
            </div>
            <div className="w-24 h-12 bg-zinc-900 rounded-sm flex items-center justify-center cyber-border">
              <span className="metallic-silver-text">Client 4</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
