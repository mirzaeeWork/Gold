"use server"; 
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { clearCookie, createToken, setCookie } from '@/app/lib/session';
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  
  const { name, email, password } = validatedFields.data;



  // هش کردن رمز عبور
  const hashedPassword = await bcrypt.hash(password, 10);

  // ذخیره در دیتابیس
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      roleId: 1
    },
  });

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }

  const token = await createToken({ userId: user.id, name});
  setCookie("authToken", token);


  redirect('/')
}

export async function logout() {
  await clearCookie("authToken")
  redirect('/login')
}
