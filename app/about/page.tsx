"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ShieldCheck, Zap, Users, Award, ShoppingBag, ArrowRight, Heart, Globe, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-24 md:py-40 overflow-hidden">
                    <div className="absolute top-0 right-0 -z-10 h-[800px] w-[800px] rounded-full bg-primary/10 blur-[120px] opacity-50 translate-x-1/4 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent blur-[100px] opacity-30 -translate-x-1/4 translate-y-1/4" />

                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center text-center space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="space-y-6 max-w-4xl"
                            >
                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-6 py-2 text-sm font-bold text-primary backdrop-blur-md shadow-lg mb-4">
                                    <Star className="mr-2 h-4 w-4 fill-primary" />
                                    The Heritage Promise
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                                    We Bridge the Gap Between <span className="text-primary text-glow">Innovation</span> & You.
                                </h1>
                                <p className="text-xl text-muted-foreground md:text-2xl max-w-2xl mx-auto font-medium pt-4">
                                    Our Store isn't just a marketplace; it's a curated experience designed to elevate your lifestyle through premium technology.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Brand Story Section */}
                <section className="py-24 relative">
                    <div className="container px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="relative lg:order-last"
                            >
                                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group">
                                    <Image
                                        src="/about-us.webp"
                                        alt="Our Modern Tech Sanctuary"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                </div>
                                <div className="absolute -bottom-10 -left-10 p-10 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-primary/10 max-w-[280px] hidden md:block">
                                    <p className="text-5xl font-black text-primary mb-2">10k+</p>
                                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Lifestyle Upgrades Delivered</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="space-y-10"
                            >
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Our Story</h2>
                                    <div className="h-2 w-24 bg-primary rounded-full" />
                                </div>

                                <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                                    <p>
                                        What began as a localized vision to provide authentic, high-quality electronics has blossomed into a nationwide sanctuary for tech enthusiasts. We understood early on that in a world of clones, <span className="text-foreground border-b-2 border-primary/30">authenticity is the ultimate luxury</span>.
                                    </p>
                                    <p>
                                        At Our Store, we don't just sell gadgets. We curate tools that help you work smarter, live better, and stay ahead of the curve. Every product in our catalog undergoes rigorous quality checks to ensure it deserves a place in your life.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                                    <div className="p-6 rounded-3xl bg-secondary/30 border border-border/50">
                                        <h4 className="font-black text-2xl mb-3 flex items-center">
                                            <Heart className="mr-2 h-6 w-6 text-red-500 fill-red-500" />
                                            Our Vision
                                        </h4>
                                        <p className="text-muted-foreground">To become the global gold standard for premium electronics and unparalleled customer delight.</p>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-secondary/30 border border-border/50">
                                        <h4 className="font-black text-2xl mb-3 flex items-center">
                                            <Globe className="mr-2 h-6 w-6 text-blue-500" />
                                            Our Mission
                                        </h4>
                                        <p className="text-muted-foreground">Empowering individuals with cutting-edge technology that blends seamlessly into modern living.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Value Cards Section */}
                <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950/50">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Why We're Different</h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
                                We believe that shopping should be as thrilling as the product you receive.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                {
                                    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
                                    title: "Iron-Clad Trust",
                                    description: "100% genuine products sourced directly from manufacturers. No middle-men, no compromises."
                                },
                                {
                                    icon: <Zap className="h-12 w-12 text-amber-500" />,
                                    title: "Hyper-Speed Logistics",
                                    description: "Because we know you can't wait to unbox your new gear. Lightning fast delivery, every time."
                                },
                                {
                                    icon: <Users className="h-12 w-12 text-indigo-500" />,
                                    title: "Elite Community",
                                    description: "Join thousands of satisfied customers who have made us their primary tech partner."
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="p-10 rounded-[2.5rem] border border-border bg-background shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-150" />
                                    <div className="mb-8 p-5 rounded-2xl bg-secondary inline-block group-hover:rotate-12 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-3xl font-black mb-4">{feature.title}</h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed font-medium">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Giant CTA Section */}
                <section className="py-32">
                    <div className="container px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative overflow-hidden rounded-[4rem] bg-zinc-900 px-8 py-24 md:py-32 text-center text-white shadow-3xl"
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/40 via-transparent to-accent/20" />

                            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight">Your Next Upgrade <br /> is Waiting.</h2>
                                <p className="text-xl md:text-2xl opacity-80 font-medium max-w-2xl mx-auto">
                                    Why settle for ordinary when you can have extraordinary? Experience the future of shopping today.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <Button asChild size="lg" className="h-16 px-12 text-xl font-bold rounded-full bg-white text-black hover:bg-white/90 shadow-2xl hover:scale-105 transition-all">
                                        <Link href="/shop">
                                            Enter the Store <ShoppingBag className="ml-2 h-6 w-6" />
                                        </Link>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="h-16 px-12 text-xl font-bold rounded-full border-2 border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md transition-all">
                                        <Link href="/contact">
                                            Chat with Experts <ArrowRight className="ml-2 h-6 w-6" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
