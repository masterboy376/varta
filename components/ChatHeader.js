import Image from 'next/image'
import personPlus from '../public/icons/person-plus.svg'
import video from '../public/icons/video.svg'
import inbox from '../public/icons/inbox.svg'
import phone from '../public/icons/phone.svg'
import help from '../public/icons/help.svg'
import pin from '../public/icons/pin.svg'
import at from '../public/icons/at.svg'
import ethLogo from '../public/eth.png'
import { useContext } from 'react'
import { VartaContext } from '../context/context'
import { HiMenuAlt2 } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ReactTooltip from 'react-tooltip'

const ChatHeader = () => {
  const styles = {
    chatHeader: 'fixed top-0 right-0 w-full bg-opacity-70 backdrop-blur-sm sm:w-3/4 z-50 bg-gray-900 flex items-center justify between sm:p-2 p-3 border-b border-l border-gray-700 shadow-2xl z-10',
    roomNameContainer: 'flex items-center flex-1',
    svg: 'w-6 invert opacity-60 cursor-pointer mr-2',
    roomName: 'sm:text-base text-sm',
    chatHeaderStatus: 'w-4 h-4 ml-2 rounded-full left-20',
    connectedWallet: 'mr-2 bg-gray-700 p-2 rounded-full border border-gray-800 hidden sm:flex items-center',
    button: 'mr-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-xl cursor-pointer hidden sm:inline px-4',
    separator: 'mx-2',
    headerIconsContainer: 'group flex items-center',
    headerItem: 'mr-2 hidden sm:flex flex-col items-center',
    // headerItemSearch:'mr-2 flex flex-col items-center',
    headerItemDesc: 'group-hover:opacity-100 absolute hidden z-30 bg-[#2f3136] border border-gray-900 p-1 text-sm rounded-xl top-14 right-[][4000px]',
    icon: 'text-white opacity-60 cursor-pointer mr-2 sm:hidden'

  }
  const { roomName, isLoggedin, setIsLeftBar, setIsRightBar, logout, router } = useContext(VartaContext)

  return (
    <div className={styles.chatHeader}>

      <div onClick={() => { setIsLeftBar(true) }} className={styles.icon}>
        <HiMenuAlt2 size={24} />
      </div>

      <div className={styles.roomNameContainer}>
        <Image height={20} width={20} src={at} className={styles.svg} alt='' />
        <h3 className={styles.title}>{roomName}</h3>
        <div className={styles.chatHeaderStatus} id='online' />
      </div>

      {isLoggedin && <div className={styles.button} onClick={logout}>
          Log out
        </div>
      }

      <div className={styles.headerIconsContainer}>

        <div className={styles.headerItem}>
          <Image
          data-tip
          data-event-off
          data-for="phone"
            height={25}
            width={25}
            src={phone}
            className={styles.svg}
            alt=''
          />
          {/* <span className={styles.headerItemDesc}>Phone call</span> */}
        </div>

        <div className={styles.headerItem}>
          <Image
          data-tip
          data-event-off
          data-for="video"
            height={25}
            width={25}
            src={video}
            className={styles.svg}
            alt=''
          />
        </div>

      </div>

      <div className={styles.headerItem}>
        <Image 
        data-tip
        onMouseLeave={(e)=>{ReactTooltip.hide(e.target)}}
        data-event-off='click'
        data-for="pinned"
         height={25}
          width={25} 
          src={pin}
           className={styles.svg}
            alt='' />
      </div>

      <button onClick={()=>{router.push(`/?addFriend=true`)}} className={styles.headerItem}>
        <Image
        data-tip
        data-for="addFriend"
          height={25}
          width={25}
          src={personPlus}
          className={styles.svg}
          alt=''
        />
        {/* <span className={styles.headerItemDesc}>Video call</span> */}
      </button>

      <div onClick={() => { setIsRightBar(true) }} className={styles.icon}>
        <BsThreeDotsVertical size={24} />
      </div>
    </div>
  )
}

export default ChatHeader
