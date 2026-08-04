import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { SEO } from "../components/SEO";
import { organizationSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";

const LAST_UPDATED = "May 18, 2026";
const EFFECTIVE_DATE = "May 18, 2026";

const sections = [
  { id: "introduction", label: "1. Introduction" },
  { id: "scope", label: "2. Who This Policy Applies To" },
  { id: "information-we-collect", label: "3. Information We Collect" },
  { id: "how-we-use", label: "4. How We Use Information" },
  { id: "legal-bases", label: "5. Legal Bases for Processing" },
  { id: "how-we-share", label: "6. How We Share Information" },
  { id: "service-providers", label: "7. Service Providers and Sub-Processors" },
  { id: "international-transfers", label: "8. International Data Transfers" },
  { id: "retention", label: "9. Data Retention" },
  { id: "security", label: "10. Information Security" },
  { id: "your-rights", label: "11. Your Rights" },
  { id: "rights-lgpd", label: "11.1 Rights Under LGPD (Brazil)" },
  { id: "rights-gdpr", label: "11.2 Rights Under GDPR (EEA / UK)" },
  { id: "rights-ccpa", label: "11.3 Rights Under CCPA/CPRA (California)" },
  { id: "how-to-exercise", label: "12. How to Exercise Your Rights" },
  { id: "cookies", label: "13. Cookies and Similar Technologies" },
  { id: "ai", label: "14. Artificial Intelligence Features" },
  { id: "children", label: "15. Children's Privacy" },
  { id: "changes", label: "16. Changes to This Policy" },
  { id: "contact", label: "17. Contact and Data Protection Inquiries" },
];

const privacyPolicySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy — Kaptas Global",
  "url": "https://kaptasglobal.io/privacy-policy",
  "description": "How Kaptas Global collects, uses, and protects personal information. Covers LGPD (Brazil), GDPR (EEA/UK), and CCPA/CPRA (California) rights.",
  "inLanguage": "en-US",
  "dateModified": "2026-05-18",
  "publisher": { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" },
  "about": { "@type": "Thing", "name": "Privacy practices and data protection rights" }
};

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy — Kaptas Global"
        description="How Kaptas Global collects, uses, shares, and protects personal information. Includes data subject rights under LGPD (Brazil), GDPR (EEA/UK), and CCPA/CPRA (California)."
        keywords="kaptas global privacy policy, data protection, LGPD, GDPR, CCPA, personal data, data subject rights"
        canonical="https://kaptasglobal.io/privacy-policy"
        schemas={[
          organizationSchema,
          privacyPolicySchema,
          buildBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Privacy Policy", url: `${SITE_URL}/privacy-policy` },
          ]),
        ]}
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as any }}
        className="relative pt-8 lg:pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_top_right,_#0047FF22,transparent_70%)] blur-[120px] pointer-events-none"></div>

        {/* Header */}
        <header className="mb-12 lg:mb-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center text-kaptas-green backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Legal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
              Policy
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light mb-6">
            How Kaptas Global collects, uses, shares, and protects personal information — and the rights you have over it.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <span><strong className="text-white font-medium">Effective:</strong> {EFFECTIVE_DATE}</span>
            <span><strong className="text-white font-medium">Last Updated:</strong> {LAST_UPDATED}</span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Sticky Table of Contents */}
          <aside className="lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-32 border border-white/10 rounded-2xl p-6 bg-white/[0.02] backdrop-blur-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">
                On this page
              </h2>
              <nav>
                <ul className="flex flex-col gap-2.5 text-sm">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`text-gray-400 hover:text-kaptas-green transition-colors block ${
                          s.id.startsWith("rights-") ? "pl-3 text-xs text-gray-500" : ""
                        }`}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <article
            className="flex-1 max-w-3xl prose prose-invert prose-lg
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:scroll-mt-32
              prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3 prose-h3:scroll-mt-32 prose-h3:text-white
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-5
              prose-a:text-kaptas-green prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-gray-300 prose-ul:my-5
              prose-li:mb-2 prose-li:marker:text-gray-600
              prose-table:text-sm
              prose-th:text-white prose-th:font-semibold
              prose-td:text-gray-300 prose-td:border-white/10
              max-w-none"
          >
            <h2 id="introduction">1. Introduction</h2>
            <p>
              HR Technology LLC, a Florida limited liability company doing business as <strong>Kaptas Global</strong> (<strong>"Kaptas Global,"</strong> <strong>"we,"</strong> <strong>"us,"</strong> or <strong>"our"</strong>), provides recruitment, staffing, and market-entry services that connect companies — primarily in the United States — with senior professionals based in Brazil and other Latin American countries. We operate the website at <a href="https://kaptasglobal.io">kaptasglobal.io</a> (the <strong>"Site"</strong>) and offer related services described at that address (collectively, the <strong>"Services"</strong>).
            </p>
            <p>
              This Privacy Policy describes how we collect, use, share, and protect personal information when you interact with the Site or Services. It also explains the rights you have over your personal information under the General Data Protection Law of Brazil (<strong>LGPD</strong>), the General Data Protection Regulation of the European Union and United Kingdom (<strong>GDPR / UK&nbsp;GDPR</strong>), and the California Consumer Privacy Act as amended by the California Privacy Rights Act (<strong>CCPA/CPRA</strong>), where applicable.
            </p>
            <p>
              We have written this Policy to be as clear and specific as possible. If anything is unclear, please contact us using the information in Section&nbsp;17.
            </p>

            <h2 id="scope">2. Who This Policy Applies To</h2>
            <p>This Policy applies to personal information we process about:</p>
            <ul>
              <li><strong>Clients and prospects</strong> — representatives of companies that hire (or consider hiring) talent through Kaptas Global.</li>
              <li><strong>Candidates and professionals</strong> — individuals we source, screen, present to clients, or place with clients.</li>
              <li><strong>Site visitors</strong> — anyone who browses our website, downloads materials, or fills out a contact form.</li>
              <li><strong>Subscribers</strong> — recipients of our newsletter and other marketing communications.</li>
            </ul>
            <p>
              This Policy does not apply to personal information our clients process under their own privacy notices once a candidate has been hired and an employment, contractor, or service relationship is established with the client.
            </p>

            <h2 id="information-we-collect">3. Information We Collect</h2>
            <p>We collect the following categories of personal information:</p>
            <h3>3.1 Information You Provide Directly</h3>
            <ul>
              <li><strong>Contact data</strong>: full name, business email, company, role, country, phone (when provided).</li>
              <li><strong>Hiring-need data</strong>: information you share through our forms about roles you want to fill, seniority, tech stack, budget range, timeline, and preferred hiring model.</li>
              <li><strong>Candidate data</strong>: when you apply or are sourced — name, email, location, professional profile, resume content, work history, language proficiency, salary expectations, and references.</li>
              <li><strong>Communications</strong>: messages, attachments, and notes from emails, calls, video meetings, and chat exchanges with our team.</li>
            </ul>

            <h3>3.2 Information Collected Automatically</h3>
            <ul>
              <li><strong>Device and usage data</strong>: IP address, browser type and version, operating system, referring URL, pages viewed, time on page, and links clicked.</li>
              <li><strong>Approximate location</strong>: derived from IP address (city/country level), not precise GPS.</li>
              <li><strong>Cookies and similar technologies</strong>: see Section&nbsp;13.</li>
            </ul>

            <h3>3.3 Information From Other Sources</h3>
            <ul>
              <li><strong>Public professional profiles</strong>: when we source candidates, we may collect information from publicly available sources such as LinkedIn, GitHub, professional directories, and personal websites.</li>
              <li><strong>References</strong>: information shared by professional references with the candidate's consent.</li>
              <li><strong>Business partners</strong>: lead-generation, analytics, and outreach tools we use to identify and engage prospective clients.</li>
            </ul>
            <p>
              We do not knowingly collect <strong>sensitive personal data</strong> (such as data about racial origin, religion, health, sexual orientation, political opinions, or trade-union membership). If such information is incidentally included in a candidate's profile or resume, we do not use it for screening and we remove it where reasonably possible.
            </p>

            <h2 id="how-we-use">4. How We Use Information</h2>
            <p>We use personal information for the following purposes:</p>
            <ul>
              <li><strong>To deliver our Services</strong>: sourcing, screening, presenting candidates to clients, coordinating interviews, managing placements, and supporting payroll and compliance.</li>
              <li><strong>To communicate with you</strong>: respond to inquiries, schedule calls, send proposals and contracts, and follow up on ongoing engagements.</li>
              <li><strong>To market our Services</strong>: send relevant content and offers to prospective clients, subject to applicable opt-out and consent requirements.</li>
              <li><strong>To improve the Site and Services</strong>: understand how visitors use the Site, troubleshoot issues, and refine our content and product strategy.</li>
              <li><strong>To comply with law and protect rights</strong>: meet legal obligations, enforce our Terms of Service, prevent fraud, and protect the safety of users and third parties.</li>
            </ul>
            <p>
              We do not sell personal information for monetary consideration, and we do not engage in profiling that produces legal or similarly significant effects on you without human review.
            </p>

            <h2 id="legal-bases">5. Legal Bases for Processing</h2>
            <p>
              Where the LGPD, GDPR, or UK&nbsp;GDPR applies, we rely on the following legal bases:
            </p>
            <ul>
              <li><strong>Contract performance</strong> — to provide the Services you or your employer have requested.</li>
              <li><strong>Legitimate interests</strong> — to run, secure, and grow our business (including B2B outreach to professional contacts at companies that match our ideal client profile), balanced against your interests and rights.</li>
              <li><strong>Consent</strong> — for marketing communications where consent is required, for non-essential cookies, and for processing in jurisdictions where consent is the appropriate basis.</li>
              <li><strong>Legal obligation</strong> — to comply with applicable law, regulation, court order, or government request.</li>
            </ul>
            <p>You can withdraw consent at any time without affecting the lawfulness of processing carried out before withdrawal.</p>

            <h2 id="how-we-share">6. How We Share Information</h2>
            <p>We share personal information only as described below:</p>
            <ul>
              <li><strong>With clients</strong> — when we present qualified candidates, we share the candidate's professional profile and screening notes with the prospective employer. Candidates are informed before their profile is shared.</li>
              <li><strong>With service providers</strong> — vendors that help us run the Site and the Services (see Section&nbsp;7).</li>
              <li><strong>With professional and legal advisors</strong> — accountants, lawyers, and auditors under confidentiality obligations.</li>
              <li><strong>In business transactions</strong> — if we are involved in a merger, acquisition, financing, or sale of assets, personal information may be disclosed to the counterparty under appropriate safeguards.</li>
              <li><strong>For legal reasons</strong> — to comply with law, respond to lawful requests, enforce our agreements, or protect rights, property, and safety.</li>
            </ul>
            <p>We do not share personal information with third parties for their own independent marketing without your consent.</p>

            <h2 id="service-providers">7. Service Providers and Sub-Processors</h2>
            <p>We use a limited set of trusted vendors to operate the Site and Services. As of the Last Updated date above, these include:</p>
            <ul>
              <li><strong>Vercel Inc.</strong> — website hosting and content delivery.</li>
              <li><strong>Web3Forms</strong> — secure transmission of contact-form submissions to our team.</li>
              <li><strong>Google LLC</strong> — Gemini AI API for the AI-assisted features on the Site, and Google Workspace for internal email and file storage.</li>
              <li><strong>LinkedIn</strong> — sourcing and professional outreach.</li>
              <li><strong>Email and CRM tools</strong> — to manage sales pipeline and client relationships.</li>
            </ul>
            <p>
              Each provider processes personal information only on our instructions and under contractual obligations that include security, confidentiality, and data-protection requirements appropriate to the processing.
            </p>

            <h2 id="international-transfers">8. International Data Transfers</h2>
            <p>
              Kaptas Global is incorporated in the United States and operates a distributed team that includes Brazil and other Latin American countries. As a result, personal information may be transferred to, processed in, and stored in countries other than the country where it was collected — including the United States and Brazil — which may have data-protection laws that differ from those in your jurisdiction.
            </p>
            <p>
              When we transfer personal information from the European Economic Area, the United Kingdom, Switzerland, or Brazil to countries that have not been recognized as offering an adequate level of protection, we use appropriate safeguards, including <strong>Standard Contractual Clauses</strong> approved by the European Commission and equivalent mechanisms recognized by the ANPD in Brazil.
            </p>

            <h2 id="retention">9. Data Retention</h2>
            <p>
              We retain personal information only as long as necessary for the purposes described in this Policy or as required by law. In general:
            </p>
            <ul>
              <li><strong>Client and prospect data</strong> — for the duration of the relationship and up to <strong>five (5) years</strong> after the last interaction, to support repeat engagements and comply with commercial-record obligations.</li>
              <li><strong>Candidate data</strong> — up to <strong>two (2) years</strong> after the last interaction, unless the candidate has been placed (in which case we retain the engagement record for the period required by labor and tax law).</li>
              <li><strong>Marketing-list data</strong> — until you unsubscribe or otherwise withdraw consent.</li>
              <li><strong>Site analytics</strong> — typically up to <strong>fourteen (14) months</strong> in identifiable form.</li>
              <li><strong>Records required by law</strong> — for the legally mandated retention period (for example, tax and accounting records).</li>
            </ul>
            <p>After the applicable retention period, we delete, anonymize, or aggregate the information.</p>

            <h2 id="security">10. Information Security</h2>
            <p>
              We apply technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, and destruction. These measures include encryption of data in transit (HTTPS/TLS), access controls, the principle of least privilege, regular software updates, and ongoing review of our security posture.
            </p>
            <p>
              No system can be guaranteed to be completely secure. If we become aware of a personal-data breach that is likely to result in a risk to your rights and freedoms, we will notify affected individuals and the competent authorities as required by applicable law.
            </p>

            <h2 id="your-rights">11. Your Rights</h2>
            <p>
              You have rights over your personal information. The specific rights depend on where you live and the law that applies. The sections below summarize the most common frameworks. We honor verified requests from any individual, regardless of jurisdiction, to the extent feasible.
            </p>

            <h3 id="rights-lgpd">11.1 Rights Under LGPD (Brazil)</h3>
            <p>If you are in Brazil, you have the right to:</p>
            <ul>
              <li>Confirm the existence of processing of your personal data.</li>
              <li>Access your personal data.</li>
              <li>Correct incomplete, inaccurate, or outdated data.</li>
              <li>Anonymize, block, or delete unnecessary, excessive, or unlawfully processed data.</li>
              <li>Request the portability of your data to another service or product provider.</li>
              <li>Delete personal data processed on the basis of consent.</li>
              <li>Receive information about the public and private entities with which we share your data.</li>
              <li>Be informed about the possibility of denying consent and the consequences of that denial.</li>
              <li>Withdraw consent at any time.</li>
              <li>File a complaint with the Brazilian Data Protection Authority (<strong>ANPD</strong>).</li>
            </ul>

            <h3 id="rights-gdpr">11.2 Rights Under GDPR (EEA / UK)</h3>
            <p>If you are in the European Economic Area, the United Kingdom, or Switzerland, you have the right to:</p>
            <ul>
              <li>Access your personal data.</li>
              <li>Request rectification of inaccurate data.</li>
              <li>Request erasure ("the right to be forgotten") in certain circumstances.</li>
              <li>Restrict processing in certain circumstances.</li>
              <li>Object to processing carried out on the basis of legitimate interests, including for direct marketing.</li>
              <li>Receive your personal data in a portable format.</li>
              <li>Withdraw consent at any time.</li>
              <li>Lodge a complaint with your local data-protection supervisory authority.</li>
            </ul>

            <h3 id="rights-ccpa">11.3 Rights Under CCPA/CPRA (California)</h3>
            <p>If you are a California resident, you have the right to:</p>
            <ul>
              <li>Know what personal information we collect, use, disclose, and (where applicable) "share" or "sell" — as those terms are defined under California law.</li>
              <li>Access the specific pieces and categories of personal information we have collected.</li>
              <li>Request deletion of personal information, subject to legal exceptions.</li>
              <li>Correct inaccurate personal information.</li>
              <li>Limit the use and disclosure of sensitive personal information.</li>
              <li>Opt out of the "sale" or "sharing" of personal information for cross-context behavioral advertising. <strong>We do not sell or share personal information as those terms are defined under the CCPA/CPRA.</strong></li>
              <li>Non-discrimination for exercising your privacy rights.</li>
            </ul>
            <p>You may designate an authorized agent to make a request on your behalf, subject to verification.</p>

            <h2 id="how-to-exercise">12. How to Exercise Your Rights</h2>
            <p>
              To exercise any of the rights described above, email <a href="mailto:support@kaptasglobal.io">support@kaptasglobal.io</a>. Please describe your request and the jurisdiction whose rights you are invoking. We may need to verify your identity before processing the request, which typically requires confirming information we already have on file. We will respond within the timeframe required by applicable law (generally within <strong>15&nbsp;days</strong> under LGPD and <strong>30&nbsp;days</strong> under GDPR and CCPA/CPRA, with one possible extension where permitted).
            </p>

            <h2 id="cookies">13. Cookies and Similar Technologies</h2>
            <p>
              The Site uses cookies and similar technologies (such as local storage and pixel tags) to operate the Site, remember your preferences, and understand how the Site is used. We categorize them as follows:
            </p>
            <ul>
              <li><strong>Strictly necessary</strong> — required for the Site to function (e.g., load balancing, form submissions).</li>
              <li><strong>Functional</strong> — remember your choices, such as language or accessibility preferences.</li>
              <li><strong>Analytics</strong> — help us understand which pages are visited and how visitors arrive at the Site. We aggregate and pseudonymize this data wherever possible.</li>
            </ul>
            <p>
              You can control cookies through your browser settings. If you reject non-essential cookies, parts of the Site may not function as intended.
            </p>

            <h2 id="ai">14. Artificial Intelligence Features</h2>
            <p>
              Some features of the Site and Services use AI-assisted tools (including the Google Gemini API) to summarize information, generate first-draft content, and surface insights. When you interact with these features, the content you submit is processed by the AI provider under terms that prohibit the use of your data to train their models, and is not retained by us beyond what is necessary to deliver the requested output.
            </p>
            <p>
              We do not use AI to make automated decisions that produce legal or similarly significant effects on you without meaningful human review.
            </p>

            <h2 id="children">15. Children's Privacy</h2>
            <p>
              The Site and Services are intended for use by adults in a professional context. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected information from a child, please contact us and we will delete it.
            </p>

            <h2 id="changes">16. Changes to This Policy</h2>
            <p>
              We may update this Policy from time to time to reflect changes in our practices, the Services, or applicable law. The "Last Updated" date at the top of this page indicates when the Policy was last revised. Material changes will be communicated through prominent notice on the Site or, where appropriate, by email.
            </p>

            <h2 id="contact">17. Contact and Data Protection Inquiries</h2>
            <p>
              For any privacy-related question or to exercise the rights described in Section&nbsp;11, contact us at:
            </p>
            <p>
              <strong>HR Technology LLC</strong> (d/b/a Kaptas Global)<br />
              801 Brickell Ave, 8th Floor<br />
              Miami, FL 33131, United States<br />
              Email: <a href="mailto:support@kaptasglobal.io">support@kaptasglobal.io</a><br />
              Phone: <a href="tel:+16892939252">+1 (689) 293-9252</a>
            </p>
          </article>
        </div>

        {/* CTA footer */}
        <div className="mt-20 max-w-3xl lg:ml-[19rem]">
          <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center text-kaptas-green shrink-0">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base mb-1">Privacy questions?</h3>
                <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                  Reach our team directly. We respond to data-protection requests within the timeframe required by applicable law.
                </p>
              </div>
            </div>
            <a
              href="mailto:support@kaptasglobal.io"
              className="bg-kaptas-green text-kaptas-black px-5 py-2.5 rounded-lg border border-kaptas-green text-sm font-semibold hover:brightness-90 transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_var(--color-kaptas-green)] w-fit whitespace-nowrap"
            >
              Contact our team
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="mx-3">·</span>
            <Link to="/" className="hover:text-white transition-colors">Back to home</Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
