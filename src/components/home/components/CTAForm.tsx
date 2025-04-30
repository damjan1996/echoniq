"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export const CTAForm: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "newsletter",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        message: "",
        type: "newsletter",
      })

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (err) {
      setError("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Bleib in Kontakt
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-300 mb-8 text-center">
            Abonniere unseren Newsletter für Updates zu neuen Releases, Events und exklusiven Angeboten.
          </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-4 bg-[#0E0F0F] p-6 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                  placeholder="Dein Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                  placeholder="deine@email.de"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Nachricht (optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors resize-none"
                placeholder="Deine Nachricht an uns..."
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-300 mb-1">Ich interessiere mich für:</span>
              <div className="flex flex-wrap gap-4">
                <label htmlFor="type-newsletter" className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id="type-newsletter"
                    name="type"
                    value="newsletter"
                    checked={formData.type === "newsletter"}
                    onChange={handleChange}
                    className="text-white focus:ring-white"
                  />
                  <span>Newsletter</span>
                </label>

                <label htmlFor="type-artist" className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id="type-artist"
                    name="type"
                    value="artist"
                    checked={formData.type === "artist"}
                    onChange={handleChange}
                    className="text-white focus:ring-white"
                  />
                  <span>Als Künstler bewerben</span>
                </label>

                <label htmlFor="type-studio" className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    id="type-studio"
                    name="type"
                    value="studio"
                    checked={formData.type === "studio"}
                    onChange={handleChange}
                    className="text-white focus:ring-white"
                  />
                  <span>Studioanfrage</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-md text-red-400 text-sm">{error}</div>
            )}

            {isSuccess && (
              <div className="p-3 bg-green-500/20 border border-green-500 rounded-md text-green-400 text-sm">
                Vielen Dank! Deine Nachricht wurde erfolgreich übermittelt.
              </div>
            )}

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Wird gesendet..." : "Absenden"}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

export default CTAForm
