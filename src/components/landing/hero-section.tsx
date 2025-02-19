"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="h-screen w-full overflow-hidden bg-[#0A0A0A] text-white">
      {/* Left Side - Gradient */}
      <div className="absolute inset-0 w-[60%]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A] z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/5" />
        {/* Subtle grain overlay */}
        <div className="absolute inset-0 noise mix-blend-overlay" />
      </div>

      {/* Right Side - Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container">
          <div className="ml-auto w-[45%] pr-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-12 h-[1px] bg-primary/60" />
                <span className="text-primary/80 uppercase tracking-wider text-sm">FocusKing</span>
              </div>

              <h1 className="font-serif">
                <span className="block text-6xl font-light mb-3">Work fast.</span>
                <span className="block text-6xl font-light text-muted-foreground">Live slow.</span>
              </h1>

              <p className="mt-8 text-lg text-muted-foreground/80 leading-relaxed">
                From chaos to clarity. Let's transform your ADHD challenges into a beautifully organized digital reality.
              </p>

              <div className="mt-12 flex items-center gap-8">
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 rounded-full border-primary/20 bg-background/5 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                  >
                    <span className="mr-2">Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                >
                  Explore Features
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 