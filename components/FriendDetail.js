import React, { useContext, useState } from 'react'
import { VartaContext } from '../context/context'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


const FriendDetail = ({ username, name, avatarColor, email, id }) => {
    const { removeFriend, getUserByAuthToken, router } = useContext(VartaContext)
    const [processing, setProcessing] = useState(false)

    const onRemove = async (id) => {
        setProcessing(true)
        const data = await removeFriend({ authToken: localStorage.getItem('authToken'), friendId: id })
        setProcessing(false)
        if (data.success) {
            await getUserByAuthToken()
        }
    }
    return (
        <div className='flex sm:flex-row flex-col items-center justify-start border-b border-gray-700 p-2'>
            <div className={`flex flex-1 sm:flex-row flex-col items-center`}>
                <div className={`mr-2 sm:mb-0 mb-1 flex items-center rounded-full w-10 h-10 text-gray-900 justify-center font-bold text-2xl ${avatarColor}`}>
                    {name[0].toUpperCase()}
                </div>
                <div className={`flex-1 h-full sm:mb-0 mb-1 opacity-90`}>
                    <p className={`text-center sm:text-left`}>{username}</p>
                    <p className={`opacity-60 text-sm text-center sm:text-left`}>{name}</p>
                    <p className={`opacity-60 text-sm text-center sm:text-left`}>{email}</p>
                </div>
            </div>
            <button onClick={() => {
                if (router.query.user === username) {
                    router.push('/')
                }
                onRemove(id)
            }} type="button" className={` bg-blue-600 hover:bg-blue-700 py-2 rounded-xl cursor-pointer sm:w-auto w-full px-2`}>{processing ?
                <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={24} />
                :
                'Remove'
                }</button>

        </div>
    )
}

export default FriendDetail