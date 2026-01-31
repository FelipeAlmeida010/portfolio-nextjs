import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Nome muito curto'),

  email: z
    .string()
    .trim()
    .email('E-mail inválido')
    .max(255, 'E-mail muito longo'),

  subject: z
    .string()
    .trim()
    .max(150, 'Assunto muito longo')
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, 'Mensagem muito curta')
    .max(2000, 'Mensagem muito longa'),
})
