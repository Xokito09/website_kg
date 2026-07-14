import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Route-level code splitting: every non-Home page loads as its own chunk.
// Home stays eager — it is the primary landing/conversion page and must not
// pay an extra network hop. During hydration React 18 keeps the prerendered
// HTML in place while a lazy chunk loads (fallback only shows on client-side
// navigations, which resolve from the edge cache in ~1 RTT).
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const DirectHire = lazy(() => import("./pages/DirectHire"));
const ContractorStaffing = lazy(() => import("./pages/ContractorStaffing"));
const ExecutiveMapping = lazy(() => import("./pages/ExecutiveMapping"));
const StartOperation = lazy(() => import("./pages/StartOperation"));
const Ebook = lazy(() => import("./pages/Ebook"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const Calculator = lazy(() => import("./pages/Calculator"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="direct-hire" element={<DirectHire />} />
            <Route path="contractor-staffing" element={<ContractorStaffing />} />
            <Route path="executive-mapping" element={<ExecutiveMapping />} />
            <Route path="hire-in-brazil" element={<StartOperation />} />
            {/* Focused conversion landing page — rendered inside <Layout> like
                the service pages, so it shares the standard header/nav + footer
                and is visually indistinguishable from a service page. */}
            <Route path="get-started" element={<GetStarted />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="ebook" element={<Ebook />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
