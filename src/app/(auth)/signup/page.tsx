'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react';
import { FormState } from '@/app/lib/definitions';

export default function SignupForm() {
  const initialState: FormState = { errors: {}, message: "" };
    const [formState, formAction] = useActionState(signup, initialState);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {formState?.errors?.name && <p>{formState.errors.name}</p>}

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {formState?.errors?.email && <p>{formState.errors.email}</p>}

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {formState?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {formState.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      {formState?.message && <p>{formState?.message}</p>}
      <button type="submit">
        Sign Up
      </button>
    </form>
  )
}

