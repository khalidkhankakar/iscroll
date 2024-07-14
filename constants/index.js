import { Inter, Roboto, Roboto_Mono } from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
  })
  export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
  })

export const navLinks = [
  {
    text:'Home',
    Link:'/'
  },
  {
    text:'Explore',
    Link:'/explore'
  },
  {
    text:'Saved',
    Link:'/saved'
  },
  {
    text:'Create a post',
    Link:'/create-post'
  },  {
    text:'People',
    Link:'/people'
  }
]

export const mobileNavLinks = [
  {
    text:'HOME',
    link:'/',
    img1:'/home.png',
    img2:'/homed.png'
  },
  {
    text:'EXPLORE',
    link:'/explore',
    img1:'/explore.png',
    img2:'/explored.png'
  },
  {
    text:'SAVED',
    link:'/saved',
    img1:'/save.png',
    img2:'/saved.png'
  },
  {
    text:'CREATE',
    link:'/create-post',
    img1:'/create.png',
    img2:'/created.png'
  },  {
    text:'PEOPLE',
    link:'/people',
    img1:'/people.png',
    img2:'/peopled.png'
  }
]

export const getLastPostId = (posts) => { 
  if(posts && posts.documents.length === 0) return null;
  const lastId = posts.documents[posts.documents.length - 1].$id;
  return lastId
 }
