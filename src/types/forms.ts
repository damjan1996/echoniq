export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'file'
    | 'hidden';
  placeholder?: string;
  required?: boolean;
  value?: string | number | boolean | string[];
  options?: Array<{
    label: string;
    value: string | number;
  }>;
  validation?: FormValidation;
  disabled?: boolean;
  hint?: string;
  className?: string;
}

export interface FormValidation {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validate?: (value: unknown) => boolean | string;
}

export interface FormError {
  type: string;
  message: string;
  ref?: unknown;
}

export interface FormState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  isValid: boolean;
  submitCount: number;
  errors: Record<string, FormError>;
}

export interface UseFormProps<T = unknown> {
  defaultValues?: Partial<T>;
  validationRules?: Record<string, FormValidation>;
  onSubmit?: (data: T) => void | Promise<void>;
}

export interface UseFormReturn<T = unknown> {
  register: (name: keyof T) => {
    name: string;
    value: unknown;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
    onBlur: () => void;
    ref: (instance: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null) => void;
  };
  handleSubmit: (onSubmit: (data: T) => void | Promise<void>) => (e: React.FormEvent) => void;
  setValue: (name: keyof T, value: unknown) => void;
  getValues: () => T;
  reset: (values?: Partial<T>) => void;
  formState: FormState;
  watch: (name?: keyof T) => unknown;
  trigger: (name?: keyof T) => Promise<boolean>;
  clearErrors: (name?: keyof T) => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactReason?: string;
  consent: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  projectType: 'recording' | 'mixing' | 'mastering' | 'production' | 'session' | 'other';
  projectDetails: string;
  preferredDate?: string;
  preferredTime?: string;
  duration: 'hour' | 'halfDay' | 'fullDay' | 'multiDay' | 'unsure';
  budget?: string;
  heardAbout?: string;
  additionalInfo?: string;
  subscribe?: boolean;
  consent: boolean;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
  interests?: string[];
  consent: boolean;
}

export interface ArtistSubmissionFormData {
  name: string;
  artistName: string;
  email: string;
  phone?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
  };
  genres: string[];
  bio: string;
  musicLinks: string[];
  influences?: string;
  goals?: string;
  hasReleased: boolean;
  additionalInfo?: string;
  consent: boolean;
}
