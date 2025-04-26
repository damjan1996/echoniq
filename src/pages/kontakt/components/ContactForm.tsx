import { motion } from 'framer-motion';
import React, { useState, ReactNode, FormEvent } from 'react';
import { useInView } from 'react-intersection-observer';

import { useForm } from '@/hooks/use-form';
import { ContactFormData } from '@/types/forms';

// Interface for Button props
interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown;
}

// Simple Button component implementation
const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseClasses =
    'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400',
    outline:
      'bg-transparent border border-gray-300 hover:bg-gray-100 text-white focus:ring-gray-400',
  };

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant] || variantClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export const ContactForm: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Using the generic parameter with useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      contactReason: 'allgemein',
      consent: false,
    },
    validationRules: {
      name: { required: true },
      email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
      subject: { required: true },
      message: { required: true },
      contactReason: { required: true },
      consent: { required: true },
    },
  });

  // Handler for form submission - renamed parameter with underscore to mark as intentionally unused
  const onSubmit = async (_formData: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real application, this would be an API call
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(_formData),
      // });

      // if (!response.ok) throw new Error('Fehler beim Absenden des Formulars');

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create a custom onSubmit handler that wraps the original handler
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Pass in our typed onSubmit handler
    handleSubmit((data) => onSubmit(data as ContactFormData))(e);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={formVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6">Kontaktiere uns</h2>

      <form onSubmit={handleFormSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name *
            </label>
            <input
              type="text"
              {...register('name')}
              className={`w-full px-4 py-2 bg-gray-800 border ${
                errors.name ? 'border-red-500' : 'border-gray-700'
              } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Dein Name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">Bitte gib deinen Namen ein</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              {...register('email')}
              className={`w-full px-4 py-2 bg-gray-800 border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="deine@email.de"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">Bitte gib eine gültige E-Mail-Adresse ein</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
            Betreff *
          </label>
          <input
            type="text"
            {...register('subject')}
            className={`w-full px-4 py-2 bg-gray-800 border ${
              errors.subject ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
            placeholder="Betreff deiner Nachricht"
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">Bitte gib einen Betreff ein</p>
          )}
        </div>

        <div>
          <label htmlFor="contactReason" className="block text-sm font-medium text-gray-300 mb-1">
            Anliegen *
          </label>
          <select
            {...register('contactReason')}
            className={`w-full px-4 py-2 bg-gray-800 border ${
              errors.contactReason ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
          >
            <option value="allgemein">Allgemeine Anfrage</option>
            <option value="kuenstler">Als Künstler bewerben</option>
            <option value="studio">Studiobuchung</option>
            <option value="produktion">Produktionsanfrage</option>
            <option value="business">Geschäftliche Zusammenarbeit</option>
            <option value="presse">Presseanfrage</option>
          </select>
          {errors.contactReason && (
            <p className="mt-1 text-xs text-red-500">Bitte wähle ein Anliegen aus</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Nachricht *
          </label>
          <textarea
            {...register('message')}
            rows={5}
            className={`w-full px-4 py-2 bg-gray-800 border ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
            placeholder="Wie können wir dir helfen?"
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">Bitte gib eine Nachricht ein</p>
          )}
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              {...register('consent')}
              className={`w-4 h-4 bg-gray-800 border ${
                errors.consent ? 'border-red-500' : 'border-gray-700'
              } rounded focus:ring-2 focus:ring-primary`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="consent"
              className={`font-medium ${errors.consent ? 'text-red-500' : 'text-gray-300'}`}
            >
              Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für Rückfragen gespeichert
              werden. *
            </label>
            <p className="text-gray-400 text-xs mt-1">
              Die Daten werden ausschließlich für die Beantwortung deiner Anfrage verwendet. Die
              Verarbeitung erfolgt auf Grundlage von Art. 6 (1) a DSGVO. Du kannst deine
              Einwilligung jederzeit widerrufen.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500 rounded-md text-red-400 text-sm">
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="p-3 bg-green-500/20 border border-green-500 rounded-md text-green-400 text-sm">
            Vielen Dank! Deine Nachricht wurde erfolgreich übermittelt. Wir werden uns so schnell
            wie möglich bei dir melden.
          </div>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
