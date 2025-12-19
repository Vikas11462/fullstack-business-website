"use client"

import { Product } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProductCardProps {
    product: Product
    className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
    const { addItem, items, updateQuantity } = useCart()
    const cartItem = items.find((item) => item.id === product.id)
    const quantity = cartItem ? cartItem.quantity : 0

    return (
        <div className={cn("group relative flex flex-col overflow-hidden rounded-3xl border border-transparent bg-white text-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/10 hover:-translate-y-1", className)}>
            <Link href={`/product/${product.id}`} className="block w-full">
                <div className="aspect-[1/0.9] bg-[#f8f9fa] relative overflow-hidden flex items-center justify-center p-4">
                    {product.image && product.image !== '/placeholder.svg' ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground opacity-20">
                            <ShoppingCart className="h-12 w-12" />
                        </div>
                    )}
                    {/* Badge for "New" or Discount (Optional placeholder) */}
                    {/* <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        SALE
                     </div> */}
                </div>
            </Link>

            <div className="flex flex-1 flex-col justify-between p-5">
                <div className="space-y-1.5 mb-3">
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
                        {product.categories?.name || product.category || 'Fresh'}
                    </p>
                    <Link href={`/product/${product.id}`}>
                        <h3 className="font-bold text-lg leading-tight hover:text-primary transition-colors line-clamp-2" title={product.name}>
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                        Premium Quality
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground line-through opacity-0 hidden">₹{Number(product.price) + 20}</span>
                        <span className="text-xl font-extrabold text-foreground">₹{product.price}</span>
                    </div>

                    {quantity === 0 ? (
                        <Button
                            size="sm"
                            onClick={(e) => {
                                e.preventDefault();
                                addItem(product)
                            }}
                            className="rounded-full h-10 px-5 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold"
                        >
                            Add
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2 bg-secondary rounded-full p-1 border border-primary/10 shadow-inner">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-white shadow-sm hover:scale-110 transition-transform text-primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    updateQuantity(product.id, quantity - 1)
                                }}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-bold w-4 text-center tabular-nums">{quantity}</span>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-primary text-primary-foreground shadow-sm hover:scale-110 transition-transform"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addItem(product)
                                }}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
