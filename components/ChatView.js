import ChatHeader from './ChatHeader'
import MessageForm from './MessageForm'
import { useContext } from 'react'
import { VartaContext } from '../context/context'
import MessageCard from './MessageCard'
import Image from 'next/image'

const styles = {
  chatView: 'flex-6 h-screen w-full relative overflow-y-scroll border-l border-gray-700',
  messagesContainer: 'm-5 mt-16 mb-16 z-0 overflow-y-scroll flex flex-col sm:text-base text-sm',
  svg:'invert opacity-60 rounded-full sm:w-12 w-6 h-6 sm:h-12',
}

const ChatView = () => {
  const { state } = useContext(VartaContext)

  // const formattedMessagesArray = () => {
  //   const uniqueArray = state.messages.filter((value, index) => {
  //     const _value = JSON.stringify(value)

  //     return (
  //       index ===
  //       state.messages.findIndex(obj => {
  //         return JSON.stringify(obj) === _value
  //       })
  //     )
  //   })

  //   return uniqueArray
  // }
  return (
    <div className={styles.chatView}>
      <ChatHeader />
      <div className={styles.messagesContainer}>
        {/* {formattedMessagesArray().map((message, index) => (
          <MessageCard
            key={index}
            avatar={message.avatar}
            sender={message.sender}
            timestamp={message.createdAt}
            content={message.content}
          />
        ))} */}

         <div className="bg-gray-800 bg-opacity-70 flex rounded-xl sm:p-3 p-2 w-2/3 my-2 self-start">

            <img src={'/avatar-2.png'} alt="" className={styles.svg} />
            
            <div className="flex-1 pl-2">
              <div className="flex sm:flex-row flex-col items-start sm:items-center w-full justify-start sm:justify-between">
                <span className="font-bold opacity-90">Sambhav Kaushik</span>
                <span className="opacity-60">12-may-2022</span>
              </div>
              <p className="my-2">Lorem fugiat ea quas eligendi debitis aut harum!</p>
            </div>
         </div>

         <div className="bg-blue-700 bg-opacity-70 flex rounded-xl sm:p-3 p-2 w-2/3 my-2 self-end">

            <img src={'/avatar-2.png'} alt="" className={styles.svg} />

            <div className="flex-1 pl-2">
              <div className="flex sm:flex-row flex-col items-start sm:items-center w-full justify-start sm:justify-between">
                <span className="font-bold opacity-90">Sambhav Kaushik</span>
                <span className="opacity-60">12-may-2022</span>
              </div>
              <p className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, accusantium quam sit corporis perspiciatis ipsam at voluptatum eaque laudantium hic dolore? Quod ipsum fugiat ea quas eligendi debitis aut harum!</p>
            </div>
         </div>

         <div className="bg-gray-800 bg-opacity-70 flex rounded-xl sm:p-3 p-2 w-2/3 my-2 self-start">

            <img src={'/avatar-2.png'} alt="" className={styles.svg} />
            
            <div className="flex-1 pl-2">
              <div className="flex sm:flex-row flex-col items-start sm:items-center w-full justify-start sm:justify-between">
                <span className="font-bold opacity-90">Sambhav Kaushik</span>
                <span className="opacity-60">12-may-2022</span>
              </div>
              <p className="my-2">Lorem fugiat ea quas eligendi debitis aut harum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit necessitatibus molestiae dolores dignissimos ea quibusdam aut blanditiis consequatur excepturi, similique sed asperiores corrupti incidunt doloribus nemo voluptates quam non totam.</p>
            </div>
         </div>

         <div className="bg-gray-800 bg-opacity-70 flex rounded-xl sm:p-3 p-2 w-2/3 my-2 self-start">

            <img src={'/avatar-2.png'} alt="" className={styles.svg} />
            
            <div className="flex-1 pl-2">
              <div className="flex sm:flex-row flex-col items-start sm:items-center w-full justify-start sm:justify-between">
                <span className="font-bold opacity-90">Sambhav Kaushik</span>
                <span className="opacity-60">12-may-2022</span>
              </div>
              <p className="my-2">hi.</p>
            </div>
         </div>

         <div className="bg-blue-700 bg-opacity-70 flex rounded-xl sm:p-3 p-2 w-2/3 my-2 self-end">

            <img src={'/avatar-2.png'} alt="" className={styles.svg} />

            <div className="flex-1 pl-2">
              <div className="flex sm:flex-row flex-col items-start sm:items-center w-full justify-start sm:justify-between">
                <span className="font-bold opacity-90">Sambhav Kaushik</span>
                <span className="opacity-60">12-may-2022</span>
              </div>
              <p className="my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, accusantium quam sit corporis perspiciatis ipsam at voluptatum eaque laudantium hic dolore? Quod ipsum fugiat ea quas eligendi debitis aut harum!</p>
            </div>
         </div>

        </div>
      <MessageForm />
    </div>
  )
}

export default ChatView
