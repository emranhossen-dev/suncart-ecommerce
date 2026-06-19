'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import productsData from '@/data/products.json' 
import ProductCard from '@/components/ProductCard'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export default function HomePage() {
  const popularProducts = productsData && productsData.length > 0 ? productsData.slice(0, 3) : []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const carouselImages = [
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80"
  ]

  const careTips = [
    { title: "Stay Hydrated", desc: "Drink at least 3 liters of water daily to maintain electrolyte levels.", gradient: "from-amber-100 to-orange-100" },
    { title: "Sun Protection", desc: "Apply broad-spectrum SPF 50 sunscreen 15 minutes before stepping out.", gradient: "from-orange-100 to-red-100" },
    { title: "Wear Breathable Fabrics", desc: "Choose light-colored linen or cotton clothing to stay ventilated.", gradient: "from-yellow-100 to-amber-100" }
  ]

  const brands = ["SunShade", "GlowBeach", "BreezeWear", "HydroChill"]

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-transparent py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="max-w-2xl text-center lg:text-left animate__animated animate__fadeInLeft">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-600 border border-orange-100 shadow-sm">
                Hot Deals 🔥
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight">
                Summer Sale <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">50% OFF</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Gear up for the sun. Explore our curated premium sunglasses, apparel, and skincare designed to keep you fresh all summer long.
              </p>
              <div className="mt-10">
                <Link href="/products" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all transform hover:-translate-y-0.5">
                  Shop Collection <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="w-full h-[350px] sm:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white animate__animated animate__fadeInRight">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect={'fade'}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full h-full"
              >
                {carouselImages.map((imgUrl, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={imgUrl} 
                      alt={`Summer Slide ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate__animated animate__fadeInUp">
        <div className="text-center md:text-left border-l-4 border-orange-500 pl-4">
          <h2 className="text-3xl font-black tracking-tight text-gray-900">Popular Products</h2>
          <p className="mt-2 text-sm text-gray-500">Our trending summer items chosen by shoppers this week.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50/50 to-gray-50 py-20 border-y border-gray-100/80 animate__animated animate__fadeInUp">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-50 px-3 py-1 rounded-full">Summer Care 101</span>
            <h2 className="text-3xl font-black tracking-tight text-gray-900 mt-3">Summer Care Tips</h2>
            <p className="mt-2 text-sm text-gray-500">Essential habits to stay healthy and vibrant in hot weather.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {careTips.map((tip, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
                <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${tip.gradient} opacity-50 blur-xl`}></div>
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-base font-black text-orange-600 border border-orange-100 shadow-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-800 tracking-tight">{tip.title}</h3>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate__animated animate__fadeInUp">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Top Brands</h2>
          <p className="mt-2 text-sm text-gray-500">We partner with global manufacturers to deliver top-tier materials.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {brands.map((brand, idx) => (
            <div key={idx} className="group flex h-28 items-center justify-center rounded-3xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-0.5">
              <span className="text-base font-black tracking-widest text-gray-400 group-hover:text-orange-500 transition-colors uppercase">{brand}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}