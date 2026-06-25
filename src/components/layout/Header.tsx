import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Logo } from "../Logo";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const services = [
    { name: "Direct Hire", path: "/direct-hire" },
    { name: "Outsourcing & Staffing", path: "/contractor-staffing" },
    { name: "Executive Mapping", path: "/executive-mapping" },
    { name: "Hire in Brazil", path: "/hire-in-brazil" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-[#050505]/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            
            <div className="relative group">
              <button 
                className="flex items-center gap-1 hover:text-white transition-colors"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Dropdown */}
              <div 
                className={cn(
                  "absolute top-full left-0 pt-4 w-64 transition-all duration-200 origin-top-left",
                  servicesOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                )}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-2 shadow-2xl flex flex-col gap-1">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden md:block">
            <Link
              to="/get-started"
              className="bg-kaptas-green text-kaptas-black px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 py-4 px-6 flex flex-col gap-4 shadow-2xl overflow-hidden"
            >
              <Link to="/" className="text-lg font-medium text-gray-300 hover:text-white">Home</Link>
              <Link to="/pricing" className="text-lg font-medium text-gray-300 hover:text-white">Pricing</Link>
              <Link to="/blog" className="text-lg font-medium text-gray-300 hover:text-white">Blog</Link>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-2">Services</span>
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="text-lg font-medium text-gray-300 hover:text-white pl-4 border-l border-white/10"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/get-started"
                className="bg-kaptas-green text-kaptas-black px-6 py-3 rounded-full text-base font-semibold text-center hover:brightness-90 transition-colors mt-2"
              >
                Get Started
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
