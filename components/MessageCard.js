import React, {useEffect, useState, useContext} from 'react'
import { VartaContext } from '../context/context'

const MessageCard = ({sender, body, date }) => {

    const {getUserById, userData} = useContext(VartaContext)
    const [senderData, setSenderData] = useState(90)

    const getSenderData = async ()=>{
        const parsedData = await getUserById(sender)
        if(parsedData.success){
            setSenderData(parsedData.user)
        }
    }

    useEffect(() => {
      getSenderData()
    }, [])
    

  return (
    <>
    {(senderData && userData) && <div className={`${sender==userData._id?'bg-blue-700':'bg-gray-800'} bg-opacity-70 flex rounded-xl sm:p-3 p-2 w-2/3 my-2 ${sender==userData._id?'self-end':'self-start'}`}>

    <div className={`mr-2 flex items-center rounded-full w-10 h-10 text-gray-900 justify-center font-bold text-2xl ${senderData.avatarColor}`}>
            {senderData.name && senderData.name[0].toUpperCase()}
          </div>
            
            <div className="flex-1 pl-2">
              <div className="flex sm:flex-row flex-col items-start sm:items-center w-full justify-start sm:justify-between">
                <div className="flex flex-col items-start justify-center">
                <span className="font-bold opacity-90">{senderData.username}</span>
                <span className="opacity-90">{senderData.name}</span>
                </div>
                <span className="opacity-60">{date}</span>
              </div>
              <p className="my-2">{body}</p>
            </div>
         </div>}
    </>
  )
}

export default MessageCard
