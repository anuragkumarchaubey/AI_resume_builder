import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from "@/components/ui/button"
import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";
import Header from './components/custom/Header'
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [count, setCount] = useState(0)
  const {user, isLoaded, isSignedIn} = useUser();

  if(!isSignedIn&&isLoaded)
{
  return <Navigate to={'/auth/sign-in'}/>
}
  return (
    <>
    <Header/>
     <Outlet/>
      <Toaster/>
    </>
  )
}

export default App
