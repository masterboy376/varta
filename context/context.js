import { createContext, useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

export const VartaContext = createContext()

export const VartaProvider = ({ children }) => {
  // -------------------------------------------

  //states
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [isRightBar, setIsRightBar] = useState(false)
  const [isLeftBar, setIsLeftBar] = useState(false)

  // -------------------------------------------
  // useEffects 
  useEffect(() => {
    let authToken = localStorage.getItem('authToken')
    if (authToken) {
      setIsLoggedin(true)
    }
    else {
      setIsLoggedin(false)
      router.push('/login')
    }
  }, [isLoggedin])


  // -------------------------------------------
  // functions
  const alertSuccess = async (msg) => {
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const alertError = async (msg) => {
    toast.error(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const logout=()=>{
    setIsLoggedin(false);
    localStorage.removeItem('authtoken');
  }

  const userLogin = async (credentials) => {
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/authUser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const parsedData = await rawData.json()
    if (parsedData.success) {
      localStorage.setItem('authToken', parsedData.authToken)
      alertSuccess('Logged in successfully!')
      setIsLoggedin(true)
      router.push('/')
    }
    else {
      localStorage.removeItem('authToken')
      alertError(parsedData.error)
      setIsLoggedin(false)
    }
    return parsedData
  }

  const userSignup = async (credentials) => {
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/createUser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const parsedData = await rawData.json()
    if (parsedData.success) {
      localStorage.setItem('authToken', parsedData.authToken)
      alertSuccess('Signed up successfully!')
      setIsLoggedin(true)
      router.push('/')
    }
    else {
      localStorage.removeItem('authToken')
      alertError(parsedData.error)
      setIsLoggedin(false)
    }
    return parsedData
  }

  const generateLink = async (email) => {
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/linkData`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({email:email})
    })
    const parsedData = await rawData.json()
    return parsedData
  }

  const resetPassword = async (credentials) => {
    console.log(credentials)
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const parsedData = await rawData.json()
    if (parsedData.success) {
      localStorage.setItem('authToken', parsedData.authToken)
      alertSuccess('Password changed successfully!')
      setIsLoggedin(true)
      router.push('/')
    }
    else {
      localStorage.removeItem('authToken')
      alertError(parsedData.error)
      setIsLoggedin(false)
    }
    return parsedData
  }

  // -------------------------------------------

  return (
    <VartaContext.Provider
      value={{
        router,
        loading,
        setLoading,
        isLoggedin,
        setIsLoggedin,
        setIsLeftBar,
        setIsRightBar,
        isLeftBar,
        isRightBar,
        userLogin,
        userSignup,
        logout,
        alertSuccess,
        alertError,
        generateLink,
        resetPassword
      }}
    >
      {children}
    </VartaContext.Provider>
  )
}
