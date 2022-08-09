import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai'
import React, { useContext } from 'react'
import { VartaContext } from '../context/context'
import FriendCard from './FriendCard'

const styles = {
  conversations: 'h-full w-full overflow-y-scroll bg-gray-900 border-r border-gray-700',
  conversationListTop: 'flex w-inherit fixed bg-gray-900 bg-opacity-70 border-r backdrop-blur-sm items-centers justify-between border-b z-10 p-1 sm:p-2 border-gray-700 shadow-2xl',
  searchInput: 'w-full bg-gray-800 hover:border-blue-600 border border-gray-800 rounded-xl outline-none p-2 resize-none text-white',
  conversationsContainer: 'p-2 pt-12 sm:pt-14',
  elementsContainer: 'flex items-center p-1 rounded-xl sursor-pointer hover:bg-gray-800 cursor-pointer',
  svgContainer: 'mr-2',
  svg: 'invert opacity-60 rounded-full',
  name: 'flex-1 h-full opacity-90',
  post: 'opacity-60 text-sm',
  dmTitle: 'opacity-40 font-bold my-3',
  icon: 'text-white opacity-60 cursor-pointer mr-2 flex items-center justify-center ml-2 sm:hidden'
}

const ConversationList = () => {
  const { setIsLeftBar, userFriends, loadingFriends } = useContext(VartaContext)

  const [searchValue, setSearchValue] = useState('')
  const [friends, setFriends] = useState([])

  useEffect(() => {
    setFriends([...userFriends])
  }, [userFriends])
  

  const onChange = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (searchValue.length != 0) {
      let newFriendsArray = [...userFriends]
      for (let i = userFriends.length-1; i >= 0; i--) {
        if (userFriends[i].name.toLowerCase().includes(searchValue.toLowerCase()) || userFriends[i].username.toLowerCase().includes(searchValue.toLowerCase())) {
          continue
        }
        else {
          newFriendsArray.splice(i,1)
          continue
        }
      }
      setFriends(newFriendsArray)
    }

    else {
      setFriends([...userFriends])
    }
  }, [searchValue])

  return (
    <div className={styles.conversations}>
      <div className={styles.conversationListTop}>
        <input onChange={onChange} className={styles.searchInput} placeholder='Search your friend...' />
        <div onClick={() => { setIsLeftBar(false) }} className={styles.icon}>
          <AiOutlineClose size={24} />
        </div>
      </div>

      <div className={styles.conversationsContainer}>
        <div className={styles.dmTitle}>FRIENDS</div>


        {
          friends.length>0 ?
            friends.map((item) => {
              return <FriendCard key={item.username} name={item.name} username={item.username} avatarColor={item.avatarColor} />
            })
            :
            <>
              {
                loadingFriends ?
                  <AiOutlineLoading3Quarters className='animate-spin mx-auto my-4 opacity-60' size={24} />
                  :
                  <div className={`text-center font-bold my-4 opacity-40 text-sm`}>No friend found!</div>
              }
            </>
        }



      </div>
    </div >
  )
}

export default ConversationList
