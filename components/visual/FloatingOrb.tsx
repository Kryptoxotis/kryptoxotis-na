"use client"

import React from "react"
import { motion } from "framer-motion"

const FloatingOrb: React.FC = () => {
  return (
    <div className="relative w-40 h-40">
      {/* Outer pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-pulse"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Core orb glow */}
      <motion.div
        className="absolute inset-4 rounded-full bg-emerald-400/30 backdrop-blur-xl shadow-[0_0_40px_#10b981] z-10"
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Echo ripple ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-emerald-400 opacity-20"
        animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  )
}

export default FloatingOrb
