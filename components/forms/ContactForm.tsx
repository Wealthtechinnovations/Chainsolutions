'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  firstName: z.string().min(2, 'Le prénom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  company: z.string().min(2, 'La société est requise'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Veuillez sélectionner un objet'),
  message: z.string().min(20, 'Le message doit contenir au moins 20 caractères').max(2000, 'Le message est trop long'),
  rgpd: z.boolean().refine(val => val === true, 'Vous devez accepter la politique de confidentialité'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'envoi');
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <h3 className="text-2xl font-serif font-bold text-primary mb-6">Envoyez-nous un message</h3>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-success/10 text-success rounded-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <p>Votre message a été envoyé avec succès. Notre équipe vous contactera dans les plus brefs délais.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-error/10 text-error rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>Une erreur est survenue lors de l&apos;envoi de votre message. Veuillez réessayer ultérieurement.</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
            <input
              {...register('firstName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              placeholder="Jean"
            />
            {errors.firstName && <p className="text-error text-sm mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input
              {...register('lastName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              placeholder="Dupont"
            />
            {errors.lastName && <p className="text-error text-sm mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel *</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              placeholder="jean.dupont@entreprise.com"
            />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              {...register('phone')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              placeholder="+225 00 00 00 00 00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Société / Organisation *</label>
          <input
            {...register('company')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            placeholder="Nom de votre entreprise"
          />
          {errors.company && <p className="text-error text-sm mt-1">{errors.company.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Objet de la demande *</label>
          <select
            {...register('subject')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all bg-white"
          >
            <option value="">Sélectionnez un objet</option>
            <option value="demo">Demande de démonstration</option>
            <option value="partnership">Partenariat</option>
            <option value="support">Support technique</option>
            <option value="investment">Investissement</option>
            <option value="other">Autre demande</option>
          </select>
          {errors.subject && <p className="text-error text-sm mt-1">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea
            {...register('message')}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none"
            placeholder="Comment pouvons-nous vous aider ?"
          />
          {errors.message && <p className="text-error text-sm mt-1">{errors.message.message}</p>}
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register('rgpd')}
            id="rgpd"
            className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
          />
          <label htmlFor="rgpd" className="text-sm text-gray-600">
            J&apos;accepte que mes données soient traitées conformément à la politique de confidentialité de ChainSolutions. *
          </label>
        </div>
        {errors.rgpd && <p className="text-error text-sm mt-1">{errors.rgpd.message}</p>}

        <Button 
          type="submit" 
          variant="accent" 
          className="w-full py-6 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner /> Envoi en cours...
            </span>
          ) : (
            'Envoyer le message'
          )}
        </Button>
      </form>
    </motion.div>
  );
}
