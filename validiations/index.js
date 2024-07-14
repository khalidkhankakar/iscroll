import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Enter password at least 8 characters' }),
  })
export const RegisterSchema = z.object({
    name: z.string().min(2, { message: 'Too short' }),
    username: z.string().min(2, { message: 'Too short' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Enter password at least 8 characters' }),
  })

export  const postSchema = z.object({
    caption: z.string().min(2).max(2000),
    file: z.custom(),
    location: z.string().min(3).max(2000),
    tags: z.string().min(3).max(2000)
  })
  export  const editProfileSchema = z.object({
    name: z.string().min(3).max(2000),
    bio: z.string().min(3).max(2000),
    file: z.custom(),
  })