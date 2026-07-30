import React, { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Separator } from "./separator"
import { Quote, Star } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export interface AnimatedTestimonialsProps {
  title?: string
  subtitle?: string
  badgeText?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
  trustedCompanies?: string[]
  trustedCompaniesTitle?: string
  className?: string
}

export function AnimatedTestimonials({
  title = "Comunidad VMware & VCF Enterprise",
  subtitle = "Lo que opinan administradores de sistemas y arquitectos de infraestructura que utilizan nuestros laboratorios.",
  badgeText = "Experiencia de Trinchera",
  testimonials = [
    {
      id: 1,
      name: "Carlos Mendoza",
      role: "Senior Infrastructure Architect",
      company: "Enterprise Cloud",
      content:
        "Los laboratorios de vSAN y los scripts de PowerCLI me ahorraron semanas de trabajo. La simulación de fallas reales es increíble para no cometer errores en producción.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Andrea Restrepo",
      role: "SysAdmin vSphere & VCP",
      company: "Global Tech Datacenter",
      content:
        "Excelente plataforma para aprender vCenter 9.0 y automatizar con PowerShell. Los scripts de auditoría de snapshots funcionan perfecto en mi entorno con más de 2,000 VMs.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Javier Bermúdez",
      role: "Cloud Ops Lead",
      company: "Telecom Corp",
      content:
        "Definitivamente la mejor comunidad para administradores VMware en español. Las explicaciones didácticas de HA, DRS y vMotion son oro puro.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  ],
  autoRotateInterval = 6000,
  trustedCompanies = ["VMware", "Broadcom", "Dell EMC", "HPE", "Cisco"],
  trustedCompaniesTitle = "Infraestructura desplegada en tecnologías enterprise globales",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Refs for scroll animations
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Auto rotate testimonials
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} id="testimonials" className={`py-24 overflow-hidden bg-slate-950/80 border-t border-white/10 ${className || ""}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-16 w-full md:grid-cols-2 lg:gap-24 items-center"
        >
          {/* Left side: Heading and navigation */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {badgeText && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Star className="h-3.5 w-3.5 fill-purple-400 text-purple-400" />
                  <span>{badgeText}</span>
                </div>
              )}

              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h2>

              <p className="max-w-[600px] text-slate-400 text-lg leading-relaxed">{subtitle}</p>

              <div className="flex items-center gap-3 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === index ? "w-10 bg-purple-500" : "w-2.5 bg-slate-800"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side: Testimonial cards */}
          <motion.div variants={itemVariants} className="relative h-full mr-2 min-h-[340px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: activeIndex === index ? 10 : 0 }}
              >
                <div className="bg-slate-900/90 border border-white/10 shadow-2xl rounded-3xl p-8 h-full flex flex-col justify-between glass-panel-luxury">
                  <div className="mb-4 flex gap-1.5">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                      ))}
                  </div>

                  <div className="relative mb-6 flex-1">
                    <Quote className="absolute -top-3 -left-3 h-8 w-8 text-purple-500/20 rotate-180" />
                    <p className="relative z-10 text-base font-normal text-slate-200 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border border-purple-500/30">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-white text-base">{testimonial.name}</h3>
                      <p className="text-xs font-mono text-slate-400">
                        {testimonial.role}, <span className="text-purple-400 font-bold">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-purple-500/10 blur-xl pointer-events-none" />
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-2xl bg-emerald-500/10 blur-xl pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Logo cloud */}
        {trustedCompanies.length > 0 && (
          <motion.div variants={itemVariants} initial="hidden" animate={controls} className="mt-20 text-center">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-8">{trustedCompaniesTitle}</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              {trustedCompanies.map((company) => (
                <div key={company} className="text-xl font-black font-mono tracking-wider text-slate-400/60 hover:text-white transition-colors cursor-default">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
