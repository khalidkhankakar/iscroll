import { inter, roboto_mono } from '@/constants'

const page = () => {
  return (
    <div className={`${roboto_mono.className}  font-bold`} >
      <h1 className={`${inter.className} text-4xl font-bold mt-5 ml-5` } >Saved</h1>
    </div>
  )
}

export default page