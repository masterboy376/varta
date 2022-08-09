import React, {useContext} from 'react'
import { VartaContext } from '../context/context'

const FriendCard = ({username, name, avatarColor}) => {
    const {router} = useContext(VartaContext)
  return (
    <div onClick={()=>{router.push(`/?user=${username}`)}} className={`flex items-center p-2 rounded-xl hover:bg-gray-800 cursor-pointer`}>
          <div className={`mr-2 flex items-center rounded-full w-10 h-10 text-gray-900 justify-center font-bold text-2xl ${avatarColor}`}>
            {name[0].toUpperCase()}
          </div>
            <div className={`flex-1 h-full opacity-90`}>
              <p>{username}</p>
              <p className={`opacity-60 text-sm`}>{name}</p>
            </div>
        </div>
  )
}

export default FriendCard