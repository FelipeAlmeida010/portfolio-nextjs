'use client'

import action from '@/actions/contact-form'
import { useActionState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'

const ContactForm = () => {
  const [status, formAction, isPending] = useActionState(action, null)

  if (status?.success) {
    return (
      <p className="text-accent self-center text-center text-2xl font-medium">{status.message}</p>
    )
  }

  return (
    <form action={formAction}>
      <Input label="Nome Completo" id="name" name="name" placeholder="Seu nome aqui" required />
      <Input
        label="Endereço de E-mail"
        id="email"
        type="email"
        name="email"
        placeholder="Seu endereço de e-mail aqui"
        required
      />
      <Input label="Assunto" id="subject" name="subject" placeholder="Seu assunto aqui" />
      <Textarea
        label="Mensagem"
        id="message"
        name="message"
        placeholder="Sua mensagem aqui"
        rows={7}
        required
      />
      {!status?.success && <p className="my-2 font-light text-red-600">{status?.message}</p>}
      <Button text={isPending ? 'Submitting...' : 'Enviar'} disabled={isPending} />
    </form>
  )
}

export default ContactForm
