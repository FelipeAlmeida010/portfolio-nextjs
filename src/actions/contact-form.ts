'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const action = async (
  _: { success: boolean; message: string } | null,
  formData: FormData
) => {
  try {
    const name = formData.get('name') as string | null
    if (!name) {
      return {
        success: false,
        message: 'Please provide your name.',
      }
    }

    const email = formData.get('email') as string | null
    if (!email) {
      return {
        success: false,
        message: 'Please provide your email address.',
      }
    }

    const subject = formData.get('subject') as string | null

    const message = formData.get('message') as string | null
    if (!message) {
      return {
        success: false,
        message: 'Please provide a message.',
      }
    }

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL!],
      replyTo: email,
      subject: subject || `New contact from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return {
      success: true,
      message: 'Obrigado pela sua contribuição! Entrarei em contato em breve.',
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
