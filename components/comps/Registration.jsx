'use client'
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { RegisterSchema } from "@/validiations"
import { createAccountUser, signInAccount } from "@/appwirte/api"
import { useRouter } from "next/navigation"


const Registration = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
 async function onSubmit(values) {

try {
  setLoading(true)
      // Function that create user in appwrite database
      const resp = await createAccountUser(values)
      if(!resp){
        return toast({
          title: "Oops! Sign in failed"
        })
      }
      // Function that create the user in localStorage
      const createSession = await signInAccount({
        email: values.email,
        password: values.password
      })
      if(createSession){
        toast({
          title: "Yeah! Sign in successfully"
        })
        router.push('/')
      }
} catch (error) {
  console.log(error);
}finally{
  setLoading(false)
}
  }
  return (
    <Form {...form}>
      <div className="flex  flex-col dark:text-white text-black  items-center justify-center m-auto">
        <div className="flex flex-col items-center justify-center">
          <Image src="/logo.svg" width={100} height={100} alt={'logo..'} className={'object-contain  h-16 w-16'} />
          <p className="text-[0.8rem] text-gray-400">To Get Started!</p>
          <h1 className="text-xl font-semibold">Create an account</h1>
        </div>


        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text'  className="bg-gray-700 xl:text-lg  outline-none text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='text '  className="bg-gray-700 xl:text-lg outline-none text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email"  className="bg-gray-700 xl:text-lg outline-none text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' className="bg-gray-700 xl:text-lg outline-none text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-700 xl:text-lg hover:bg-blue-900">{
            loading ? 
                <Image src={'/loading.svg'} width={40} height={40} alt="loading" />
            :
                'Register'
          }</Button>
        </form>
        <p className="mt-3">Have an account? <Link href={'/sign-in'} className="text-yellow-500">Log in</Link></p>
      </div>
    </Form>
  )
}

export default Registration