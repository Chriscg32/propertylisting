import { HeroSection } from '@/components/layout/HeroSection'
import { HowItWorks } from '@/components/layout/HowItWorks'
import { FeaturedProperties } from '@/components/property/FeaturedProperties'
import { Testimonials } from '@/components/layout/Testimonials'
import { CallToAction } from '@/components/layout/CallToAction'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FeaturedProperties />
      <Testimonials />
      <CallToAction />
    </div>
  )
}