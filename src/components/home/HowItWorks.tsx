import { motion } from "motion/react";
import { fadeIn } from "./animations";
import { TIME_TO_HIRE_WINDOW } from "../../data/claims";

// Componente explicando o processo de contratação
export function HowItWorks() {
  return (
    <motion.section {...fadeIn} id="how-it-works" className="px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
          From kickoff to hire in <span className="text-kaptas-purple">{TIME_TO_HIRE_WINDOW}</span>
        </h2>
        <p className="text-xl text-gray-400 font-medium">
          You interview 3 finalists. We handle the other 50.
        </p>
      </div>

      <div className="relative mt-8">
        {/* Horizontal Line (Desktop only) */}
        <div className="hidden lg:block absolute top-[27px] left-[50px] right-[50px] h-[1px] bg-gradient-to-r from-kaptas-purple/50 via-white/10 to-kaptas-green/50 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              step: "01",
              title: "Strategic Alignment",
              desc: "Deep-dive into your technical stack, engineering culture, and product roadmap. We calibrate our search to your exact specifications.",
              color: "text-kaptas-purple",
              borderColor: "border-kaptas-purple/30",
              bgColor: "bg-kaptas-purple/10",
              metric: "Day 1"
            },
            {
              step: "02",
              title: "Sourcing & Vetting",
              desc: "We headhunt from target companies, run technical screens, and validate English proficiency. Three finalists delivered.",
              color: "text-white",
              borderColor: "border-white/20",
              bgColor: "bg-white/5",
              metric: "Days 2-5"
            },
            {
              step: "03",
              title: "Interviews",
              desc: "You interview only the finalists. We handle the scheduling, technical assessments, and logistics.",
              color: "text-white",
              borderColor: "border-white/20",
              bgColor: "bg-white/5",
              metric: "Days 6-11"
            },
            {
              step: "04",
              title: "Hire & Onboard",
              desc: "Offer, contract, compliance, and onboarding. All handled. Your new engineer starts shipping.",
              color: "text-kaptas-green",
              borderColor: "border-kaptas-green/30",
              bgColor: "bg-kaptas-green/10",
              metric: "Days 12-14"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group flex flex-col"
            >
              {/* Node */}
              <div className={`w-14 h-14 rounded-full bg-[#111111] border ${item.borderColor} flex items-center justify-center z-10 mb-6 group-hover:scale-110 transition-transform duration-300 relative`}>
                <span className={`font-mono text-sm font-bold ${item.color}`}>{item.step}</span>
              </div>
              
              {/* Content Card */}
              <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 relative overflow-hidden flex flex-col flex-1 group-hover:bg-[#161616]">
                <div className={`absolute top-0 left-0 w-full h-1 ${item.bgColor}`}></div>
                
                <div className="flex-1 mb-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
                
                <div className="mt-auto">
                  <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    {item.metric}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
