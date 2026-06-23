import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import DirectHire from "./pages/DirectHire";
import ContractorStaffing from "./pages/ContractorStaffing";
import ExecutiveMapping from "./pages/ExecutiveMapping";
import StartOperation from "./pages/StartOperation";
import Ebook from "./pages/Ebook";
import GetStarted from "./pages/GetStarted";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="ebook" element={<Ebook />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
