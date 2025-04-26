import { zodResolver } from '@hookform/resolvers/zod';
import { addHours, format, isBefore, setHours, setMinutes } from 'date-fns';
import de from 'date-fns/locale/de';
import { motion } from 'framer-motion';
import { Calendar, CalendarCheck, Clock, Mail, MessageSquare, Phone, User } from 'lucide-react';
import React, { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import 'react-datepicker/dist/react-datepicker.css';

import { ErrorMessage } from '@/components/common/error-message';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { useAnalytics } from '@/hooks/use-analytics';

// Register German locale for date picker
registerLocale('de', de);
setDefaultLocale('de');

// Define available time slots
const timeSlots = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
];

// Define Service type
interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  description?: string;
}

// Define booking form schema
const bookingSchema = z.object({
  name: z.string().min(2, 'Bitte gib deinen Namen ein'),
  email: z.string().email('Bitte gib eine gültige E-Mail-Adresse ein'),
  phone: z.string().min(5, 'Bitte gib eine gültige Telefonnummer ein'),
  date: z
    .date({
      required_error: 'Bitte wähle ein Datum',
      invalid_type_error: 'Das ist kein gültiges Datum',
    })
    .refine((date) => {
      // Date must be in the future
      return isBefore(new Date(), date);
    }, 'Das Datum muss in der Zukunft liegen'),
  startTime: z.string().min(1, 'Bitte wähle eine Startzeit'),
  duration: z.string().min(1, 'Bitte wähle eine Dauer'),
  serviceId: z.string().min(1, 'Bitte wähle einen Service'),
  message: z.string().optional(),
});

