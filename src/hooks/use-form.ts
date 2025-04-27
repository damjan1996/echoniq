// src/hooks/use-form.ts
import { useState, ChangeEvent, FormEvent } from 'react';

interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  validate?: (value: unknown) => boolean | string;
}

interface FormState<T> {
  values: T;
  errors: Record<keyof T, string | null>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

interface UseFormProps<T extends Record<string, unknown>> {
  defaultValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule>>;
}

export function useForm<T extends Record<string, unknown>>({
  defaultValues,
  validationRules = {},
}: UseFormProps<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: defaultValues,
    errors: {} as Record<keyof T, string | null>,
    touched: {} as Record<keyof T, boolean>,
    isSubmitting: false,
    isValid: true,
  });

  // Validate a single field
  const validateField = (name: keyof T, value: unknown): string | null => {
    const rules = validationRules[name];

    if (!rules) return null;

    if (rules.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return 'This field is required';
    }

    if (rules.pattern && value && typeof value === 'string' && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength}`;
    }

    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength}`;
    }

    if (rules.validate && typeof rules.validate === 'function') {
      const result = rules.validate(value);
      if (typeof result === 'string') return result;
      if (result === false) return 'Invalid value';
    }

    return null;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string | null> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, formState.values[fieldName]);
      newErrors[key] = error;
      if (error) isValid = false;
    });

    setFormState((prev) => ({
      ...prev,
      errors: newErrors as Record<keyof T, string | null>,
      isValid,
    }));

    return isValid;
  };

  // Register a field
  const register = (name: keyof T) => {
    return {
      name,
      value: formState.values[name],
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        const value =
          target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;

        setFormState((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            [name]: value,
          },
          errors: {
            ...prev.errors,
            [name]: validateField(name, value),
          },
        }));
      },
      onBlur: () => {
        setFormState((prev) => ({
          ...prev,
          touched: {
            ...prev.touched,
            [name]: true,
          },
          errors: {
            ...prev.errors,
            [name]: validateField(name, prev.values[name]),
          },
        }));
      },
    };
  };

  // Handle form submission
  const handleSubmit = (onSubmit: (data: T) => void | Promise<void>) => {
    return (e: FormEvent) => {
      if (e) e.preventDefault();

      setFormState((prev) => ({ ...prev, isSubmitting: true }));

      const isValid = validateForm();

      if (isValid) {
        Promise.resolve(onSubmit(formState.values)).finally(() => {
          setFormState((prev) => ({ ...prev, isSubmitting: false }));
        });
      } else {
        setFormState((prev) => ({ ...prev, isSubmitting: false }));
      }
    };
  };

  // Reset form to default values
  const reset = (newValues: T = defaultValues) => {
    setFormState({
      values: newValues,
      errors: {} as Record<keyof T, string | null>,
      touched: {} as Record<keyof T, boolean>,
      isSubmitting: false,
      isValid: true,
    });
  };

  return {
    register,
    handleSubmit,
    reset,
    formState: {
      errors: formState.errors,
      touched: formState.touched,
      isSubmitting: formState.isSubmitting,
      isValid: formState.isValid,
    },
    values: formState.values,
  };
}

export default useForm;
