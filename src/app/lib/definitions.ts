import { z } from 'zod';

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'نام باید حداقل 2 کاراکتر باشد.' })
    .trim(),
  email: z.string().email({ message: 'لطفا یک ایمیل معتبر وارد کنید.' }).trim(),
  password: z
    .string()
    .trim() // ابتدا trim را اعمال می‌کنیم
    .refine(
      (value) =>
        value.length >= 8 && // حداقل ۸ کاراکتر
        /[a-zA-Z]/.test(value) && // حداقل یک حرف
        /\d/.test(value) && // حداقل یک عدد
        /[^a-zA-Z0-9]/.test(value), // حداقل یک کاراکتر خاص
      {
        message:
          'رمز عبور باید حداقل ۸ کاراکتر و شامل یک حرف، یک عدد و یک کاراکتر خاص باشد.',
      }
    ),
});


export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined