import React, { useContext, useState } from 'react'
import { AiOutlineClose, AiFillCheckCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { VartaContext } from '../context/context'

const NewChannel = () => {
    const { router, createChannel, addMember } = useContext(VartaContext)

    const [mode, setMode] = useState(1)
    const [selectedColor, setSelectedColor] = useState('white')
    const [processing, setProcessing] = useState(false)
    const [credentials, setCredentials] = useState({ name: '', description: '' })
    const [inviteKey, setInviteKey] = useState('')

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        if (mode == 1) {
            await addMember({inviteKey, authToken:localStorage.getItem("authToken")})
        }
        else if (mode == 2) {
            await createChannel({name:credentials.name, description:credentials.description , avatarColor:selectedColor, authToken:localStorage.getItem("authToken")})
        }
        setProcessing(false)
    }

    return (
        <>
            <div className={`flex items-center justify-between w-full ${processing ? 'pointer-events-none' : ''}`}>
                <button onClick={() => {
                    setMode(1)
                }} className={`w-1/2 text-sm py-4 sm:text-base ${mode === 1 ? 'bg-gray-900' : 'bg-gray-800 hover:drop-shadow-2xl'} text-center font-bold`}>Join channel</button>
                <button onClick={() => {
                    setMode(2)
                }} className={`w-1/2 text-sm py-4 sm:text-base ${mode === 2 ? 'bg-gray-900' : 'bg-gray-800 hover:drop-shadow-2xl'} text-center font-bold`}>Create channel</button>
            </div>
            <div className="w-full p-4">
                <div className="flex items-center justify-between w-full pb-4">
                    <span className="texxt-base sm:text-lg font-bold opacity-40">{mode === 1 ? 'Join channel' : 'Create channel'}</span>
                    <AiOutlineClose onClick={() => { router.push('/') }} className={`opacity-70`} size={32} />
                </div>
                {
                    mode === 1 &&
                    <>
                        <form onSubmit={onSubmit} action="#">
                            <div className="flex items-center justify-between w-full pb-2">
                                <input disabled={processing} onChange={(e) => { setInviteKey(e.target.value) }} type="text" placeholder='Enter invite key to the channel' id="inviteKey" name='inviteKey' className="block p-4 h-full w-full rounded-l-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white" />
                                <button disabled={processing} type='submit' className={` bg-blue-600 hover:bg-blue-700 p-4 rounded-r-xl cursor-pointer sm:w-auto`}>
                                {processing ?
                                        <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={24} />
                                        :
                                        'Join'
                                    }
                                </button>
                            </div>
                        </form>
                    </>
                }
                {
                    mode === 2 &&
                    <>
                        <form onSubmit={onSubmit} action="#">
                            <div className="flex flex-col justify-between w-full pb-2 space-y-3">
                                <input required disabled={processing} onChange={onChange} type="text" placeholder='Channel name' id="name" name='name' className="block p-2 h-full w-full rounded-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white" />

                                <textarea required minLength={10} disabled={processing} onChange={onChange} placeholder='channel description' name="description" id="description" cols="" rows="" className="block p-2 h-full w-full rounded-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white"></textarea>

                                <p className="text-base font-semibold opacity-40 ">Choose logo</p>
                                <div className="flex overflow-x-scroll min-w-full scroller">
                                    <div onClick={() => { setSelectedColor('white') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer white ml-2 ${selectedColor == 'white' ? 'flex items-center justify-center text-gray-900 bg-opacity-40' : ''}`}>{selectedColor == 'white' ? <AiFillCheckCircle size={32} /> : ''}</div>
                                    <div onClick={() => { setSelectedColor('red') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer red ml-2 ${selectedColor == 'red' ? 'flex items-center justify-center text-white bg-opacity-40' : ''}`}>{selectedColor == 'red' ? <AiFillCheckCircle size={32} /> : ''}</div>
                                    <div onClick={() => { setSelectedColor('green') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer green ml-2 ${selectedColor == 'green' ? 'flex items-center justify-center text-gray-900 bg-opacity-40' : ''}`}>{selectedColor == 'green' ? <AiFillCheckCircle size={32} /> : ''}</div>
                                    <div onClick={() => { setSelectedColor('yellow') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer yellow ml-2 ${selectedColor == 'yellow' ? 'flex items-center justify-center text-gray-900 bg-opacity-40' : ''}`}>{selectedColor == 'yellow' ? <AiFillCheckCircle size={32} /> : ''}</div>
                                    <div onClick={() => { setSelectedColor('orange') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer orange ml-2 ${selectedColor == 'orange' ? 'flex items-center justify-center text-gray-900 bg-opacity-40' : ''}`}>{selectedColor == 'orange' ? <AiFillCheckCircle size={32} /> : ''}</div>
                                    <div onClick={() => { setSelectedColor('purple') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer purple ml-2 ${selectedColor == 'purple' ? 'flex items-center justify-center text-gray-900 bg-opacity-40' : ''}`}>{selectedColor == 'purple' ? <AiFillCheckCircle size={32} /> : ''}</div>
                                    <div onClick={() => { setSelectedColor('pink') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer pink ml-2 ${selectedColor == 'pink' ? 'flex items-center justify-center text-gray-900 bg-opacity-40' : ''}`}>{selectedColor == 'pink' ? <AiFillCheckCircle size={32} /> : ''}</div>
                                    <div onClick={() => { setSelectedColor('blue') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer blue ml-2 ${selectedColor == 'blue' ? 'flex items-center justify-center text-gray-900 bg-opacity-40' : ''}`}>{selectedColor == 'blue' ? <AiFillCheckCircle size={32} /> : ''}</div>
                                    <div onClick={() => { setSelectedColor('black') }} style={{ 'minWidth': "50px", 'minHeight': "50px", 'maxWidth': "64px", 'maxHeight': "64px" }} className={`rounded-full cursor-pointer black ml-2 ${selectedColor == 'black' ? 'flex items-center justify-center text-white bg-opacity-40' : ''}`}>{selectedColor == 'black' ? <AiFillCheckCircle size={32} /> : ''}</div>
                                </div>

                                <button disabled={processing} type='submit' className={`bg-blue-600 hover:bg-blue-700 p-2 w-full rounded-xl cursor-pointer`}>
                                    {processing ?
                                        <AiOutlineLoading3Quarters className='animate-spin mx-auto' size={24} />
                                        :
                                        'Create'
                                    }
                                </button>
                            </div>
                        </form>
                    </>
                }
            </div>
        </>
    )
}

export default NewChannel