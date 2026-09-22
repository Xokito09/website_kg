import { motion } from "motion/react";
import { fadeIn } from "./animations";
import { COST_SAVINGS } from "../../data/claims";

// Componente de comparação de custos
export function CostComparison() {
  return (
    <motion.section {...fadeIn} className="px-6 md:px-12 max-w-7xl mx-auto w-full mb-32">
      <div className="bg-[#0A0A0A] rounded-3xl p-[1px] shadow-2xl relative overflow-hidden group">
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-kaptas-green/30 via-transparent to-kaptas-purple/30 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="bg-[#111111] rounded-[23px] p-8 md:p-16 relative z-10 h-full w-full overflow-hidden">
          {/* Glow effects */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-kaptas-green/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-blue/15 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-3xl mx-auto text-center mb-16 relative z-20">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
              The real cost comparison
            </h2>
            <p className="text-lg text-gray-400 font-medium">
              Same talent. Same timezone. Different cost structure.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto relative z-20">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-3 gap-4 border-b border-white/10 pb-6 mb-6">
              <div className="col-span-1"></div>
              <div className="col-span-1 text-center">
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">US Talent</div>
                <div className="text-2xl font-black text-white">Senior Engineer</div>
              </div>
              <div className="col-span-1 text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-kaptas-green/10 text-kaptas-green border border-kaptas-green/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                  Kaptas Global
                </div>
                <div className="text-sm font-bold text-kaptas-green uppercase tracking-widest mb-2 mt-4">Brazil Talent</div>
                <div className="text-2xl font-black text-white">Senior Engineer</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              {/* Row 1 */}
              <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-4 py-4 border-b border-white/5 items-start md:items-center hover:bg-white/[0.02] transition-colors rounded-lg md:px-4 md:-mx-4">
                <div className="col-span-1 text-sm font-medium text-gray-400 w-full mb-2 md:mb-0">Base Salary (Annual)</div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-gray-500 uppercase font-bold">US Talent:</span>
                  <span className="font-mono text-gray-300">$130k - $160k</span>
                </div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-kaptas-green uppercase font-bold">Brazil Talent:</span>
                  <span className="font-mono text-kaptas-green font-bold">$60k - $80k</span>
                </div>
              </div>
              {/* Row 2 */}
              <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-4 py-4 border-b border-white/5 items-start md:items-center hover:bg-white/[0.02] transition-colors rounded-lg md:px-4 md:-mx-4">
                <div className="col-span-1 text-sm font-medium text-gray-400 w-full mb-2 md:mb-0">Taxes, Benefits & Equity</div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-gray-500 uppercase font-bold">US Talent:</span>
                  <span className="font-mono text-gray-300">+$30,000 (Min)</span>
                </div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-kaptas-green uppercase font-bold">Brazil Talent:</span>
                  <span className="font-mono text-kaptas-green font-bold">$0 (Included)</span>
                </div>
              </div>
              {/* Row 3 */}
              <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-4 py-4 border-b border-white/5 items-start md:items-center hover:bg-white/[0.02] transition-colors rounded-lg md:px-4 md:-mx-4">
                <div className="col-span-1 text-sm font-medium text-gray-400 w-full mb-2 md:mb-0">Seniority</div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-gray-500 uppercase font-bold">US Talent:</span>
                  <span className="font-mono text-gray-300">5-8+ years</span>
                </div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-kaptas-green uppercase font-bold">Brazil Talent:</span>
                  <span className="font-mono text-kaptas-green font-bold">5-8+ years</span>
                </div>
              </div>
              {/* Row 4 */}
              <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-4 py-4 border-b border-white/5 items-start md:items-center hover:bg-white/[0.02] transition-colors rounded-lg md:px-4 md:-mx-4">
                <div className="col-span-1 text-sm font-medium text-gray-400 w-full mb-2 md:mb-0">English Proficiency</div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-gray-500 uppercase font-bold">US Talent:</span>
                  <span className="font-mono text-gray-300">Native</span>
                </div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-kaptas-green uppercase font-bold">Brazil Talent:</span>
                  <span className="font-mono text-kaptas-green font-bold">Fluent</span>
                </div>
              </div>
              {/* Row 5 */}
              <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-4 py-4 border-b border-white/5 items-start md:items-center hover:bg-white/[0.02] transition-colors rounded-lg md:px-4 md:-mx-4">
                <div className="col-span-1 text-sm font-medium text-gray-400 w-full mb-2 md:mb-0">Timezone Overlap</div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-gray-500 uppercase font-bold">US Talent:</span>
                  <span className="font-mono text-gray-300">100% (PST/EST)</span>
                </div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-kaptas-green uppercase font-bold">Brazil Talent:</span>
                  <span className="font-mono text-kaptas-green font-bold">100% (EST/PST Aligned)</span>
                </div>
              </div>
              {/* Row 4 */}
              <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-4 py-4 border-b border-white/5 items-start md:items-center hover:bg-white/[0.02] transition-colors rounded-lg md:px-4 md:-mx-4">
                <div className="col-span-1 text-sm font-medium text-gray-400 w-full mb-2 md:mb-0">Average Time to Hire</div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-gray-500 uppercase font-bold">US Talent:</span>
                  <span className="font-mono text-gray-300">45 - 90 Days</span>
                </div>
                <div className="col-span-1 flex justify-between md:justify-center w-full md:w-auto">
                  <span className="md:hidden text-xs text-kaptas-green uppercase font-bold">Brazil Talent:</span>
                  <span className="font-mono text-kaptas-green font-bold">14 - 21 Days</span>
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mt-8 pt-8 border-t border-white/10 items-center bg-white/[0.02] rounded-2xl p-6 md:p-8 border border-white/5">
              <div className="col-span-1 text-center md:text-left">
                <div className="text-xl font-bold text-white">Total Annual Cost</div>
                <div className="text-sm text-gray-500 mt-1">Fully loaded per engineer</div>
              </div>
              <div className="col-span-1 text-center flex flex-col items-center justify-center">
                <span className="md:hidden text-xs text-gray-500 uppercase font-bold mb-1">US Talent</span>
                <div className="text-3xl font-black text-gray-500 line-through decoration-red-500/50 decoration-2">$180,000+</div>
              </div>
              <div className="col-span-1 text-center relative flex flex-col items-center justify-center">
                <span className="md:hidden text-xs text-kaptas-green uppercase font-bold mb-1">Brazil Talent</span>
                <div className="absolute -inset-4 bg-kaptas-green/20 blur-2xl rounded-full z-0"></div>
                <div className="text-5xl md:text-6xl font-black text-white relative z-10 drop-shadow-[0_0_15px_rgba(63,185,80,0.5)] flex items-baseline justify-center gap-2">
                  $70k
                  <span className="text-lg md:text-xl font-medium text-gray-400 tracking-normal drop-shadow-none">All-in</span>
                </div>
                <div className="text-kaptas-green font-bold text-sm mt-3 relative z-10 bg-kaptas-green/10 px-4 py-1.5 rounded-full border border-kaptas-green/20">{COST_SAVINGS.toUpperCase()} BURN REDUCTION</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
