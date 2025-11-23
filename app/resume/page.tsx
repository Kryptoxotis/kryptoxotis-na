import type { Metadata } from "next"
import { Inter } from "next/font/google"
import styles from "./resume.module.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Omar Gaystardo - Automation Engineer",
  description: "Resume of Omar Gaystardo - Automation Engineer & Systems Architect",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResumePage() {
  return (
    <div className={`${inter.variable} ${styles.resumeWrapper}`}>
      <div className={styles.resumeContainer}>
        <div className={styles.header}>
          <h1 className={styles.name}>Omar Gaystardo</h1>
          <div className={styles.title}>Automation Engineer & Systems Architect</div>
          <div className={styles.contactInfo}>
            <span className={styles.location}>El Paso, TX</span>
            <span>915-373-3640</span>
            <span>ogaystardo@gmail.com</span>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Summary</h2>
          <p className={styles.summary}>
            Automation engineer with 8+ years building modular systems that connect APIs, automate workflows, and solve
            operational bottlenecks. Specialize in n8n, Zapier, and custom integrations for lead enrichment, CRM
            automation, and document processing. Proven track record designing end-to-end automation systems for
            insurance, real estate, and small business clients — reducing manual work by 80%+ and increasing conversion
            rates through intelligent data pipelines. Self-taught builder who turns messy processes into scalable,
            reliable systems.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <div className={styles.skillCategoryTitle}>Automation & Integration</div>
              <div className={styles.skillList}>
                n8n (primary) • Zapier • Make • 0 Code Kit • Vercel • Railway • Cloudflare • API integration • Webhook
                architecture • Error handling & retry logic
              </div>
            </div>
            <div className={styles.skillCategory}>
              <div className={styles.skillCategoryTitle}>Development & Scripting</div>
              <div className={styles.skillList}>
                Python • JavaScript • Database design • CRM customization • Google Apps Script
              </div>
            </div>
            <div className={styles.skillCategory}>
              <div className={styles.skillCategoryTitle}>Platforms & Tools</div>
              <div className={styles.skillList}>
                Notion • Tally • Docparser • Spokeo API • Google Sheets • Google Forms • Google Drive API • Dotloop
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Automation Projects</h2>

          <div className={styles.project}>
            <div className={styles.projectHeader}>
              <span className={styles.projectTitle}>Insurance Lead Enrichment System</span>
            </div>
            <div className={styles.projectMeta}>Freelance Client</div>

            <p className={styles.projectLabel}>Challenge:</p>
            <p>
              Insurance agent received 40+ police incident reports daily with names/addresses but no phone numbers.
              Manual lookup and qualification consumed 10+ hours per week.
            </p>

            <p className={styles.projectLabel}>Solution:</p>
            <p>Built end-to-end automation system:</p>
            <ul>
              <li>Docparser extracts data from PDF reports → Notion database</li>
              <li>Custom dashboard (built from scratch) validates and approves extracted records</li>
              <li>Spokeo API integration (via n8n/Zapier) auto-enriches contacts with phone numbers</li>
              <li>Qualified leads automatically pushed to Google Sheets → automated outreach via Zapier</li>
              <li>Handles 2-party accident reports; multi-party incidents flagged for manual review</li>
              <li>DNC (Do Not Call) filtering layer in planning phase for compliance</li>
            </ul>

            <p className={styles.projectLabel}>Impact:</p>
            <ul>
              <li>Reduced manual research from 10 hours/week to 30 minutes</li>
              <li>95% phone number lookup success rate, 80% accuracy</li>
              <li>Increased qualified lead conversion by 40%</li>
              <li>Client paid $30K for system build + ongoing maintenance contract</li>
            </ul>

            <p className={styles.projectLabel}>Additional:</p>
            <p>
              Built secure document scanner/uploader that pushes files directly to Google Drive without requiring user
              login (permission-controlled access for remote paper submission)
            </p>
          </div>

          <div className={styles.project}>
            <div className={styles.projectHeader}>
              <span className={styles.projectTitle}>Real Estate Internal Systems Automation</span>
            </div>
            <div className={styles.projectMeta}>Current Client ($5K/month retainer)</div>

            <p className={styles.projectLabel}>Challenge:</p>
            <p>
              Property management company running chaotic operations via Google Sheets/Forms. Manual onboarding,
              scheduling, client pipeline management, and document handling creating operational bottlenecks.
            </p>

            <p className={styles.projectLabel}>Solution (in progress):</p>
            <p>Migrating systems to Notion + Tally for cleaner automation:</p>
            <ul>
              <li>Automated onboarding workflows (employee + client intake via forms → validation → scheduling)</li>
              <li>Dotloop integration for contract/document automation</li>
              <li>Custom dashboard syncing all client/project data for real-time visibility</li>
              <li>Auto-generated employee schedules based on availability inputs</li>
              <li>Client pipeline/CRM system for tracking outreach and project status</li>
              <li>Document scanner/uploader for remote file management</li>
            </ul>

            <p className={styles.projectLabel}>Status:</p>
            <p>Signed Nov 2024, actively building infrastructure</p>
          </div>

          <div className={styles.project}>
            <div className={styles.projectHeader}>
              <span className={styles.projectTitle}>CRM & Inventory Management Systems</span>
            </div>
            <div className={styles.projectMeta}>Multiple Small Business Clients (2015–Present)</div>

            <p>
              Built custom databases, automation tools, and websites for retail, construction, and service businesses:
            </p>
            <ul>
              <li>Designed CRM workflows tailored to client sales processes</li>
              <li>Automated inventory tracking and reorder triggers</li>
              <li>Created reporting dashboards for financial and operational visibility</li>
              <li>Delivered bilingual technical support (English/Spanish)</li>
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Relevant Experience</h2>

          <div className={styles.job}>
            <div className={styles.jobHeader}>
              <span className={styles.jobTitle}>Freelance Automation Engineer</span>
              <span className={styles.jobDate}>2015 – Present</span>
            </div>
            <div className={styles.company}>Self-Employed — El Paso, TX</div>
            <ul>
              <li>Design and deploy automation systems using n8n, Zapier, and API integrations</li>
              <li>Build custom CRM solutions, lead enrichment pipelines, and document processing workflows</li>
              <li>Consult with clients to diagnose operational bottlenecks and architect scalable solutions</li>
              <li>Document processes and train non-technical users to maintain systems</li>
            </ul>
          </div>

          <div className={styles.job}>
            <div className={styles.jobHeader}>
              <span className={styles.jobTitle}>Data Center Technician</span>
              <span className={styles.jobDate}>Mar 2024 – Jul 2024</span>
            </div>
            <div className={styles.company}>Marathon Digital Holdings — Nebraska</div>
            <ul>
              <li>Diagnosed and repaired ASIC mining hardware (fans, PSUs, hashboards, control boards)</li>
              <li>Maintained cooling efficiency through airflow optimization and HVAC system support</li>
              <li>Deployed high-density rack equipment, managing cabling and power distribution</li>
              <li>Reduced hardware downtime through rapid fault isolation and component-level repair</li>
            </ul>
          </div>

          <div className={styles.job}>
            <div className={styles.jobHeader}>
              <span className={styles.jobTitle}>Production & Technical Assistant</span>
              <span className={styles.jobDate}>May 2022 – Aug 2023</span>
            </div>
            <div className={styles.company}>Star Central Studios — El Paso, TX</div>
            <ul>
              <li>Configured lighting, camera rigs, and technical production equipment for film/commercial shoots</li>
              <li>Managed equipment inventory and rental logistics with zero loss incidents</li>
              <li>Supported rapid setup/teardown for production crews under tight deadlines</li>
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.education}>
            <div className={styles.degree}>Associate of Arts, Multidisciplinary Studies</div>
            <div className={styles.school}>El Paso Community College — 2021</div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Why I Build Automation</h2>
          <p className={styles.philosophy}>
            I build automation to free people from what traps them — repetitive tasks, manual chaos, hours spent on work
            that doesn't matter — so they can spend time on what actually does. Whether that's growing their business or
            going home to their family, my job is to give them that time back. I've always been drawn to technology,
            programming, and systems, but the real drive comes from knowing that every workflow I build means someone
            gets their life back. That's what matters.
          </p>
        </div>
      </div>
    </div>
  )
}
