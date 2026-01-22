'use client'

import { Testimonial } from '@/lib/types'
import { useRef, useState } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import TestimonialCard from './TestimonialCard'

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  const [activeCard, setActiveCard] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollCards = (direction: 'left' | 'right') => {
    if (!containerRef.current) return

    const cardWidth =
      containerRef.current.firstElementChild?.clientWidth ?? 0

    containerRef.current.scrollBy({
      left: direction === 'right' ? cardWidth + 32 : -(cardWidth + 32),
      behavior: 'smooth',
    })
  }

  return (
    <section id="testimonials">
      <SectionHeading
        title="// Depoimentos"
        subtitle="Para reforçar a qualidade das minha habilidades - veja o que usuários reais dos meus serviços têm a dizer sobre sua experiência."
      />

      {/* Container scrollável */}
      <div
        ref={containerRef}
        className="hide-scrollbar my-8 flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory"
      >
        {testimonials.map((testimonial, idx) => (
          <TestimonialCard
            key={idx}
            testimonial={testimonial}
            handleActiveCard={() => {
              setActiveCard(idx)
            }}
          />
        ))}
      </div>

      {/* Botões direcionais (desktop) */}
      <div className="hidden sm:flex items-center justify-center gap-4">
        <button
          onClick={() => scrollCards('left')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary shadow-md transition hover:bg-secondary/80"
          aria-label="Scroll left"
        >
          ←
        </button>

        <button
          onClick={() => scrollCards('right')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary shadow-md transition hover:bg-secondary/80"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>

      {/* Indicadores (mobile) */}
      <div className="mt-4 flex items-center justify-center gap-1 sm:hidden">
        {testimonials.map((_, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeCard
                ? 'bg-accent size-[12px]'
                : 'size-[10px] bg-white/50'
            } rounded-full`}
          />
        ))}
      </div>
    </section>
  )
}

export default TestimonialSection
