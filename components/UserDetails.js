import React, { useContext, useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineLoading3Quarters, AiFillCheckCircle } from 'react-icons/ai'
import { VartaContext } from '../context/context'
import Link from 'next/link'
import Modal from 'react-modal'
import FriendDetail from './FriendDetail'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(17 ,24, 39)',
        padding: 0,
        border: '1px solid rgb(55, 65, 81)',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '700px',
    },
    overlay: {
        backgroundColor: 'rgba(17, 24, 39, 0.5)',
    },
}

const UserDetails = () => {
    const { setUserModal, userData, updateUser, getUserByAuthToken, userFriends, loadingFriends, alertSuccess, verifyPassword } = useContext(VartaContext)

    const [processing, setProcessing] = useState(false)
    const [active, setActive] = useState(0)
    const [newData, setNewData] = useState({})
    const [hasChanged, setHasChanged] = useState(false)
    const [reveal, setReveal] = useState(false)
    const [verifyPasswordForChange, setVerifyPasswordForChange] = useState(false)
    const [verifyPasswordForReveal, setVerifyPasswordForReveal] = useState(false)
    const [password, setPassword] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [friends, setFriends] = useState([])

    const onChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
        setHasChanged(true)
    }

    const colorChange = (value) => {
        setNewData({ ...newData, ["avatarColor"]: value })
        setHasChanged(true)
    }

    const onCancel = () => {
        setNewData({ name: userData.name, username: userData.username, email: userData.email, avatarColor: userData.avatarColor })
        setHasChanged(false)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setVerifyPasswordForChange(false)
        setProcessing(true)
        await updateUser({ newUserData: newData, authToken: localStorage.getItem("authToken"), password })
        await getUserByAuthToken()
        setProcessing(false)
        setHasChanged(false)
    }

    const onReveal = async (e) => {
        e.preventDefault()
        const parsedData = await verifyPassword(password)
        if(parsedData.success){
            setVerifyPasswordForReveal(false)
            setReveal(true)
            setTimeout(() => {
                setReveal(false)
            }, 30000);
        }
    }

    const copyId = async () => {
        navigator.clipboard.writeText(userData._id)
        alertSuccess("Id copied to clip board")
    }

    useEffect(() => {
        setNewData({ name: userData.name, username: userData.username, email: userData.email, avatarColor: userData.avatarColor })
    }, [userData])

    useEffect(() => {
        setFriends([...userFriends])
    }, [userFriends])

    useEffect(() => {
        if (searchValue.length != 0) {
            let newFriendsArray = [...userFriends]
            for (let i = userFriends.length - 1; i >= 0; i--) {
                if (userFriends[i].name.toLowerCase().includes(searchValue.toLowerCase()) || userFriends[i].username.toLowerCase().includes(searchValue.toLowerCase())) {
                    continue
                }
                else {
                    newFriendsArray.splice(i, 1)
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
        <>
            <div className={`w-full max-w-4xl mx-auto ${processing ? 'pointer-events-none' : ''}`}>

                <div className="flex p-4 mb-6 items-center justify-between w-full pb-4 border-b border-gray-700 shadow-lg">
                    <div className="flex items-center">
                        <span onClick={() => { setActive(0) }} className={`sm:text-base text-sm cursor-pointer mr-4 sm:mr-6 hover:underline underline-offset-4 ${active === 0 ? 'text-blue-600' : ''}`}>Profile</span>
                        <span onClick={() => { setActive(1) }} className={`sm:text-base text-sm cursor-pointer mr-4 sm:mr-6 hover:underline underline-offset-4 ${active === 1 ? 'text-blue-600' : ''}`}>Friends</span>
                        {/* <span onClick={() => { setActive(2) }} className={`sm:text-base text-sm cursor-pointer mr-4 sm:mr-6 hover:underline underline-offset-4 ${active === 2 ? 'text-blue-600' : ''}`}>Channels</span> */}

                    </div>
                    <AiOutlineClose onClick={() => { setUserModal(false) }} className={`opacity-70`} size={20} />
                </div>

                {active === 0 && newData.avatarColor && <>

                    <div className="px-4 flex flex-col justify-between items-center w-full pb-2 space-y-3">

                        <div onClick={() => {
                            reveal ?
                                copyId()
                                :
                                setVerifyPasswordForReveal(true)
                        }}
                            className={`w-2/3 text-center cursor-pointer mx-auto text-white border-gray-800 hover:border-blue-600 bg-gray-800 rounded-lg border py-2 ${reveal ? 'font-bold' : ''}`}>
                            {reveal ? userData._id : 'Tap here to reveal your ID for 30 sec'}
                        </div>

                        <div className={`sm:w-64 sm:h-64 w-32 h-32 rounded-full flex items-center text-gray-900 justify-center font-bold text-9xl ${newData.avatarColor}`}>
                            {newData.name[0] ? newData.name[0].toUpperCase() : '-_-'}
                        </div>

                        <div className="flex overflow-x-scroll w-full scroller">
                            <div onClick={() => { colorChange('white') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer white ml-2 ${newData.avatarColor == 'white' ? 'flex items-center justify-center text-gray-700 border-4 border-gray-900' : ''}`}>{newData.avatarColor == 'white' ? <AiFillCheckCircle size={32} /> : ''}</div>
                            <div onClick={() => { colorChange('red') }} red={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer red ml-2 ${newData.avatarColor == 'red' ? 'flex items-center justify-center text-gray-700 border-4 border-gray-900' : ''}`}>{newData.avatarColor == 'red' ? <AiFillCheckCircle size={32} /> : ''}</div>
                            <div onClick={() => { colorChange('green') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer green ml-2 ${newData.avatarColor == 'green' ? 'flex items-center justify-center text-gray-700 border-4 border-gray-900' : ''}`}>{newData.avatarColor == 'green' ? <AiFillCheckCircle size={32} /> : ''}</div>
                            <div onClick={() => { colorChange('yellow') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer yellow ml-2 ${newData.avatarColor == 'yellow' ? 'flex items-center justify-center text-gray-700 border-4 border-gray-900' : ''}`}>{newData.avatarColor == 'yellow' ? <AiFillCheckCircle size={32} /> : ''}</div>
                            <div onClick={() => { colorChange('orange') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer orange ml-2 ${newData.avatarColor == 'orange' ? 'flex items-center justify-center text-gray-700 border-4 border-gray-900' : ''}`}>{newData.avatarColor == 'orange' ? <AiFillCheckCircle size={32} /> : ''}</div>
                            <div onClick={() => { colorChange('purple') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer purple ml-2 ${newData.avatarColor == 'purple' ? 'flex items-center justify-center text-gray-700 border-4 border-gray-900' : ''}`}>{newData.avatarColor == 'purple' ? <AiFillCheckCircle size={32} /> : ''}</div>
                            <div onClick={() => { colorChange('pink') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer pink ml-2 ${newData.avatarColor == 'pink' ? 'flex items-center justify-center text-gray-700 border-4 border-gray-900' : ''}`}>{newData.avatarColor == 'pink' ? <AiFillCheckCircle size={32} /> : ''}</div>
                            <div onClick={() => { colorChange('blue') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer blue ml-2 ${newData.avatarColor == 'blue' ? 'flex items-center justify-center text-gray-700 border-4 border-gray-900' : ''}`}>{newData.avatarColor == 'blue' ? <AiFillCheckCircle size={32} /> : ''}</div>
                            <div onClick={() => { colorChange('black') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer black ml-2 ${newData.avatarColor == 'black' ? 'flex items-center justify-center text-gray-700 border-4 border-gray-900' : ''}`}>{newData.avatarColor == 'black' ? <AiFillCheckCircle size={32} /> : ''}</div>
                        </div>

                        <input required disabled={processing} value={newData.name} onChange={onChange} type="text" placeholder='Name' id="name" name='name' className="block p-2 h-full w-full rounded-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white" />

                        <input required disabled={processing} value={newData.username} onChange={onChange} placeholder='Username' name="username" id="username" className="block p-2 h-full w-full rounded-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white" />

                        <input required disabled={processing} value={newData.email} onChange={onChange} placeholder='Email' name="email" id="email" className="block p-2 h-full w-full rounded-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white" />

                        <div className="flex w-full justify-between">
                            <>
                                <Link href={'/sendLink'}><a disabled={processing} className={`w-auto text-sm rounded-xl cursor-pointer font-medium hover:text-blue-700 text-blue-600 hover:underline underline-offset-4`}>
                                    {
                                        'Change password'
                                    }
                                </a></Link>
                            </>
                            <div>
                                <button disabled={!hasChanged} onClick={onCancel} type='button' className={`bg-gray-600 ${hasChanged ? 'hover:bg-gray-700' : 'opacity-70 cursor-not-allowed'} p-2 w-auto rounded-xl sm:mr-4 mr-2`}>
                                    {
                                        'Cancel'
                                    }
                                </button>
                                <button disabled={!hasChanged} type='button' onClick={() => { setVerifyPasswordForChange(true) }} className={`bg-blue-600 ${hasChanged ? ' hover:bg-blue-700' : 'opacity-70 cursor-not-allowed'} p-2 w-auto rounded-xl`}>
                                    {processing ?
                                        <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={20} />
                                        :
                                        'Save'
                                    }
                                </button>
                            </div>
                        </div>

                    </div>
                    <Modal isOpen={verifyPasswordForReveal} onRequestClose={() => { setVerifyPasswordForReveal(false) }} style={customStyles}>
                        <div className={`w-full p-4`}>
                            <div className="flex items-center justify-between w-full pb-4">
                                <span className="text-lg font-bold opacity-40">Verify your password</span>
                                <AiOutlineClose onClick={() => { setVerifyPasswordForReveal(false) }} className={`opacity-70`} size={20} />
                            </div>
                            <form onSubmit={onReveal} action="#">
                                <div className="flex items-center justify-between w-full pb-4">
                                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Your password' id="password" name='password' className="block p-4 h-full w-full rounded-l-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white" />
                                    <button type="submit" className={` bg-blue-600 hover:bg-blue-700 p-4 rounded-r-xl cursor-pointer sm:w-auto`}>
                                        {processing ?
                                            <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={24} />
                                            :
                                            'Ok'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>

                    <Modal isOpen={verifyPasswordForChange} onRequestClose={() => { setVerifyPasswordForChange(false) }} style={customStyles}>
                        <div className={`w-full p-4`}>
                            <div className="flex items-center justify-between w-full pb-4">
                                <span className="text-lg font-bold opacity-40">Verify your password</span>
                                <AiOutlineClose onClick={() => { setVerifyPasswordForChange(false) }} className={`opacity-70`} size={20} />
                            </div>
                            <form onSubmit={onSubmit} action="#">
                                <div className="flex items-center justify-between w-full pb-4">
                                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Your password' id="password" name='password' className="block p-4 h-full w-full rounded-l-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white" />
                                    <button type="submit" className={` bg-blue-600 hover:bg-blue-700 p-4 rounded-r-xl cursor-pointer sm:w-auto`}>
                                        {processing ?
                                            <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={24} />
                                            :
                                            'Ok'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </>}

                {active == 1 && userFriends && <>
                    <input onChange={(e) => { setSearchValue(e.target.value) }} className={`w-full bg-gray-800 hover:border-blue-600 border border-gray-800 rounded-xl outline-none p-2 resize-none text-white`} placeholder='Search your friend...' />
                    {
                        friends.length > 0 ?
                            friends.map((item) => {
                                return <FriendDetail key={item.username} name={item.name} username={item.username} avatarColor={item.avatarColor} email={item.email} id={item._id} />
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
                </>}

                {/* {active == 2 && userChannels && <>
                </>} */}

            </div>

        </>
    )
}

export default UserDetails