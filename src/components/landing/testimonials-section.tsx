"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    content:
      "FocusKing has completely transformed how I manage my ADHD. The personalized strategies and intuitive interface make it easy to stay on track.",
    author: "Sarah J.",
    role: "Software Developer",
    rating: 5,
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    content:
      "As someone who struggled with traditional productivity tools, FocusKing's ADHD-focused approach has been a game-changer. I'm finally able to maintain consistent routines.",
    author: "Michael R.",
    role: "Creative Director",
    rating: 5,
    gradient: "from-emerald-500/20 to-blue-500/20",
  },
  {
    content:
      "The smart task management and time blocking features have helped me overcome procrastination and actually complete my projects on time.",
    author: "Emily L.",
    role: "Graduate Student",
    rating: 5,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
];

export function TestimonialsSection() {
  return (
    <section className="w-full bg-[#0A0A0A] text-white overflow-hidden">
      <div className="container relative z-10 max-w-6xl py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-[1px] bg-primary/60" />
            <span className="text-primary/80 uppercase tracking-wider text-sm">Testimonials</span>
            <div className="w-12 h-[1px] bg-primary/60" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
            Loved by People
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              with ADHD
            </span>
          </h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Join thousands of users who have transformed their lives with FocusKing's
            ADHD-friendly approach to productivity and focus.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative group h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl`} />
                <div className="relative h-full p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-lg text-muted-foreground/90 leading-relaxed mb-8">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br shadow-sm">
                      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-75`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        {testimonial.author}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 