import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Scale, Mail, ArrowRight } from "lucide-react";
import { SEO } from "../components/SEO";
import { organizationSchema, buildBreadcrumbSchema, SITE_URL } from "../data/seoSchemas";

const LAST_UPDATED = "May 18, 2026";
const EFFECTIVE_DATE = "May 18, 2026";

const sections = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "services", label: "2. Description of Services" },
  { id: "eligibility", label: "3. Eligibility" },
  { id: "engagement", label: "4. Engagement Terms" },
  { id: "user-conduct", label: "5. Acceptable Use" },
  { id: "intellectual-property", label: "6. Intellectual Property" },
  { id: "candidate-content", label: "7. Candidate Information and Confidentiality" },
  { id: "non-circumvention", label: "8. Candidate Non-Circumvention" },
  { id: "third-party", label: "9. Third-Party Services and Links" },
  { id: "fees", label: "10. Fees and Payment" },
  { id: "warranties", label: "11. Disclaimers of Warranties" },
  { id: "liability", label: "12. Limitation of Liability" },
  { id: "indemnification", label: "13. Indemnification" },
  { id: "term-termination", label: "14. Term and Termination" },
  { id: "governing-law", label: "15. Governing Law" },
  { id: "disputes", label: "16. Dispute Resolution and Arbitration" },
  { id: "modifications", label: "17. Modifications to These Terms" },
  { id: "miscellaneous", label: "18. Miscellaneous" },
  { id: "contact", label: "19. Contact" },
];

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service — Kaptas Global",
  "url": "https://kaptasglobal.io/terms-of-service",
  "description": "Terms governing your use of Kaptas Global's website and recruitment, staffing, and market-entry services.",
  "inLanguage": "en-US",
  "dateModified": "2026-05-18",
  "publisher": { "@type": "Organization", "name": "Kaptas Global", "url": "https://kaptasglobal.io" },
  "about": { "@type": "Thing", "name": "Terms of service and contractual conditions" }
};

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service — Kaptas Global"
        description="The terms that govern your use of Kaptas Global's website and recruitment, staffing, and market-entry services. Includes eligibility, fees, intellectual property, warranties, liability, and dispute resolution."
        keywords="kaptas global terms of service, recruitment service agreement, staffing terms, hiring terms and conditions"
        canonical="https://kaptasglobal.io/terms-of-service"
        schemas={[
          organizationSchema,
          termsSchema,
          buildBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Terms of Service", url: `${SITE_URL}/terms-of-service` },
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
              <Scale className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Legal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kaptas-green to-kaptas-purple">
              Service
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light mb-6">
            The rules that govern your access to and use of Kaptas Global's website and services.
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
                        className="text-gray-400 hover:text-kaptas-green transition-colors block"
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
              max-w-none"
          >
            <p className="text-gray-300 italic mb-8 border-l-2 border-kaptas-green/40 pl-4">
              Please read these Terms of Service carefully. They contain important information about your legal rights, remedies, and obligations, including a limitation of liability and a binding arbitration provision.
            </p>

            <h2 id="acceptance">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service (the <strong>"Terms"</strong>) are entered into between you (<strong>"you"</strong> or <strong>"Client"</strong>) and HR Technology LLC, a Florida limited liability company doing business as <strong>Kaptas Global</strong>, with its principal place of business at 801 Brickell Ave, 8th&nbsp;Floor, Miami, FL 33131 (<strong>"Kaptas Global,"</strong> <strong>"we,"</strong> <strong>"us,"</strong> or <strong>"our"</strong>).
            </p>
            <p>
              By accessing or using the website at <a href="https://kaptasglobal.io">kaptasglobal.io</a> (the <strong>"Site"</strong>) or any of the recruitment, staffing, market-intelligence, or related services we offer (collectively, the <strong>"Services"</strong>), you agree to be bound by these Terms and by our <Link to="/privacy-policy">Privacy Policy</Link>. If you do not agree, do not use the Site or the Services.
            </p>

            <h2 id="services">2. Description of Services</h2>
            <p>Kaptas Global offers the following Services. Each engagement is governed by an additional written agreement (a <strong>"Service Agreement"</strong>) that takes precedence over these Terms in the event of conflict.</p>
            <ul>
              <li><strong>Direct Hire</strong> — sourcing, screening, and presenting pre-vetted candidates for permanent or contractor positions, in exchange for a one-time placement fee.</li>
              <li><strong>Outsourcing &amp; Staffing</strong> — placing dedicated professionals on Client teams with Kaptas Global acting as employer of record in Brazil, in exchange for a flat monthly fee.</li>
              <li><strong>Executive Mapping</strong> — delivery of a market-intelligence report covering competitor compensation, team structures, salary benchmarks, and a ranked shortlist of leadership candidates.</li>
              <li><strong>Hire in Brazil</strong> — market-entry consulting including compensation analysis, hiring-model recommendation, and first-hire support for companies entering Brazil.</li>
            </ul>
            <p>
              The Site also offers informational content, including blog articles and downloadable resources. Such content is provided for general information only and does not constitute legal, tax, or employment advice.
            </p>

            <h2 id="eligibility">3. Eligibility</h2>
            <p>
              You may use the Services only if you are at least 18 years old (or the age of majority in your jurisdiction) and have the legal authority to enter into a binding contract. If you use the Services on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.
            </p>

            <h2 id="engagement">4. Engagement Terms</h2>
            <p>
              Communications, proposals, and exchanges with Kaptas Global prior to the execution of a written Service Agreement are non-binding and do not create an obligation to provide or pay for Services. Once a Service Agreement is signed, it governs the scope, deliverables, fees, replacement guarantees, and any service-level commitments applicable to that engagement.
            </p>
            <p>
              In the absence of a separate Service Agreement, no Services are deemed to have been engaged regardless of any informal discussions, candidate introductions, or shared materials.
            </p>

            <h2 id="user-conduct">5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Site or Services for any unlawful, fraudulent, or harmful purpose.</li>
              <li>Misrepresent your identity, affiliation, or hiring intent.</li>
              <li>Approach candidates introduced through Kaptas Global outside the engagement, except as expressly permitted by the applicable Service Agreement.</li>
              <li>Reverse engineer, decompile, scrape, or otherwise extract data from the Site by automated means without our prior written consent.</li>
              <li>Interfere with or disrupt the Site, the Services, or the systems on which they run.</li>
              <li>Submit personal information about third parties without the legal authority to do so.</li>
            </ul>

            <h2 id="intellectual-property">6. Intellectual Property</h2>
            <p>
              The Site and its contents — including text, graphics, logos, illustrations, software, and the arrangement and selection of all of the foregoing — are owned by Kaptas Global or its licensors and are protected by intellectual-property laws. We grant you a limited, revocable, non-exclusive, non-transferable license to access and use the Site for your internal business purposes.
            </p>
            <p>
              Nothing in these Terms transfers ownership of any of our intellectual property to you. Any feedback or suggestions you provide regarding the Site or Services may be used by us without obligation or compensation.
            </p>
            <p>
              <strong>Work product ownership.</strong> Subject to payment of all applicable fees, Client owns the work product produced by a placed professional under an Outsourcing &amp; Staffing engagement, as detailed in the Service Agreement. Under Direct Hire, ownership flows directly to Client through Client's own employment or contractor relationship with the placed professional.
            </p>

            <h2 id="candidate-content">7. Candidate Information and Confidentiality</h2>
            <p>
              Candidate profiles, resumes, screening notes, and market-intelligence reports we share with you contain confidential information. You agree to use that information solely for the purpose of evaluating, hiring, or engaging the relevant professionals and to protect it with at least the same degree of care that you use to protect your own confidential information of similar importance.
            </p>
            <p>
              You may not share candidate information with third parties (other than your employees and advisors with a need to know) without the candidate's prior written consent. The processing of candidate personal information is also governed by our <Link to="/privacy-policy">Privacy Policy</Link> and by data-protection laws including the LGPD, GDPR, and CCPA/CPRA.
            </p>

            <h2 id="non-circumvention">8. Candidate Non-Circumvention</h2>

            <h3>8.1 Introduced Candidates</h3>
            <p>
              An <strong>"Introduced Candidate"</strong> is any individual whose name, contact information, professional profile, resume, screening notes, market-mapping data, or any portion thereof Kaptas Global has disclosed, presented, or otherwise made available to Client in connection with the Site or any actual or prospective Service. The introduction is effective on the first date any such information is shared with Client, regardless of medium (email, document, call notes, platform, or otherwise) and regardless of whether the Introduced Candidate is ultimately presented for a specific role.
            </p>

            <h3>8.2 Restriction Period</h3>
            <p>
              For a period of <strong>twelve (12) months</strong> following the date of first introduction of an Introduced Candidate (the <strong>"Restriction Period"</strong>), Client shall not, directly or indirectly — and shall cause its affiliates, subsidiaries, parent companies, and entities under common control not to — (i)&nbsp;hire, employ, engage, retain, or otherwise compensate the Introduced Candidate as an employee, contractor, consultant, advisor, board member, fractional executive, or in any other capacity; (ii)&nbsp;enter into any staffing, employer-of-record, agency, or contracting arrangement that places the Introduced Candidate on Client's team through a third party; or (iii)&nbsp;refer, recommend, or introduce the Introduced Candidate to any third party for the purpose of being hired or engaged by that third party.
            </p>

            <h3>8.3 Permitted Engagements</h3>
            <p>
              The Restriction Period does not apply to placements executed through Kaptas Global under a signed Service Agreement with all applicable fees paid. The Restriction Period also does not apply where Client can demonstrate, with written records, that it had an active and documented relationship with the individual <em>prior to</em> Kaptas Global's first introduction.
            </p>

            <h3>8.4 Circumvention Fee</h3>
            <p>
              If Client breaches Section&nbsp;8.2, Client shall pay Kaptas Global a fee (the <strong>"Circumvention Fee"</strong>) equal to <strong>thirty percent (30%) of the Introduced Candidate's annualized total compensation</strong> — including base compensation, target bonuses, the fair market value of equity granted, and the cash value of recurring benefits — measured as of the date the Introduced Candidate begins providing services to Client or any of its affiliates, with a minimum Circumvention Fee of <strong>ten thousand U.S. dollars (USD&nbsp;10,000)</strong>. The Circumvention Fee is due within fifteen (15)&nbsp;calendar days of Kaptas Global's invoice. Unpaid amounts accrue interest at the maximum rate permitted by applicable law, and Client is responsible for the reasonable collection costs Kaptas Global incurs, including attorneys' fees.
            </p>

            <h3>8.5 Liquidated Damages, Not a Penalty</h3>
            <p>
              The parties acknowledge that the actual damages caused by circumvention are difficult to ascertain with precision, and that the Circumvention Fee represents a reasonable and good-faith pre-estimate of Kaptas Global's likely loss — including direct placement revenue, sunk sourcing and screening cost, lost repeat-placement opportunity, and damage to candidate-network goodwill. The Circumvention Fee is not, and is not intended to be, a penalty. If any court of competent jurisdiction determines that the stated amount is unenforceable in part, it shall be reduced to the maximum amount permitted by law and the remainder of this Section shall remain in full force.
            </p>

            <h3>8.6 Cooperation and Verification</h3>
            <p>
              During the Restriction Period and for six (6)&nbsp;months thereafter, Client shall, upon reasonable written request from Kaptas Global, confirm in writing whether it or any of its affiliates has hired, engaged, or otherwise compensated a specific Introduced Candidate, and provide reasonable supporting documentation. Client shall maintain accurate internal records of its hiring decisions during the Restriction Period sufficient to permit such verification.
            </p>

            <h3>8.7 Survival</h3>
            <p>
              This Section&nbsp;8 survives the termination, expiration, or rescission of these Terms and of any Service Agreement, for the full duration of the Restriction Period applicable to each Introduced Candidate.
            </p>

            <h2 id="third-party">9. Third-Party Services and Links</h2>
            <p>
              The Site and Services may reference, embed, or link to third-party websites, products, or services. We do not control and are not responsible for the content, policies, or practices of third parties. Your use of any third-party service is at your own risk and is governed by the third party's own terms and privacy notices.
            </p>

            <h2 id="fees">10. Fees and Payment</h2>
            <p>
              Fees, billing cadence, currency, applicable taxes, and payment terms are defined in the applicable Service Agreement and are exclusive of any sales, value-added, or similar taxes that may apply.
            </p>
            <p>
              Late payments may accrue interest at the maximum rate permitted by applicable law. Client is responsible for collection costs, including reasonable attorneys' fees, incurred to recover amounts not paid when due.
            </p>

            <h2 id="warranties">11. Disclaimers of Warranties</h2>
            <p>
              <strong>The Site is provided on an "AS IS" and "AS AVAILABLE" basis.</strong> To the maximum extent permitted by law, Kaptas Global disclaims all warranties, whether express, implied, statutory, or otherwise, including any warranties of merchantability, fitness for a particular purpose, title, non-infringement, and any warranties arising from course of dealing or usage of trade.
            </p>
            <p>
              We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components. We make no warranty regarding any specific result that may be obtained from candidates or any third party. Hiring decisions are made by Client based on Client's own evaluation. Past performance of placements is not a guarantee of future results.
            </p>

            <h2 id="liability">12. Limitation of Liability</h2>
            <p>
              <strong>To the maximum extent permitted by law, in no event shall Kaptas Global, its officers, directors, employees, agents, or affiliates be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including but not limited to loss of profits, revenue, data, business opportunities, goodwill, or other intangible losses, arising out of or in connection with these Terms or the Services, even if advised of the possibility of such damages.</strong>
            </p>
            <p>
              <strong>Kaptas Global's aggregate liability arising out of or in connection with the Site, the Services, or these Terms, regardless of the form of the action, shall not exceed the total fees paid by Client to Kaptas Global in the twelve (12) months preceding the event giving rise to the claim.</strong>
            </p>
            <p>
              Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law, including liability for fraud, gross negligence, or willful misconduct.
            </p>

            <h2 id="indemnification">13. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Kaptas Global and its officers, directors, employees, agents, and affiliates from and against any third-party claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to:
            </p>
            <ul>
              <li>your breach of these Terms or of any Service Agreement;</li>
              <li>your violation of applicable law or of the rights of any third party;</li>
              <li>your employment, engagement, or treatment of any candidate or professional introduced through Kaptas Global; and</li>
              <li>any information you submit through the Site that is unlawful, false, or infringes any third-party right.</li>
            </ul>

            <h2 id="term-termination">14. Term and Termination</h2>
            <p>
              These Terms remain in effect while you use the Site or any Service. Either party may terminate the relationship for material breach if the breach is not cured within thirty (30) days of written notice. Outsourcing &amp; Staffing and other recurring engagements may be terminated as set forth in the applicable Service Agreement.
            </p>
            <p>
              Sections that by their nature should survive termination — including Intellectual Property, Confidentiality, Fees due before termination, Disclaimers, Limitation of Liability, Indemnification, Governing Law, and Dispute Resolution — will survive.
            </p>

            <h2 id="governing-law">15. Governing Law</h2>
            <p>
              These Terms and any dispute arising out of or related to these Terms or the Services are governed by the laws of the <strong>State of Florida</strong>, United States, without regard to its conflict-of-laws principles. The United Nations Convention on Contracts for the International Sale of Goods does not apply.
            </p>

            <h2 id="disputes">16. Dispute Resolution and Arbitration</h2>
            <p>
              <strong>Informal resolution.</strong> Before initiating a formal proceeding, you and Kaptas Global agree to attempt to resolve any dispute through good-faith negotiation by contacting <a href="mailto:support@kaptasglobal.io">support@kaptasglobal.io</a>. If the dispute is not resolved within thirty (30) days, either party may proceed under the following clause.
            </p>
            <p>
              <strong>Binding arbitration.</strong> Any dispute, claim, or controversy arising out of or relating to these Terms, the Services, or the Site that is not resolved informally will be settled by binding arbitration administered in Orange County, Florida, under the Commercial Arbitration Rules of the American Arbitration Association (AAA) by one neutral arbitrator. Judgment on the award may be entered in any court of competent jurisdiction.
            </p>
            <p>
              <strong>Class-action waiver.</strong> You and Kaptas Global agree to bring claims only in an individual capacity and not as a plaintiff or class member in any purported class or representative proceeding. The arbitrator may not consolidate claims or preside over any form of representative or class proceeding.
            </p>
            <p>
              <strong>Carve-outs.</strong> Either party may bring an action in court for injunctive or equitable relief to protect its intellectual property, confidential information, or business operations. Nothing in this Section limits any non-waivable statutory right.
            </p>

            <h2 id="modifications">17. Modifications to These Terms</h2>
            <p>
              We may modify these Terms from time to time. The "Last Updated" date at the top reflects when changes were made. If a change is material, we will provide reasonable advance notice, either through the Site or, where appropriate, by email. Your continued use of the Site or Services after the effective date of a change constitutes your acceptance of the revised Terms.
            </p>

            <h2 id="miscellaneous">18. Miscellaneous</h2>
            <ul>
              <li><strong>Entire agreement.</strong> These Terms, together with the Privacy Policy and any applicable Service Agreement, constitute the entire agreement between you and Kaptas Global regarding the subject matter and supersede all prior or contemporaneous communications and proposals.</li>
              <li><strong>Severability.</strong> If any provision is found unenforceable, the remaining provisions remain in full force.</li>
              <li><strong>No waiver.</strong> A failure to enforce any right or provision is not a waiver of that right or provision.</li>
              <li><strong>Assignment.</strong> You may not assign or transfer these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, financing, or sale of assets.</li>
              <li><strong>Force majeure.</strong> Neither party is liable for failure or delay in performance due to causes beyond its reasonable control.</li>
              <li><strong>Independent contractors.</strong> Nothing in these Terms creates a partnership, joint venture, or employment relationship between you and Kaptas Global. Each party remains an independent contractor.</li>
              <li><strong>Notices.</strong> Legal notices to Kaptas Global must be sent to <a href="mailto:support@kaptasglobal.io">support@kaptasglobal.io</a> and to the address in Section&nbsp;1, with a copy delivered by reputable courier.</li>
            </ul>

            <h2 id="contact">19. Contact</h2>
            <p>
              For questions about these Terms, contact us at:
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
                <h3 className="text-white font-semibold text-base mb-1">Questions about these terms?</h3>
                <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                  We're happy to walk you through the engagement model before any commitment.
                </p>
              </div>
            </div>
            <a
              href="mailto:support@kaptasglobal.io"
              className="bg-kaptas-green text-kaptas-black px-5 py-2.5 rounded-lg border border-kaptas-green text-sm font-semibold hover:brightness-90 transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_var(--color-kaptas-green)] w-fit whitespace-nowrap"
            >
              Talk to our team
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="mx-3">·</span>
            <Link to="/" className="hover:text-white transition-colors">Back to home</Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
