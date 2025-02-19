"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="w-full bg-[#0A0A0A] text-white overflow-hidden">
      <div className="container relative z-10 max-w-6xl py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 noise mix-blend-overlay opacity-20" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative text-center"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-light mb-6">
            Ready to Transform
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Your Focus?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12">
            Join thousands of individuals who have already discovered their full potential
            with FocusKing. Start your journey to better focus today.
          </p>

          <div className="flex items-center justify-center gap-8">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-medium text-lg"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/20">
        <div className="container max-w-6xl py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 FocusKing. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
} 