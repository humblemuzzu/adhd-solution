"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb, LineChart, Rocket } from "lucide-react";

const steps = [
  {
    title: "Smart Assessment",
    description:
      "Take our research-backed ADHD assessment to help us understand your unique challenges and strengths.",
    icon: Lightbulb,
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Personalized Strategy",
    description:
      "Receive a customized action plan tailored to your specific ADHD profile and goals.",
    icon: CheckCircle2,
    gradient: "from-emerald-500/20 to-blue-500/20",
  },
  {
    title: "Track Progress",
    description:
      "Monitor your improvements and adjust your strategies based on real-time data and insights.",
    icon: LineChart,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Achieve Goals",
    description:
      "Transform your daily challenges into victories as you build momentum and confidence.",
    icon: Rocket,
    gradient: "from-amber-500/20 to-red-500/20",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 noise mix-blend-overlay opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

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
            <span className="text-primary/80 uppercase tracking-wider text-sm">The Process</span>
            <div className="w-12 h-[1px] bg-primary/60" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Your Journey to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              Better Focus
            </span>
          </h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            We've simplified the process of managing ADHD into four easy steps,
            each designed to help you succeed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl`} />
                <div className="relative p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-1">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm text-primary/60">Step {index + 1}</span>
                    </div>
                    <h3 className="text-xl font-medium mb-4">{step.title}</h3>
                    <p className="text-muted-foreground/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 translate-x-full">
                      <div className="w-8 h-[1px] bg-primary/20" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 