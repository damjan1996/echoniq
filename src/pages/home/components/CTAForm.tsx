import { motion } from 'framer-motion';
import React, { useState, ReactNode, FormEvent } from 'react';
import { useInView } from 'react-intersection-observer';

import { useForm } from '@/hooks/use-form';

// Interface for Container props
interface ContainerProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown; // Better typing than 'any'
}

// Simple Container component implementation
const Container: React.FC<ContainerProps> = ({ children, className = '', ...props }) => (
  <div className={`container mx-auto px-4 ${className}`} {...props}>
    {children}
  </div>
);

// Interface for Button props
interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown; // Better typing than 'any'
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
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-400',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-100 focus:ring-gray-400',
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

// Type definition for form data
interface FormData {
  email: string;
  name: string;
  message: string;
  type: string;
}

export const CTAForm: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modified to work with our fixed useForm hook
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: '',
      name: '',
      message: '',
      type: 'newsletter',
    },
    validationRules: {
      email: { required: true, pattern: /^\S+@\S+\.\S+$/ },
      name: { required: true },
      message: { required: false },
      type: { required: true },
    },
  });

  const errors = formState?.errors || {};

  // Handle form submission - renamed parameter with underscore to mark as intentionally unused
  const onSubmit = async (_formData: FormData) => {
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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  // Create a custom onSubmit handler that wraps the original handler
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Pass in our typed onSubmit handler
    handleSubmit((data) => onSubmit(data as FormData))(e);
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
            Bleib in Kontakt
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-300 mb-8">
            Abonniere unseren Newsletter für Updates zu neuen Releases, Events und exklusiven
            Angeboten.
          </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={handleFormSubmit}
            className="space-y-4 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full px-4 py-2 bg-gray-800 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="Dein Name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">Bitte gib deinen Namen ein</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
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
                  <p className="mt-1 text-xs text-red-500">
                    Bitte gib eine gültige E-Mail-Adresse ein
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Nachricht (optional)
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Deine Nachricht an uns..."
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-300 mb-1">
                Ich interessiere mich für:
              </span>
              <div className="flex flex-wrap gap-4">
                <label htmlFor="newsletter" className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    {...register('type')}
                    value="newsletter"
                    defaultChecked
                    className="text-primary focus:ring-primary"
                  />
                  <span>Newsletter</span>
                </label>

                <label htmlFor="artist" className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    {...register('type')}
                    value="artist"
                    className="text-primary focus:ring-primary"
                  />
                  <span>Als Künstler bewerben</span>
                </label>

                <label htmlFor="studio" className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    {...register('type')}
                    value="studio"
                    className="text-primary focus:ring-primary"
                  />
                  <span>Studioanfrage</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-md text-red-400 text-sm">
                {error}
              </div>
            )}

            {isSuccess && (
              <div className="p-3 bg-green-500/20 border border-green-500 rounded-md text-green-400 text-sm">
                Vielen Dank! Deine Nachricht wurde erfolgreich übermittelt.
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
                {isSubmitting ? 'Wird gesendet...' : 'Absenden'}
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTAForm;
