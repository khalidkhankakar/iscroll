'use client'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { editProfileSchema } from '@/validiations'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import FileUploader2 from './FileUploader2'
import '../../app/globals.css'
import { useContext } from 'react'
import authContext from '@/context/authContext'
import { Textarea } from '../ui/textarea'
import { updateProfile } from '@/appwirte/api'
import { useToast } from '../ui/use-toast'

const ProfilePage = ({ profileId,
    profileDocument }) => {
        const {toast} = useToast()
    const params = useSearchParams();
    const { userData } = useContext(authContext)
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            bio : profileDocument ? profileDocument.bio !== null ? profileDocument.bio : '':'',
            name: profileDocument ? profileDocument.name : '',
            file: [],
        },
    })
    async function onSubmit(values) {
        const update = await updateProfile({
            ...values,
            Id: profileDocument.$id,
            imageUrl: profileDocument?.imageUrl,
            imageId: profileDocument?.imageId
          })
          if(!update){
          return toast({title: "Please try again"})
          }
          router.push(`/profile/${profileId}`)
        console.log(values);
    }
    return (
        <Form {...form}>
            <div className='w-[90%] mt-2 m-auto  py-3'>
                <div className='flex flex-col items-center justify-center '>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 outline-none">
                        {params.get('edit') && <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FileUploader2 fieldChange={field.onChange} mediaUrl={profileDocument.imageUrl} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {!params.get('edit') && <div>
                            <Image src={profileDocument.imageUrl} width={500} height={500} alt="profile" className="h-24 w-24 m-auto md:h-28 md:w-28 object-cover rounded-full " />
                        </div>}
                        {params.get('edit') && <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Enter your name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {params.get('edit') && <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder={'Enter your bio'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />}
                        {!params.get('edit') && <div className='flex flex-col items-center justify-center'>
                            <h1 className='h3-bold md:h2-bold'>{profileDocument.name}</h1>
                            {profileDocument.bio !== null && <p className='small-medium '>{profileDocument.bio.substr(0, 50)}</p>}
                        </div>}
                        {params.get('edit') && <Button
                            type='submit' className='shad-button_primary w-full mt-3 small-semibold text-black '>Submit</Button>}
                    </form>
                    <div className='flex space-x-3 mt-2'>
                        <div className='flex space-x-3 items-center'>
                            <p className='base-semibold text-purple-700 md:text-lg '>{profileDocument.posts.length}</p>
                            <p className='base-semibold dark:text-slate-200  text-black md:text-lg'>Posts</p>
                            <div className='h-7 w-[1px] bg-black dark:bg-slate-400' />
                        </div>
                        <div className='flex space-x-3 items-center'>
                            <p className='base-semibold text-purple-700 md:text-lg'>{profileDocument.liked.length}</p>
                            <p className='base-semibold dark:text-slate-200  text-black md:text-lg'>Likes</p>
                            <div className='h-7 w-[1px] bg-black dark:bg-slate-400 ' />
                        </div>
                        <div className='flex space-x-3 items-center'>
                            <p className='base-semibold text-purple-700 md:text-lg'>100</p>
                            <p className='base-semibold dark:text-slate-200  text-black md:text-lg'>Followers</p>
                        </div>
                    </div>
                    {profileId === userData.userId && <Button onClick={() => { router.push(`/profile/${profileId}?edit=true`) }} className='shad-button_primary mt-3'>
                        <Image src={'/edit.png'} width={28} height={28} alt='edit' className='h-5 w-5 object-contain' />
                        <p className='small-semibold text-black '>Edit</p>
                    </Button>}


                    <div className='my-2 w-full h-[0.06rem] bg-gray-400 rounded-full' />
                    <div className='flex space-x-2 items-center '>
                        <button className='shad-button'>
                            <Image src={'/create.png'} width={28} height={28} alt='edit' className='h-5 w-5 object-contain' />
                            <p className='small-semibold text-black '>Posts</p>
                        </button>
                        <div className='h-12 w-[1px] bg-black dark:bg-slate-400' />

                        <button className='shad-button'>
                            <Image src={'/like.png'} width={28} height={28} alt='edit' className='h-5 w-5 object-contain' />
                            <p className='small-semibold text-black '>Likes</p>
                        </button>
                    </div>
                </div>
            </div>
        </Form>

    )
}

export default ProfilePage