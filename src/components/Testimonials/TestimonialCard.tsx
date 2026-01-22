import { FC, useEffect, useRef } from 'react'
import Image from 'next/image'

import { Testimonial } from '@/lib/types'
import { isInViewport } from '@/utils'
import { StarIcon } from '@/utils/icons'

interface TestimonialCardProps {
  testimonial: Testimonial
  handleActiveCard: () => void
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  testimonial: { name, title, feedback, image, stars, flag },
  handleActiveCard,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver | undefined

    if (cardRef.current) {
      observer = isInViewport(cardRef.current, handleActiveCard)
    }

    return () => {
      observer?.disconnect()
    }
  }, [handleActiveCard])

  return (
    <div
      ref={cardRef}
      className="bg-secondary border-border flex max-w-full shrink-0 flex-col items-center justify-between gap-4 rounded-2xl border p-4 text-center sm:max-w-[425px]"
    >
      {/* Feedback */}
      <p className="text-neutral leading-8 before:content-['“'] after:content-['”']">
        {feedback}
      </p>

      <div>
        {/* Stars */}
        <div className="mb-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }, (_, idx) => (
            <StarIcon
              key={idx}
              className={idx < stars ? 'text-tag' : 'text-transparent'}
            />
          ))}
        </div>

        {/* Author */}
        <div>
          <Image
            src={image}
            alt={name}
            width={50}
            height={50}
            className="mx-auto rounded-full"
          />

          <p className="text-neutral text-lg font-semibold">
            {name}
          </p>

          <p className="text-neutral/60 text-sm flex items-center justify-center gap-1">
            {title}

            {flag && (
              <Image
                src={flag}
                alt={`Country flag of ${name}`}
                width={18}
                height={12}
                className="inline-block"
              />
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
