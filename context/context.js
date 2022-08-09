import { createContext, useState, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

export const VartaContext = createContext()

export const VartaProvider = ({ children }) => {
  // -------------------------------------------

  //states
  const router = useRouter()
  const [loadingFriends, setLoadingFriends] = useState(false)
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [isRightBar, setIsRightBar] = useState(false)
  const [isLeftBar, setIsLeftBar] = useState(false)

  const [addFriendModal, setAddFriendModal] = useState(false)
  const [phoneModal, setPhoneModal] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [userModal, setUserModal] = useState(false)

  const [userData, setUserData] = useState({})
  const [userFriends, setUserFriends] = useState([])

  // -------------------------------------------
  // useEffects 
  useEffect(() => {
    const init = async () => {
      let authToken = localStorage.getItem('authToken')
      if (authToken) {
        setIsLoggedin(true)
        await getUserByAuthToken()
      }
      else {
        setIsLoggedin(false)
        router.push('/login')
      }
    }
    init()
  }, [isLoggedin])


  // -------------------------------------------
  // functions

  // success message 
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

  // error message 
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

  // user logout 
  const logout=()=>{
    setIsLoggedin(false);
    localStorage.removeItem('authToken');
  }

  //get user by authToken
  const getUserByAuthToken = async () => {
    setLoadingFriends(true)
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserData`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({authToken:localStorage.getItem('authToken')})
    })
    const parsedData = await rawData.json()
    if(parsedData.success){
      setUserData(parsedData.user)
      setLoadingFriends(false)
      getUsersByIds(parsedData.user.friends)
      console.log(parsedData.user)
    }
    else{
      setLoadingFriends(false)
    }
    return parsedData
  }

  //get user by ids
  const getUsersByIds = async (ids) => {
    setLoadingFriends(true)
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUsersByIds`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({userIds:ids})
    })
    const parsedData = await rawData.json()
    if(parsedData.success){
      setUserFriends(parsedData.userData)
      console.log(parsedData.userData)
    }
    setLoadingFriends(false)
    return parsedData
  }

  //get user by id
  const getUserById = async (credentials) => {
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/getUserById`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({userId:credentials})
    })
    const parsedData = await rawData.json()
    return parsedData
  }

  // user login 
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

  // create new user 
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

  // update user 
  const updateUser = async (credentials) => {
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/updateUser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const parsedData = await rawData.json()
    if (parsedData.success) {
      alertSuccess('User updated successfully!')
    }
    else {
      alertError(parsedData.error)
    }
    return parsedData
  }

  // generate reset link 
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

  // reset password
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

  // add friend 
  const addFriend = async (credentials) => {
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/addFriend`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const parsedData = await rawData.json()
    if (parsedData.success) {
      alertSuccess('Friend added successfully!')
    }
    else {
      alertError(parsedData.error)
    }
    return parsedData
  }

  // remove friend 
  const removeFriend = async (credentials) => {
    const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/removeFriend`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    const parsedData = await rawData.json()
    if (parsedData.success) {
      alertSuccess('Friend removed successfully!')
    }
    else {
      alertError(parsedData.error)
    }
    return parsedData
  }

  // // create channel 
  // const createChannel = async (credentials)=>{
  //   const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/createChannel`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(credentials)
  //   })
  //   const parsedData = await rawData.json()
  //   if (parsedData.success) {
  //     alertSuccess('Channel created successfully!')
  //     router.push('/')
  //   }
  //   else {
  //     alertError(parsedData.error)
  //   }
  //   return parsedData
  // }

  // // update channel 
  // const updateChannel = async (credentials)=>{
  //   const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/updateChannel`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify({authToken:localStorage.getItem("authToken"), newChannelData:credentials})
  //   })
  //   const parsedData = await rawData.json()
  //   if (parsedData.success) {
  //     alertSuccess('Channel updated successfully!')
  //   }
  //   else {
  //     alertError(parsedData.error)
  //   }
  //   return parsedData
  // }

  // // add member 
  // const addMember = async (credentials)=>{
  //   const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/addMember`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(credentials)
  //   })
  //   const parsedData = await rawData.json()
  //   if (parsedData.success) {
  //     alertSuccess('Added to the channel!')
  //   }
  //   else {
  //     alertError(parsedData.error)
  //   }
  //   return parsedData
  // }

  // // remove member 
  // const removeMember = async (credentials)=>{
  //   const rawData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/channel/removeMember`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(credentials)
  //   })
  //   const parsedData = await rawData.json()
  //   if (parsedData.success) {
  //     alertSuccess('Removed from the channel!')
  //   }
  //   else {
  //     alertError(parsedData.error)
  //   }
  //   return parsedData
  // }

  // -------------------------------------------

  return (
    <VartaContext.Provider
      value={{
        router,
        setUserModal,
        userModal,
        setAddFriendModal,
        addFriendModal,
        setPhoneModal,
        phoneModal,
        setVideoModal,
        videoModal,
        loadingFriends,
        isLoggedin,
        setIsLoggedin,
        setIsLeftBar,
        setIsRightBar,
        isLeftBar,
        isRightBar,
        userData,
        userFriends,
        getUserById,
        getUsersByIds,
        getUserByAuthToken,
        userLogin,
        userSignup,
        logout,
        alertSuccess,
        alertError,
        generateLink,
        resetPassword,
        updateUser,
        addFriend,
        removeFriend,
      }}
    >
      {children}
    </VartaContext.Provider>
  )
}
