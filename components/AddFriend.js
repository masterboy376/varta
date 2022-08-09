import React, { useContext, useState } from 'react'
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { VartaContext } from '../context/context'

const AddFriend = () => {
    const { router, setAddFriendModal, getUserByAuthToken, getUserById, addFriend, removeFriend, userData } = useContext(VartaContext)

    const [result, setResult] = useState()
    const [processing, setProcessing] = useState(false)
    const [adding, setAdding] = useState(false)
    const [userId, setUserId] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        const data = await getUserById(userId)
        setResult(data)
        setProcessing(false)
    }

    const onAdd = async (e, id) => {
        e.preventDefault()
        setAdding(true)
        const data = await addFriend({ authToken: localStorage.getItem('authToken'), friendId: id })
        setAdding(false)
        if (data.success) {
            await getUserByAuthToken()
        }
    }

    const onRemove = async (e, id) => {
        e.preventDefault()
        setAdding(true)
        const data = await removeFriend({ authToken: localStorage.getItem('authToken'), friendId: id })
        setAdding(false)
        if (data.success) {
            await getUserByAuthToken()
        }
    }

    return (
        <div className={`w-full p-4 ${processing || adding ? 'pointer-events-none' : ''}`}>
            <div className="flex items-center justify-between w-full pb-4">
                <span className="text-lg font-bold opacity-40">Find your friend</span>
                <AiOutlineClose onClick={() => { setAddFriendModal(false) }} className={`opacity-70`} size={20} />
            </div>
            <form onSubmit={onSubmit} action="#">
                <div className="flex items-center justify-between w-full pb-4">
                    <input onChange={(e) => { setUserId(e.target.value) }} disabled={processing} type="text" placeholder='Find your friend with ID' id="friendId" name='friendId' className="block p-4 h-full w-full rounded-l-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white" />
                    <button type="submit" disabled={processing} className={` bg-blue-600 hover:bg-blue-700 p-4 rounded-r-xl cursor-pointer sm:w-auto`}>
                        {processing ?
                            <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={24} />
                            :
                            'Find'
                        }
                    </button>
                </div>
            </form>
            {
                result ?
                    <>
                        {result.success ?
                            <>
                                <div className="w-full flex sm:flex-row flex-col border-t border-gray-700 pt-2">
                                    <div className="flex sm:flex-row flex-col items-center w-full h-full">
                                        <div className={`mr-2 mb-1 sm:mb-0 flex items-center rounded-full w-10 h-10 text-gray-900 justify-center font-bold text-2xl ${result.user.avatarColor}`}>
                                            {result.user.name && result.user.name[0].toUpperCase()}
                                        </div>
                                        <div className="w-full h-full mb-1 sm:mb-0">
                                            <p className={`text-center sm:text-left`}>{result.user.username}</p>
                                            <p className={`opacity-60 text-sm text-center sm:text-left`}>{result.user.name}</p>
                                        </div>
                                    </div>
                                    <div className="sm:w-auto w-full mx-auto h-full">
                                        {userData.friends && userData.friends.includes(userId) ?
                                            <button key='uniqueKey' onClick={(e) => {
                                                if (router.query.user === result.user.username) {
                                                    router.push('/')
                                                }
                                                onRemove(e, result.user._id)
                                            }} type="button" className={` bg-blue-600 hover:bg-blue-700 py-2 rounded-xl cursor-pointer px-2 sm:w-auto w-full`}>{adding ?
                                                <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={24} />
                                                :
                                                'Remove'
                                                }</button>
                                            :
                                            <button key='uniqueKey' onClick={(e) => { onAdd(e, result.user._id) }} type="button" className={` bg-blue-600 hover:bg-blue-700 py-2 rounded-xl cursor-pointer px-2 sm:w-auto w-full`}>{adding ?
                                                <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={24} />
                                                :
                                                'Add'
                                            }</button>
                                        }
                                    </div>
                                </div>
                            </>
                            :
                            <><div className={`text-center font-bold opacity-40`}>No user found with this id...</div></>
                        }</>
                    :
                    <>
                        <div className={`text-center font-bold opacity-40`}>Search your friend by ID...</div>
                    </>
            }
        </div>
    )
}

export default AddFriend