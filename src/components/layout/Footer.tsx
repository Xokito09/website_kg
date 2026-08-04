import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { Logo } from "../Logo";

export function Footer() {
  const services = [
    { name: "Direct Hire", path: "/direct-hire" },
    { name: "Outsourcing & Staffing", path: "/contractor-staffing" },
    { name: "Executive Mapping", path: "/executive-mapping" },
    { name: "Hire in Brazil", path: "/hire-in-brazil" },
  ];

  return (
    <footer className="bg-[#050505] pt-24 pb-10 mt-12 relative z-10 overflow-hidden">
      {/* Premium Separator Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-kaptas-green/10 via-neon-blue/10 to-transparent blur-[100px] pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="md:col-span-12 lg:col-span-4">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity mb-6">
              <Logo />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
              Kaptas Global is a US-incorporated hiring partner founded by Brazilians that sources senior talent in Brazil and Latin America. We handle sourcing, payroll, compliance, and vetting. 300+ placements. Zero upfront cost.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-kaptas-green hover:text-kaptas-black transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="md:col-span-4 lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-4">
              {services.map((service) => (
                <li key={service.path}>
                  <Link to={service.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Headquarters</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-kaptas-green shrink-0" />
                <div>
                  <span className="block text-white font-medium mb-1">Miami - US</span>
                  801 Brickell Ave, 8th Floor<br />Miami, FL 33131
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-kaptas-green shrink-0" />
                <a href="mailto:support@kaptasglobal.io" className="hover:text-white transition-colors">support@kaptasglobal.io</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-kaptas-green shrink-0" />
                <a href="tel:+16892939252" className="hover:text-white transition-colors">+1 (689) 293-9252</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {__BUILD_YEAR__} Kaptas Global. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
