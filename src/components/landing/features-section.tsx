"use client";

import { motion } from "framer-motion";
import { Brain, Clock, Target, Sparkles, Calendar, Shield } from "lucide-react";

const features = [
  {
    name: "Smart Task Management",
    description: "Intelligently organize and prioritize tasks based on your ADHD patterns and energy levels.",
    icon: Brain,
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    name: "Time Blocking",
    description: "Break your day into manageable chunks with our ADHD-friendly time management system.",
    icon: Clock,
    gradient: "from-emerald-500/20 to-blue-500/20",
  },
  {
    name: "Goal Tracking",
    description: "Set and achieve goals with a system designed to maintain focus and build momentum.",
    icon: Target,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "Focus Assistance",
    description: "Get real-time support and techniques to maintain focus during challenging tasks.",
    icon: Sparkles,
    gradient: "from-amber-500/20 to-red-500/20",
  },
  {
    name: "Routine Builder",
    description: "Develop healthy habits and routines that stick, tailored to your unique needs.",
    icon: Calendar,
    gradient: "from-teal-500/20 to-emerald-500/20",
  },
  {
    name: "Distraction Shield",
    description: "Minimize interruptions and stay on track with our advanced focus protection tools.",
    icon: Shield,
    gradient: "from-rose-500/20 to-orange-500/20",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-32 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 noise mix-blend-overlay opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-[1px] bg-primary/60" />
            <span className="text-primary/80 uppercase tracking-wider text-sm">Features</span>
            <div className="w-12 h-[1px] bg-primary/60" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Everything you need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              master your focus
            </span>
          </h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Our comprehensive suite of tools is designed specifically for individuals with ADHD,
            helping you overcome challenges and achieve your full potential.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl`} />
                <div className="relative p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-medium">{feature.name}</h3>
                  </div>
                  <p className="text-muted-foreground/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 