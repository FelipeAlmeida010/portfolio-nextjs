'use client'

import useRoleSwitcher from '@/hooks/useRoleSwitcher'
import useRotatingAnimation from '@/hooks/useRotatingAnimation'
import Image from 'next/image'
import { HeroImage } from '../../utils/images'
import Ellipse from './Ellipse'

const Hero = () => {
  const ellipseRef = useRotatingAnimation()
  const role = useRoleSwitcher({
    roles: ['FULLSTACK DEVELOPER', 'Criando Soluções Escaláveis', 'Aplicações Web e Mobile'],
  })

  return (
    <section className="bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow min-h-[calc(100dvh-4rem)] bg-no-repeat">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-6 px-4 pt-12 pb-10 md:grid-cols-2 lg:p-4">
        <div className="flex min-h-48 flex-col justify-between lg:min-h-56 lg:max-w-[33.75rem]">
          <h1>
            <span className="text-neutral mb-2 block text-3xl font-bold">
              Olá — Sou Felipe Joseph
            </span>
            <span className="text-accent block text-[1.75rem] font-bold">
              {role}
            </span>
          </h1>

          <h2 className="text-neutral mt-3 text-base sm:text-lg">
            Criar soluções inovadoras para resolver problemas do mundo real.

          </h2>

          <div className="mt-6 flex flex-wrap gap-6">
            <a
              href="https://wa.me/+5531984466391"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact me on WhatsApp"
              className="bg-accent min-w-32 rounded-lg px-[14px] py-[10px] text-center text-sm font-medium text-[#00071E] transition hover:opacity-90"
            >
              Contrate-me
            </a>

            <a
              href="https://www.linkedin.com/in/felipe-almeida-04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LinkedIn Profile"
              className="bg-secondary text-neutral rounded-lg px-[14px] py-[10px] text-sm transition hover:opacity-90"
            >
              Perfil do LinkedIn
            </a>
          </div>
        </div>

        <div className="flex min-h-[18.75rem] items-center justify-center lg:min-h-[35rem]">
          <div className="text-accent relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]">
            <Image
              src={HeroImage}
              fill
              priority
              sizes="(min-width: 1024px) 25.75rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 14rem"
              alt="Felipe Joseph — Full Stack Developer"
              className="object-contain p-7"
            />

            <Ellipse
              ref={ellipseRef}
              className="absolute left-0 top-0 size-56 transition-transform duration-500 ease-out sm:size-60 md:size-[20rem] lg:size-[25.75rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
