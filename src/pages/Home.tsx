import { SEO } from "../components/SEO";
import { organizationSchema, homeFaqSchema, homeServiceSchema, homeHowToSchema, websiteSchema } from "../data/seoSchemas";
import { Hero } from "../components/home/Hero";
import { SocialProof } from "../components/home/SocialProof";
import { WhyBrazil } from "../components/home/WhyBrazil";
import { Differentiation } from "../components/home/Differentiation";
import { EnterpriseSegment } from "../components/home/EnterpriseSegment";
import { HowItWorks } from "../components/home/HowItWorks";
import { CostComparison } from "../components/home/CostComparison";
import { TalentMapping } from "../components/home/TalentMapping";
import { CaseResults } from "../components/home/CaseResults";
import { ServiceNavigation } from "../components/home/ServiceNavigation";
import { LeadGenerationForm } from "../components/home/LeadGenerationForm";
import { BlogInsights } from "../components/home/BlogInsights";
import { HomeFAQ } from "../components/home/HomeFAQ";

export default function Home() {
  return (
    <div className="flex flex-col gap-32 pb-24">
      <SEO
        title="Hire Developers in Brazil — Kaptas Global | Outsourcing, Direct Hire & Staffing"
        description="Hire senior Brazilian developers, engineers, and specialists for your US team. Outsourcing & Staffing, Direct Hire, Executive Mapping, and market entry support. Up to 60% lower cost, US timezone overlap, candidates in 5 days."
        canonical="https://kaptasglobal.io/"
        ogTitle="Hire Senior Brazilian Talent"
        ogSubtitle="Outsourcing, Direct Hire, Executive Mapping. Candidates in 5 days, hires in 2 to 4 weeks."
        schemas={[websiteSchema, organizationSchema, homeServiceSchema, homeHowToSchema, homeFaqSchema]}
      />
      <Hero />
      {/* <SocialProof /> */}
      <WhyBrazil />
      <Differentiation />
      
      <div className="w-full flex flex-col">
        {/* Soft Transition to Light */}
        <div className="h-4 bg-gradient-to-b from-[#111111] to-[#F9FAFB] w-full relative z-10"></div>
        <EnterpriseSegment />
        {/* Soft Transition to Dark */}
        <div className="h-4 bg-gradient-to-b from-[#F9FAFB] to-[#111111] w-full relative z-10"></div>
      </div>

      <HowItWorks />

      {/* Dark Theme Wrapper for Cost Comparison & Outcomes */}
      <div className="text-white w-full relative z-10">
        <CostComparison />

        <div className="w-full flex flex-col">
          {/* Soft Transition to Light */}
          <div className="h-4 bg-gradient-to-b from-[#111111] to-[#F9FAFB] w-full relative z-10"></div>
          <TalentMapping />
          {/* Soft Transition to Dark */}
          <div className="h-4 bg-gradient-to-b from-[#F9FAFB] to-[#111111] w-full relative z-10"></div>
        </div>

        <CaseResults />
      </div>

      <div className="w-full flex flex-col">
        <ServiceNavigation />
        {/* Soft Transition to Light */}
        <div className="h-4 bg-gradient-to-b from-[#111111] to-[#F9FAFB] w-full relative z-10"></div>
        <div id="lead-form" className="w-full flex flex-col scroll-mt-20">
          <LeadGenerationForm />
        </div>
        {/* Soft Transition to Dark */}
        <div className="h-4 bg-gradient-to-b from-[#F9FAFB] to-[#111111] w-full relative z-10"></div>
      </div>

      <BlogInsights />
      <HomeFAQ />
    </div>
  );
}
