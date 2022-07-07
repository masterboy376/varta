import React, { useContext } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoIosCompass } from 'react-icons/io'
import { VartaContext } from '../context/context'

const SideOption = () => {
    const { router } = useContext(VartaContext)
    const styles = {
        wrapper: 'relative mb-3 flex justify-center',
        roomAvatarImage: 'w-12 h-12 bg-gray-800 rounded-full mb-3 items-center transition-all ease-in-out duration-300 cursor-pointer flex justify-center hover:rounded-2xl hover:bg-green-500 text-green-500 hover:text-white opacity-70',
    }
    return (
        <>
        <div className={styles.wrapper} >
            <div onClick={()=>{router.push(`/?createChannel=true`)}} className={styles.roomAvatarImage}>
                <AiOutlinePlus size={24} />
            </div>
        </div>
        <div className={styles.wrapper} >
            <div className={styles.roomAvatarImage}>
                <IoIosCompass size={24} />
            </div>
        </div>
        </>
    )
}

export default SideOption