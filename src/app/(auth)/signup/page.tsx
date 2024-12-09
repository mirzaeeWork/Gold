'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react';
import { FormState } from '@/app/lib/definitions';

export default function SignupForm() {
  const initialState: FormState = { errors: {}, message: "" };
    const [formState, formAction] = useActionState(signup, initialState);

  return (
    <form action={formAction} className='text-right'>
      <div>
        <input className='input text-rigth' id="name" name="name" placeholder="نام" autoFocus/>

      </div>
      {formState?.errors?.name && <p className='input-error'>{formState.errors.name}</p>}

      <div>
        <input className='input' id="email" name="email" placeholder="ایمیل" />
      </div>
      {formState?.errors?.email && <p className='input-error'>{formState.errors.email}</p>}

      <div>
        <input className='input' id="password" name="password" type="password" placeholder="پسورد"/>
      </div>
      {formState?.errors?.password &&  <p className='input-error'>{formState.errors.password}</p>}
      {formState?.message && <p className='input-error'>{formState?.message}</p>}
      <button type="submit" className="button secondary expanded has-icon">
        ثبت نام
      </button>
    </form>
  )
}

