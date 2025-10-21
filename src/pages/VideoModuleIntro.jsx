import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0 },
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
}

const VideoModuleIntro = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black text-[#BFD8FF]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://cdn.coverr.co/videos/coverr-waves-of-data-9278/1080p.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-[#3b0ca3]/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(123,44,191,0.45),_rgba(59,12,163,0.08)_55%,_transparent_75%)]" />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-10 flex flex-1 flex-col px-6 py-10 sm:px-10 lg:px-20"
      >
        <div className="flex flex-1 flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            variants={fadeInUp}
            className="w-full max-w-2xl space-y-10"
          >
            <Link
              to="/"
              className="inline-flex items-center text-sm font-semibold tracking-[0.35em] text-[#EE05F2] transition hover:text-[#ff37ff]"
            >
              ← VOLTAR
            </Link>

            <div className="space-y-6">
              <motion.h1
                variants={fadeInUp}
                className="text-4xl font-extrabold uppercase tracking-[0.55em] text-[#BFD8FF] drop-shadow-sm sm:text-5xl lg:text-6xl"
              >
                Manual de Implantação Infoway
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="max-w-lg text-base font-light leading-relaxed text-[#d7e6ff]/80 sm:text-lg"
              >
                Conecte-se com o futuro da segurança digital. Explore cada etapa do processo de implantação com a orientação
                especializada da equipe Infoway e acelere a evolução tecnológica da sua operação.
              </motion.p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div className="rounded-3xl border border-[#EE05F2]/40 bg-white/5 px-5 py-4 text-sm font-light uppercase tracking-[0.3em] text-[#EE05F2] shadow-[0_10px_40px_rgba(238,5,242,0.15)] backdrop-blur-sm">
                Módulo 01
              </div>
              <div className="rounded-3xl border border-[#EE05F2]/40 bg-white/5 px-5 py-4 text-sm font-light uppercase tracking-[0.3em] text-[#EE05F2] shadow-[0_10px_40px_rgba(59,12,163,0.25)] backdrop-blur-sm">
                Cybersecurity
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            className="w-full max-w-3xl"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-[#EE05F2]/40 bg-black/40 shadow-[0_25px_80px_rgba(59,12,163,0.45)] backdrop-blur-md">
              <iframe
                src="https://www.youtube.com/embed/vjF9GgrY9c0"
                title="Apresentação do módulo"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 border border-white/5" />
            </div>
          </motion.div>
        </div>
      </motion.main>

      <motion.footer
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-10 border-t border-[#EE05F2]/40 bg-black/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-20">
          <div className="w-full max-w-3xl space-y-3">
            <p className="text-sm font-light text-[#d7e6ff]/80 sm:text-base">
              Você já completou <span className="font-semibold text-[#EE05F2]">0%</span> deste módulo. Para realizar a avaliação, é necessário completar ao menos 75%.
            </p>
            <div className="relative h-2 w-full overflow-hidden rounded-full border border-[#EE05F2]/40 bg-white/10">
              <div className="h-full w-0 bg-[#EE05F2]" />
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[#EE05F2]/50 bg-gray-200 px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-900 shadow-md shadow-[#EE05F2]/20 transition hover:bg-gray-100"
            disabled
          >
            Avaliação Indisponível
          </button>
        </div>
      </motion.footer>
    </div>
  )
}

export default VideoModuleIntro