// Infer the schema type
type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  services: Service[];
  onBookingSuccess?: () => void;
  className?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  services,
  onBookingSuccess,
  className = '',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { trackEvent } = useAnalytics();

  // Initialize form
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      startTime: '',
      duration: '',
      serviceId: '',
      message: '',
    },
  });

  // Watch form values for conditional logic
  const watchDate = watch('date');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const watchStartTime = watch('startTime');
  const watchServiceId = watch('serviceId');

  // Get selected service
  const selectedService = services.find((service) => service.id === watchServiceId);

  // Calculate available durations based on selected service
  const getAvailableDurations = () => {
    if (!selectedService) {
      return ['1 Stunde', '2 Stunden', '3 Stunden', '4 Stunden', 'Ganzer Tag'];
    }

    // Example logic - adjust based on service
    switch (selectedService.duration) {
      case 'kurz':
        return ['1 Stunde', '2 Stunden'];
      case 'mittel':
        return ['2 Stunden', '3 Stunden', '4 Stunden'];
      case 'lang':
        return ['3 Stunden', '4 Stunden', 'Ganzer Tag'];
      default:
        return ['1 Stunde', '2 Stunden', '3 Stunden', '4 Stunden', 'Ganzer Tag'];
    }
  };

  // Filter available time slots based on date and service
  const getAvailableTimeSlots = () => {
    if (!watchDate) return timeSlots;

    const today = new Date();
    const isToday = watchDate.toDateString() === today.toDateString();

    // If booking for today, filter out past time slots
    if (isToday) {
      const currentHour = today.getHours();
      return timeSlots.filter((slot) => {
        const slotHour = parseInt(slot.split(':')[0], 10);
        return slotHour > currentHour + 1; // Allow 1 hour buffer
      });
    }

    return timeSlots;
  };

  // Handle form submission
  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setFormError(null);

    try {
      // Format the booking data
      const bookingData = {
        ...data,
        serviceName: selectedService?.name || '',
        formattedDate: format(data.date, 'dd.MM.yyyy'),
        endTime:
          data.duration === 'Ganzer Tag'
            ? '20:00'
            : format(
                addHours(
                  setHours(setMinutes(new Date(), 0), parseInt(data.startTime.split(':')[0], 10)),
                  parseInt(data.duration.split(' ')[0], 10) || 1
                ),
                'HH:mm'
              ),
      };

      // Send booking data to API
      const response = await fetch('/api/studio/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fehler beim Senden der Buchung');
      }

      // Track successful booking event
      trackEvent('BOOKING_COMPLETED', {
        serviceId: data.serviceId,
        serviceName: selectedService?.name,
        bookingDate: format(data.date, 'yyyy-MM-dd'),
      });

      // Reset form and show success message
      reset();
      setBookingSuccess(true);
      if (onBookingSuccess) {
        onBookingSuccess();
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setFormError(
        error instanceof Error
          ? error.message
          : 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.'
      );

      // Track failed booking event
      // Use BOOKING_STARTED instead of BOOKING_ERROR as it's in the allowed event types
      trackEvent('BOOKING_STARTED', {
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // If booking was successful, show confirmation
  if (bookingSuccess) {
    return (
      <motion.div
        className={`bg-background-secondary p-8 rounded-lg shadow-lg text-center ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-accent-500/20 rounded-full flex items-center justify-center">
            <CalendarCheck className="h-10 w-10 text-accent-500" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-text-primary mb-4">Buchungsanfrage erfolgreich!</h3>

        <p className="text-text-secondary mb-6">
          Vielen Dank für deine Buchungsanfrage. Wir haben deine Anfrage erhalten und werden uns in
          Kürze mit dir in Verbindung setzen, um die Details zu bestätigen.
        </p>

        <button
          onClick={() => setBookingSuccess(false)}
          className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-full transition-colors font-medium"
        >
          Neue Buchung
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`bg-background-secondary p-6 md:p-8 rounded-lg shadow-lg ${className}`}
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h3 variants={itemVariants} className="text-2xl font-bold text-text-primary mb-6">
        Studio buchen
      </motion.h3>

      {formError && (
        <motion.div variants={itemVariants} className="mb-6">
          <ErrorMessage message={formError} onDismiss={() => setFormError(null)} />
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Service Selection */}
        <motion.div variants={itemVariants} className="mb-6">
          <label htmlFor="serviceId" className="block text-text-primary font-medium mb-2">
            Service*
          </label>

          <div className="relative">
            <select
              id="serviceId"
              {...register('serviceId')}
              className={`w-full p-3 pl-10 bg-background-tertiary border ${
                errors.serviceId ? 'border-red-500' : 'border-neutral-700'
              } rounded-lg text-text-primary focus:outline-none focus:border-accent-500 transition-colors`}
            >
              <option value="">Service auswählen</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - {service.price}
                </option>
              ))}
            </select>
            <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-text-tertiary" />
          </div>

          {errors.serviceId && (
            <p className="mt-1 text-sm text-red-500">{errors.serviceId.message}</p>
          )}

          {selectedService?.description && (
            <p className="mt-2 text-sm text-text-tertiary">{selectedService.description}</p>
          )}
        </motion.div>

        {/* Date and Time Selection */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Date Picker */}
          <div>
            <label htmlFor="datepicker" className="block text-text-primary font-medium mb-2">
              Datum*
            </label>

            <div className="relative">
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <DatePicker
                    id="datepicker"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                    dateFormat="dd.MM.yyyy"
                    locale="de"
                    className={`w-full p-3 pl-10 bg-background-tertiary border ${
                      errors.date ? 'border-red-500' : 'border-neutral-700'
                    } rounded-lg text-text-primary focus:outline-none focus:border-accent-500 transition-colors`}
                    wrapperClassName="w-full"
                  />
                )}
              />
              <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-text-tertiary" />
            </div>

            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
          </div>

          {/* Time Picker */}
          <div>
            <label htmlFor="startTime" className="block text-text-primary font-medium mb-2">
              Startzeit*
            </label>

            <div className="relative">
              <select
                id="startTime"
                {...register('startTime')}
                className={`w-full p-3 pl-10 bg-background-tertiary border ${
                  errors.startTime ? 'border-red-500' : 'border-neutral-700'
                } rounded-lg text-text-primary focus:outline-none focus:border-accent-500 transition-colors`}
              >
                <option value="">Startzeit wählen</option>
                {getAvailableTimeSlots().map((time) => (
                  <option key={time} value={time}>
                    {time} Uhr
                  </option>
                ))}
              </select>
              <Clock className="absolute left-3 top-3.5 h-5 w-5 text-text-tertiary" />
            </div>

            {errors.startTime && (
              <p className="mt-1 text-sm text-red-500">{errors.startTime.message}</p>
            )}
          </div>
        </motion.div>

        {/* Duration */}
        <motion.div variants={itemVariants} className="mb-6">
          <label htmlFor="duration" className="block text-text-primary font-medium mb-2">
            Dauer*
          </label>

          <div className="relative">
            <select
              id="duration"
              {...register('duration')}
              className={`w-full p-3 pl-10 bg-background-tertiary border ${
                errors.duration ? 'border-red-500' : 'border-neutral-700'
              } rounded-lg text-text-primary focus:outline-none focus:border-accent-500 transition-colors`}
              disabled={!watchServiceId}
            >
              <option value="">Dauer wählen</option>
              {getAvailableDurations().map((duration) => (
                <option key={duration} value={duration}>
                  {duration}
                </option>
              ))}
            </select>
            <Clock className="absolute left-3 top-3.5 h-5 w-5 text-text-tertiary" />
          </div>

          {errors.duration && (
            <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>
          )}

          {!watchServiceId && (
            <p className="mt-1 text-sm text-text-tertiary">Bitte wähle zuerst einen Service aus</p>
          )}
        </motion.div>

        {/* Personal Information */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-text-primary font-medium mb-2">
              Name*
            </label>

            <div className="relative">
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full p-3 pl-10 bg-background-tertiary border ${
                  errors.name ? 'border-red-500' : 'border-neutral-700'
                } rounded-lg text-text-primary focus:outline-none focus:border-accent-500 transition-colors`}
                placeholder="Dein vollständiger Name"
              />
              <User className="absolute left-3 top-3.5 h-5 w-5 text-text-tertiary" />
            </div>

            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-text-primary font-medium mb-2">
              E-Mail*
            </label>

            <div className="relative">
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full p-3 pl-10 bg-background-tertiary border ${
                  errors.email ? 'border-red-500' : 'border-neutral-700'
                } rounded-lg text-text-primary focus:outline-none focus:border-accent-500 transition-colors`}
                placeholder="deine.email@beispiel.de"
              />
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-text-tertiary" />
            </div>

            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div variants={itemVariants} className="mb-6">
          <label htmlFor="phone" className="block text-text-primary font-medium mb-2">
            Telefon*
          </label>

          <div className="relative">
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className={`w-full p-3 pl-10 bg-background-tertiary border ${
                errors.phone ? 'border-red-500' : 'border-neutral-700'
              } rounded-lg text-text-primary focus:outline-none focus:border-accent-500 transition-colors`}
              placeholder="+49 123 4567890"
            />
            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-text-tertiary" />
          </div>

          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <label htmlFor="message" className="block text-text-primary font-medium mb-2">
            Nachricht <span className="text-text-tertiary">(optional)</span>
          </label>

          <div className="relative">
            <textarea
              id="message"
              {...register('message')}
              className="w-full p-3 pl-10 bg-background-tertiary border border-neutral-700 rounded-lg text-text-primary focus:outline-none focus:border-accent-500 transition-colors min-h-[120px]"
              placeholder="Zusätzliche Informationen oder Wünsche"
              rows={4}
            ></textarea>
            <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-text-tertiary" />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-700 text-white rounded-full transition-colors font-medium flex items-center"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" color="white" className="mr-2" />
                <span>Wird gesendet...</span>
              </>
            ) : (
              'Buchung absenden'
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default BookingForm;
