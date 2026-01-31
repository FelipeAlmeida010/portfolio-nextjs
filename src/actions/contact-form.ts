'use server'

import { Resend } from 'resend'
import { contactSchema } from '@/schemas/contact-schema'

const resend = new Resend(process.env.RESEND_API_KEY)

type ActionState = {
  success: boolean
  message: string
} | null

const action = async (_: ActionState, formData: FormData) => {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject') || undefined,
      message: formData.get('message'),
    }

    const parsed = contactSchema.safeParse(rawData)

    if (!parsed.success) {
  const firstError = parsed.error.issues[0]

  return {
    success: false,
    message: firstError?.message ?? 'Dados inválidos.',
  }
}


    const { name, email, subject, message } = parsed.data

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL!],
      replyTo: email,
      subject: subject || `Novo contato de ${name}`,
      html: `
        <h2>Novo contato pelo portfólio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        ${subject ? `<p><strong>Assunto:</strong> ${subject}</p>` : ''}
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    })

    return {
      success: true,
      message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
    }
  } catch (error) {
    console.error('Contact form submission error:', error)

    return {
      success: false,
      message: 'Ops! Ocorreu um problema ao enviar seu formulário.',
    }
  }
}

export default action
