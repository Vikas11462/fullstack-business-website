"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ShoppingBag, Star, Apple, Milk, Croissant, Cookie, CupSoda, Sparkles, Heart, Smartphone, Shirt, Home as HomeIcon } from "lucide-react"


import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

export default function Home() {
  const { profile, loading } = useAuth()
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    if (!loading && profile?.role === 'admin') {
      router.push('/admin')
    }
  }, [profile, loading, router])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoadingCategories(false)
    }
  }

  // Helper to get icon based on category name
  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('fruit') || lowerName.includes('veg')) return <Apple className="h-8 w-8 text-green-500" />;
    if (lowerName.includes('milk') || lowerName.includes('dairy')) return <Milk className="h-8 w-8 text-blue-500" />;
    if (lowerName.includes('bread') || lowerName.includes('bakery')) return <Croissant className="h-8 w-8 text-amber-600" />;
    if (lowerName.includes('snack') || lowerName.includes('chip')) return <Cookie className="h-8 w-8 text-orange-500" />;
    if (lowerName.includes('drink') || lowerName.includes('juice') || lowerName.includes('beverage')) return <CupSoda className="h-8 w-8 text-purple-500" />;
    if (lowerName.includes('clean') || lowerName.includes('wash') || lowerName.includes('soap')) return <Sparkles className="h-8 w-8 text-cyan-500" />;
    if (lowerName.includes('personal') || lowerName.includes('care')) return <Heart className="h-8 w-8 text-rose-500" />;
    if (lowerName.includes('electronic') || lowerName.includes('phone')) return <Smartphone className="h-8 w-8 text-slate-500" />;
    if (lowerName.includes('fashion') || lowerName.includes('cloth')) return <Shirt className="h-8 w-8 text-indigo-500" />;
    if (lowerName.includes('home') || lowerName.includes('decor')) return <HomeIcon className="h-8 w-8 text-teal-500" />;

    return <ShoppingBag className="h-8 w-8 text-primary" />;
  }

  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-red-50 hover:bg-red-100 border-red-100',
      'bg-orange-50 hover:bg-orange-100 border-orange-100',
      'bg-amber-50 hover:bg-amber-100 border-amber-100',
      'bg-yellow-50 hover:bg-yellow-100 border-yellow-100',
      'bg-lime-50 hover:bg-lime-100 border-lime-100',
      'bg-green-50 hover:bg-green-100 border-green-100',
      'bg-emerald-50 hover:bg-emerald-100 border-emerald-100',
      'bg-teal-50 hover:bg-teal-100 border-teal-100',
      'bg-cyan-50 hover:bg-cyan-100 border-cyan-100',
      'bg-sky-50 hover:bg-sky-100 border-sky-100',
      'bg-blue-50 hover:bg-blue-100 border-blue-100',
      'bg-indigo-50 hover:bg-indigo-100 border-indigo-100',
      'bg-violet-50 hover:bg-violet-100 border-violet-100',
      'bg-purple-50 hover:bg-purple-100 border-purple-100',
      'bg-fuchsia-50 hover:bg-fuchsia-100 border-fuchsia-100',
      'bg-pink-50 hover:bg-pink-100 border-pink-100',
      'bg-rose-50 hover:bg-rose-100 border-rose-100',
    ];
    return colors[index % colors.length];
  }

  if (loading) return null

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 max-w-3xl"
              >
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                  <Star className="mr-2 h-3.5 w-3.5 fill-primary" />
                  Premium Quality Delivered
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                  Skip the Rush, <br />
                  <span className="text-gradient">Order Online</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
                  Experience the future of shopping with Gupta Ji Store.
                  Premium products, instant delivery, and a seamless experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 min-w-[200px]"
              >
                <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  <Link href="/shop">
                    Start Shopping <ShoppingBag className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="h-12 px-8 text-lg rounded-full backdrop-blur-sm bg-background/50">
                  <Link href="/about">
                    Our Story
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Shop by Category Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex items-end justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Shop by Category</h2>
                <p className="text-muted-foreground">Find what you're looking for</p>
              </div>
              <Link href="/shop" className="group hidden md:inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                View All Categories
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {loadingCategories ? (
                // Skeleton loading state
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-muted animate-pulse" />
                ))
              ) : (
                categories.map((category, index) => (
                  <Link key={category.id} href={`/shop?category_id=${category.id}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className={`flex flex-col items-center justify-center p-4 h-full aspect-square rounded-2xl border transition-all cursor-pointer shadow-sm ${getCategoryColor(index)}`}
                    >
                      <div className="mb-3 p-3 bg-white rounded-full shadow-sm">
                        {getCategoryIcon(category.name)}
                      </div>
                      <span className="font-semibold text-center text-sm md:text-base line-clamp-2">
                        {category.name}
                      </span>
                    </motion.div>
                  </Link>
                ))
              )}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Button variant="ghost" asChild>
                <Link href="/shop">
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
