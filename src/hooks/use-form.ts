// src/hooks/use-form.ts
import { useState, FormEvent, ChangeEvent } from 'react';

// Fix the import path to use the absolute path with Next.js @ alias
// Change from './analytics/index' to '@/lib/analytics/index'
export {
  trackSongPlay,
  trackAlbumView,
  trackArtistView,
  trackStudioBooking,
  useAnalytics,
} from '@/lib/analytics/index';

// Export types using 'export type'
export type { SongData, AlbumData, ArtistData } from '@/lib/analytics/index';

// Define a more generic FormValues type to support different form data structures
export type FormValues = Record<string, string | number | boolean | null | undefined>;

interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
}

interface UseFormOptions {
  defaultValues: Record<string, unknown>;
  validationRules?: Record<string, ValidationRule>;
}

// Simplified useForm hook without generics to avoid TypeScript issues
export function useForm({ defaultValues, validationRules = {} }: UseFormOptions) {
  const [values, setValues] = useState<Record<string, unknown>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This function will mimic the behavior of the register function from react-hook-form
  const register = (name: string) => {
    return {
      name,
      value: values[name],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const newValues = { ...values };

        // Handle different input types specifically for inputs
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
          newValues[name] = e.target.checked;
        } else {
          newValues[name] = e.target.value;
        }

        setValues(newValues);
      },
      id: name,
    };
  };

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    for (const field in validationRules) {
      const value = values[field];
      const rules = validationRules[field];

      if (rules.required && (!value || value === '')) {
        newErrors[field] = 'This field is required';
      } else if (rules.pattern && value && !rules.pattern.test(String(value))) {
        newErrors[field] = 'Invalid format';
      } else if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        newErrors[field] = `Minimum length is ${rules.minLength}`;
      } else if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        newErrors[field] = `Maximum length is ${rules.maxLength}`;
      }
    }

    return newErrors;
  };

  // Simplified without explicit generics
  const handleSubmit = (onSubmit: (data: unknown) => void | Promise<void>) => {
    return (e: FormEvent) => {
      e.preventDefault();

      const formErrors = validateForm();
      setErrors(formErrors);

      if (Object.keys(formErrors).length === 0) {
        setIsSubmitting(true);
        try {
          onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      }
    };
  };

  const reset = () => {
    setValues(defaultValues);
    setErrors({});
  };

  return {
    register,
    handleSubmit,
    reset,
    values,
    formState: {
      errors,
      isSubmitting,
    },
  };
}
