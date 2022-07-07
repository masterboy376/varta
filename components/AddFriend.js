import React, { useContext, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { VartaContext } from '../context/context'

const AddFriend = () => {
    const { router } = useContext(VartaContext)

    const [result, setResult] = useState()

    return (
        <div className="w-full p-4">
            <div className="flex items-center justify-between w-full pb-4">
                <span className="text-lg font-bold opacity-40">Find your friend</span>
                <AiOutlineClose onClick={() => { router.push('/') }} className={`opacity-70`} size={20} />
            </div>
            <div className="flex items-center justify-between w-full pb-4">
                <input type="text" placeholder='Find your friend with ID' id="large-input" className="block p-4 h-full w-full rounded-l-xl border sm:text-md outline-none hover:border-blue-600 bg-gray-800 border-gray-800 text-white" />
                <button className={` bg-blue-600 hover:bg-blue-700 p-4 rounded-r-xl cursor-pointer sm:w-auto  h-hull`}>
                    Find
                </button>
            </div>
            {
                result?
                <></>
                :
                <>
                    <div className={`text-center font-bold opacity-40`}>Search your friend by ID...</div>
                </>
            }
        </div>
    )
}

export default AddFriend