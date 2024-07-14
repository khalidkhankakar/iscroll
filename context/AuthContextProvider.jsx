'use client'
import { useEffect, useState } from "react"
import authContext from "./authContext";
import { userAuth } from "@/appwirte/api";
import { useRouter } from 'next/navigation'
const AuthContextProvider = ({ children }) => {
  const router = useRouter()
  const [userData, setUserData] = useState({
    userId: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: ''

  })
  const cheakAuthUser = async () => {
    try {
      const currentUser = await userAuth();

      if (currentUser) {
        setUserData({
          userId: currentUser.$id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio
        })
        return true
      }
      return false
    } catch (error) {
      console.log(error);
      return false
    }
  }

  useEffect(() => {
    if (localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null || !(localStorage.getItem('cookieFallback'))) {
      router.push('/sign-in')
    }
    cheakAuthUser()
  }, [])



  return (
    <authContext.Provider value={{ userData, setUserData }}>{children}</authContext.Provider>
  )
}

export default AuthContextProvider