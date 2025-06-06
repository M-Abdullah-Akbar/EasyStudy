"use client";
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

export default function LandingPage() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    // Features section animations
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: "power3.out"
      });
    });

    // Stats section animations
    gsap.from('.stat-item', {
      scrollTrigger: {
        trigger: '.stats-section',
        start: "top center+=100",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <motion.div 
        style={{ opacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 z-10">
          <motion.h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Easy Study
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-center text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Transform your learning experience with AI-powered study materials and interactive content
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex justify-center gap-4"
          >
            <Link href="/dashboard" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-colors">
              Get Started
            </Link>
            <Link href="#features" className="px-8 py-3 border border-purple-600 hover:bg-purple-600/20 rounded-full font-semibold transition-colors">
              Learn More
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Why Choose Easy Study?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Learning",
                description: "Personalized study materials generated by advanced AI technology",
                icon: "🤖"
              },
              {
                title: "Interactive Content",
                description: "Engage with dynamic quizzes, flashcards, and study materials",
                icon: "🎯"
              },
              {
                title: "Progress Tracking",
                description: "Monitor your learning journey with detailed analytics",
                icon: "📊"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Students" },
              { number: "50K+", label: "Courses Created" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-purple-400 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Learning?</h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of students who are already experiencing the future of education
            </p>
            <Link 
              href="/dashboard"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold text-lg transition-colors inline-block"
            >
              Start Learning Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}