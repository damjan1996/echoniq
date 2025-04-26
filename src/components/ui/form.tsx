import { AlertCircle } from 'lucide-react';
import React from 'react';
import { FieldValues, UseFormReturn, FieldPath, useFormContext } from 'react-hook-form';

import { Label } from './label';

// Form component that provides context for form fields
interface FormProps<T extends FieldValues = FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  disabled = false,
  ariaLabel,
  ...props
}: FormProps<T>) => {
  return (
    <form
      onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
      aria-label={ariaLabel}
      {...props}
    >
      <fieldset
        disabled={disabled || form.formState.isSubmitting}
        className={disabled ? 'opacity-70' : ''}
      >
        {children}
      </fieldset>
    </form>
  );
};

// Form field component that handles label, error, and description
interface FormFieldProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  containerClassName?: string;
  children: React.ReactNode;
  error?: string;
  hideError?: boolean;
}

const FormField = <T extends FieldValues>({
  name,
  label,
  description,
  required = false,
  disabled = false,
  containerClassName = '',
  children,
  error,
  hideError = false,
}: FormFieldProps<T>) => {
  const { formState } = useFormContext();
  const fieldError = error || formState.errors[name]?.message;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <Label htmlFor={name} required={required} disabled={disabled}>
          {label}
        </Label>
      )}
      {children}
      {description && <p className="text-sm text-text-tertiary">{description}</p>}
      {!hideError && fieldError && typeof fieldError === 'string' && (
        <div className="flex items-center text-red-500 text-sm mt-1">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{fieldError}</span>
        </div>
      )}
    </div>
  );
};

// Form section with a title and optional description
interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection = ({ title, description, children, className = '' }: FormSectionProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-medium text-text-primary">{title}</h3>}
          {description && <p className="text-sm text-text-tertiary">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// Form actions (submit, cancel, etc.)
interface FormActionsProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end' | 'between';
}

const FormActions = ({ children, className = '', align = 'start' }: FormActionsProps) => {
  const alignClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div className={`flex flex-wrap items-center gap-4 mt-6 ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};

// Export all form components
export { Form, FormField, FormSection, FormActions };
