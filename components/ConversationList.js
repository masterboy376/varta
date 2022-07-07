import { useEffect, useState } from 'react'
import Image from 'next/image'
import friends from '../public/icons/friends.svg'
import nitro from '../public/icons/nitro.svg'
import DmCard from './DmCard'
import {AiOutlineClose} from 'react-icons/ai'
import React, {useContext} from 'react'
import { VartaContext } from '../context/context'

const styles ={
  conversations:'h-full w-4/5 overflow-y-scroll bg-gray-900',
  conversationListTop:'flex w-inherit fixed bg-gray-900 bg-opacity-70 backdrop-blur-sm items-centers justify-between border-b z-10 p-1 sm:p-2 border-gray-700 shadow-2xl',
  searchInput:'w-full bg-gray-800 hover:border-blue-600 border border-gray-800 rounded-xl outline-none p-2 resize-none text-white',
  conversationsContainer:'p-2 pt-12 sm:pt-14',
  elementsContainer:'flex items-center p-1 rounded-xl sursor-pointer hover:bg-gray-800 cursor-pointer',
  svgContainer:'mr-2',
  svg:'invert opacity-60 rounded-full',
  name:'flex-1 h-full opacity-90',
  post:'opacity-60 text-sm',
  dmTitle:'opacity-40 font-bold my-3',
  icon: 'text-white opacity-60 cursor-pointer mr-2 flex items-center justify-center ml-2 sm:hidden'
}

const ConversationList = () => {
  const {setIsLeftBar} = useContext(VartaContext)
  const [dms, setDms] = useState([])

  const getDms = async () => {
  // try {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getdms`)

  //   setDms(await response.json())
  //   console.log(dms)
  // } catch (error) {
  //   console.error(error)
  // }
}
  useEffect(()=>{
    getDms()
  }, [])
  return (
    <div className={styles.conversations}>
      <div className={styles.conversationListTop}>
        <input className={styles.searchInput} placeholder='Find or start a conversation' />
        <div onClick={()=>{setIsLeftBar(false)}} className={styles.icon}>
          <AiOutlineClose size={24}/>
        </div>
      </div>

      <div className={styles.conversationsContainer}>
      <div className={styles.dmTitle}>FRIENDS</div>

        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>

        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>
        
        <div className={styles.dmTitle}>DIRECT MESSAGES</div>
        
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={48}
              width={48}
              src={'/avatar-2.png'}
              className={styles.svg}
            />
          </div>
            <div className={styles.name}>
              <p>Sambhav</p>
              <p className={styles.post}>Elder</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationList
