import Image from 'next/image'
import at from '../public/icons/at.svg'
import { useContext, useEffect } from 'react'
import { VartaContext } from '../context/context'
import { HiMenuAlt2 } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaUserCircle, FaUserPlus, FaPhoneVolume, FaVideo } from 'react-icons/fa'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const ChatHeader = () => {
  const styles = {
    chatHeader: 'fixed top-0 right-0 w-full bg-opacity-70 backdrop-blur-sm sm:w-4/5 z-50 bg-gray-900 flex items-center justify between sm:p-2 p-3 border-b border-gray-700 shadow-2xl z-10',
    roomNameContainer: 'flex items-center flex-1',
    svg: 'w-6 invert opacity-60 cursor-pointer mr-2',
    roomName: 'sm:text-base text-sm',
    button: 'mx-2 bg-blue-600 border border-blue-600 hover:border-blue-700 hover:bg-blue-700 p-2 rounded-xl cursor-pointer hidden sm:inline px-4',
    separator: 'mx-2',
    headerIconsContainer: 'group flex items-center',
    headerItem: 'mx-2 hidden sm:flex flex-col items-center',
    headerItemDesc: 'group-hover:opacity-100 absolute hidden z-30 bg-[#2f3136] border border-gray-900 p-1 text-sm rounded-xl top-14 right-[][4000px]',
    icon: 'text-white opacity-60 cursor-pointer mr-2 sm:hidden'

  }
  const { isLoggedin, setIsLeftBar, setIsRightBar, logout, setAddFriendModal, setPhoneModal, setUserModal, setVideoModal, router, getUserByUsername, friend, setFriend } = useContext(VartaContext)

  const init = async ()=>{
    let parsedData = await getUserByUsername(router.query.user)
    if (parsedData.success){
      setFriend(parsedData.user)
    }
    else{
      setFriend({status:false})
    }
  }

  useEffect(() => {
    init()
  }, [router.query.user])
  

  return (
    <div className={styles.chatHeader}>

      <div onClick={() => { setIsLeftBar(true) }} className={styles.icon}>
        <HiMenuAlt2 size={24} />
      </div>

      <div className={styles.roomNameContainer}>
        {router.query.user &&
          <>
            <Image height={20} width={20} src={at} className={styles.svg} alt='' />
            <h3 className={styles.title}>{router.query.user}</h3>
            <div className={`ml-2 rounded-full p-1 ${friend.status?'bg-green-600':'bg-gray-700'} border-gray-700 border-4`} />
          </>
        }
      </div>

      {router.query.user &&
        <div className={styles.headerIconsContainer}>  
        <Tippy content={'Phone'}>
          <button onClick={() => { setPhoneModal(true) }} className={styles.headerItem}>
            <FaPhoneVolume size={25} className={`opacity-70 cursor-pointer`} />
          </button>
        </Tippy>

          <Tippy content={'Video call'}>
            <button onClick={() => { setVideoModal(true) }} className={styles.headerItem}>
              <FaVideo size={25} className={`opacity-70 cursor-pointer`} />
            </button>
          </Tippy>
        </div>
      }

      <Tippy content={'Add friend'}>
        <button onClick={() => { setAddFriendModal(true) }} className={styles.headerItem}>
          <FaUserPlus size={25} className={`opacity-70 cursor-pointer`} />
        </button>
      </Tippy>

      <Tippy content={'Your details'}>
        <button onClick={() => { setUserModal(true) }} className={styles.headerItem}>
          <FaUserCircle size={25} className={`opacity-70 cursor-pointer`} />
        </button>
      </Tippy>

      {isLoggedin && <div className={styles.button} onClick={logout}>
        Log out
      </div>
      }

      <div onClick={() => { setIsRightBar(true) }} className={styles.icon}>
        <BsThreeDotsVertical size={24} />
      </div>
    </div>
  )
}

export default ChatHeader
