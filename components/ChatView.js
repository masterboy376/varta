import ChatHeader from './ChatHeader'
import MessageForm from './MessageForm'
import { useContext, useState } from 'react'
import { VartaContext } from '../context/context'
import MessageCard from './MessageCard'
import Image from 'next/image'

const ChatView = () => {
  const { router, userData, socket, messages, setMessages, friend } = useContext(VartaContext)

  socket.on('receive', data =>{
    let tempArray = [...messages]
    tempArray.push(data)
    console.log(data)
    setMessages(tempArray)
})

  return (
    <div className={`flex-6 h-screen w-full relative overflow-y-scroll`}>
      {/* header  */}
      <ChatHeader />

      {router.query.user?
        <>
        {/* chat body  */}
        <div className={`m-5 mt-16 mb-16 z-0 overflow-y-scroll flex flex-col sm:text-base text-sm`}>
{
  messages.map((item)=>{
    if(item.to==friend._id){
      return <MessageCard sender={item.from} body={item.message} date={new Date(item.date).toLocaleString('en-US', {
        timeZone: 'PST',
        hour12: true,
        timeStyle: 'short',
        dateStyle: 'long',
      })} />
    }
    else{
      return
    }
  })
}
          {/* <MessageCard sender='62b47b32c6fdf2ec440d6759' body='Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, accusantium quam sit corporis perspiciatis ipsam at voluptatum eaque laudantium hic dolore? Quod ipsum fugiat ea quas eligendi debitis aut harum!89' date='10-may-2999' />
          <MessageCard sender='62b47af7c6fdf2ec440d6756' body='Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, accusantium quam sit corporis perspiciatis ipsam at voluptatum eaque laudantium hic dolore? Quod ipsum fugiat ea quas eligendi debitis aut harum!89' date='10-may-2999' /> */}

        </div>

        {/* chat form  */}
        <MessageForm />
      </>
      :
      <div className='w-full h-full flex items-center justify-center'>
      <Image src={'/waiting.svg'} width={400} height={400} className='mx-auto my-auto'></Image>
      </div>
      }

    </div>
  )
}

export default ChatView
