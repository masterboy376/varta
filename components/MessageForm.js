import { useContext, useState } from 'react'
import { VartaContext } from '../context/context'
import {RiSendPlaneFill} from 'react-icons/ri'

const styles = {
  chatInputContainer:'fixed bg-gray-900 bg-opacity-70 backdrop-blur-sm bottom-0 right-0 w-full sm:w-4/5 py-2 px-3',
  chatInputWrapper:'rounded-xl hover:border-blue-600 border border-gray-800 px-3 w-full h-10 bg-gray-800 flex items-center justify-center',
  chatInput:'w-full bg-transparent outline-none p-3 h-11/12 resize-none text-white',
  svgContainer:'mr-4 flex items center',
  svg:'w-6 opacity-60 cursor-pointer hover:text-blue-500 hover:opacity-100 transition-all duration-300 ',
}

const MessageForm = ({to}) => {
  const {socket, userData, friend, messages, setMessages} = useContext(VartaContext)
  const [messageBody, setMessageBody] = useState('')

  const onChange = (e)=>{
    setMessageBody(e.target.value)
  }

  const onSubmit = (e)=>{
    e.preventDefault()
    let data = {message:messageBody, from:userData._id, to:friend._id, date:(new Date()).getTime()}
    socket.emit('send', data);
    let tempArray = [...messages]
    tempArray.push(data)
    setMessages(tempArray)
    setMessageBody('')
  }

  return (
    <form onSubmit={onSubmit}
      className={styles.chatInputContainer}
    >
      <div className={styles.chatInputWrapper}>
        <input
        onChange={onChange}
        id='message'
        name='message'
          type='text'
          className={styles.chatInput}
          value={messageBody}
          disabled={false}
          placeholder={'type ypur message here'}
          required
        />
        <button type='submit' disabled={messageBody.length==0} className={styles.svgContainer}>
          <RiSendPlaneFill className={styles.svg} size={40}/>
        </button>
        
      </div>
    </form>
  )
}

export default MessageForm
