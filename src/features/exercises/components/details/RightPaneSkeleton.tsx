"use client";

import { motion } from "framer-motion";
import { BicepsFlexed, Dumbbell } from "lucide-react";

/**
 * Loading skeleton for the right pane
 * Shows placeholder content while exercise details are loading
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.0,
      delayChildren: 0.0,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

export function RightPaneSkeleton() {
  return (
    <div className="flex-1 flex md:flex-row flex-col bg-neutral-50">
      <div className="flex-1 relative md:h-full h-[60vh] min-h-[60vh]">
        <div className="w-full h-full bg-neutral-50 flex items-center justify-center">
          <svg
            className="h-12 w-12 text-neutral-200"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="RadialGradient8932">
                <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                <stop
                  offset="100%"
                  stopColor="currentColor"
                  stopOpacity="0.25"
                />
              </linearGradient>
            </defs>
            <style>{`
             @keyframes spin8932 {
               to {
                 transform: rotate(360deg);
               }
             }

             #circle8932 {
               transform-origin: 50% 50%;
               stroke: url(#RadialGradient8932);
               fill: none;
               animation: spin8932 .5s infinite linear;
             }
           `}</style>
            <circle cx="10" cy="10" r="8" id="circle8932" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="md:w-[400px] w-full bg-white md:border-l border-t md:border-t-0 border-neutral-200 overflow-hidden z-20">
        <motion.div
          className="p-6 pb-20 md:pb-6 md:h-full h-auto overflow-y-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-3">
            <div className="skeleton skeleton-title"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <div className="skeleton skeleton-text w-full"></div>
            <div className="skeleton skeleton-text w-full"></div>
            <div className="skeleton skeleton-text w-3/4"></div>
          </motion.div>

          <motion.div className="space-y-5">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2">
                <BicepsFlexed className="w-4 h-4 text-neutral-300" />
                <div className="skeleton h-4 w-24"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="skeleton skeleton-tag"></div>
                <div className="skeleton skeleton-tag"></div>
                <div className="skeleton skeleton-tag"></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="w-4 h-4 text-neutral-300" />
                <div className="skeleton h-4 w-20"></div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="skeleton skeleton-tag"></div>
                <div className="skeleton skeleton-tag"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
