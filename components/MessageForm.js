import { useContext } from 'react'
import { VartaContext } from '../context/context'
// import styles from '../styles/messageForm.module.css'
import plusFilled from '../public/icons/plus-filled.svg'
import sticker from '../public/icons/sticker.svg'
import smiley from '../public/icons/smiley.svg'
import gift from '../public/icons/gift.svg'
import gif from '../public/icons/gif.svg'
import Image from 'next/image'

const styles = {
  chatInputContainer:'fixed bg-gray-900 bg-opacity-70 backdrop-blur-sm bottom-0 right-0 w-full sm:w-3/4 py-2 px-3',
  chatInputWrapper:'rounded-xl hover:border-blue-600 border border-gray-800 px-3 w-full h-10 bg-gray-800 flex items-center justify-center',
  chatInput:'w-full bg-transparent outline-none p-3 h-11/12 resize-none text-white',
  svgContainer:'mr-4 flex items center',
  svg:'w-6 invert opacity-60 cursor-pointer ',
}

const MessageForm = () => {
  const {} = useContext(VartaContext)

  // const sendMessage = event => {
  //   event.preventDefault()
  //   if (messageText.trim() === '') return

  //   const messagesRef = gun.get(roomName)

  //   const newMessage = {
  //     sender: currentUser.name,
  //     avatar: currentUser.avatar
  //       ? currentUser.avatar
  //       : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OCSMFIW5fZ3vSN6yGpD-w-6SsL2_ZPA_sw&usqp=CAU',
  //     content: messageText.trim(),
  //     createdAt: Date().substring(4, 11),
  //     messageId: Date.now(),
  //   }

  //   messagesRef.set(newMessage)
  //   setMessageText('')
  // }

  return (
    <form
      className={styles.chatInputContainer}
    >
      <div className={styles.chatInputWrapper}>
        <div className={styles.svgContainer}>
          <Image
            height={25}
            width={25}
            src={plusFilled}
            className={styles.svg}
          />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={smiley} className={styles.svg} />
        </div>
        <input
          type='text'
          className={styles.chatInput}
          value={''}
          disabled={false}
          placeholder={'type ypur message here'}
        />

        
      </div>
    </form>
  )
}

export default MessageForm
