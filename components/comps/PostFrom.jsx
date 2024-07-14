"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "./FileUploader"
import { postSchema } from "@/validiations"
import { useContext } from "react"
import authContext from "@/context/authContext"
import { createPost, updatePost } from "@/appwirte/api"
import { useToast } from "../ui/use-toast"
import {useRouter} from "next/navigation"



const PostFrom = ({ action, post }) => {
  const router = useRouter()
  const {toast} = useToast()
  const { userData } = useContext(authContext)
  console.log(userData.userId);
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(',') : ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values) {
    try {

      if(post && action ==='update'){
        const update = await updatePost({
          ...values,
          postId: post.$id,
          imageUrl: post?.imageUrl,
          imageId: post?.imageId
        })
        if(!update){
          toast({title: "Please try again"})
          return
        }
        toast({title: "Post is updated succsessfully"})
        router.push('/')
        return; 
      }

      const newPost = await createPost({
        ...values,
        userId: userData.userId
      })
      if (!newPost) {
        toast({title: "Something went wrong! Please try again"})
      }
      toast({title:"Your post is created successfully"})
      form.reset()
    } catch (error) {
      console.log(error);
    }
  }

  return (
        <Form {...form}>
    <div className='mx-3 mt-2 max-w-5xl'>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 outline-none">
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caption</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-4 flex justify-end ">
            {/* <Button type="button">Cancel</Button> */}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </Form>

  )
}


export default PostFrom