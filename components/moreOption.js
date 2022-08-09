import React, { useContext } from 'react'
import { VartaContext } from '../context/context'
import { AiOutlineClose } from 'react-icons/ai'
import { FaUserCircle, FaUserPlus, FaPhoneVolume, FaVideo } from 'react-icons/fa'

const MoreOption = () => {
    const { isRightBar, setIsRightBar, logout, setAddFriendModal, setPhoneModal, setVideoModal, setUserModal, router } = useContext(VartaContext)
    const styles = {
        wrapper: `w-full transition-all duration-300 sm:w-1/4 bg-gray-900 ${isRightBar ? 'translate-x-0' : 'translate-x-full'} sm:hidden block fixed top-0 right-0 h-screen`,
        elementsContainer: 'flex items-center p-2 rounded-md cursor-pointer mb-2 mx-2 my-2 hover:bg-gray-800',
        svgContainer: 'mr-2',
        dmTitle: 'opacity-40 font-bold my-2',
        svg: 'w-6 invert opacity-60 cursor-pointer',
        icon: 'text-white opacity-60 cursor-pointer mr-2 flex items-center justify-center ml-2',
        moreHeader: 'flex items-centers justify-between border-b z-10 p-1 border-gray-700 shadow-2xl',
        blueButton: 'mx-auto w-1/2 bg-blue-600 hover:bg-blue-700 p-2 rounded-xl justify-evenly flex items-center'
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.moreHeader}>
                <div className={styles.dmTitle}>More Options</div>
                <div onClick={() => { setIsRightBar(false) }} className={styles.icon}>
                    <AiOutlineClose size={24} />
                </div>
            </div>
{router.query.user &&
<>
            <div onClick={() => { setPhoneModal(true) }} className={styles.elementsContainer}>
                <div className={styles.svgContainer}>
                <FaPhoneVolume size={25} className={`opacity-70 cursor-pointer`} />
                </div>
                <p>Phone</p>
            </div>
            <div onClick={() => { setVideoModal(true) }} className={styles.elementsContainer}>
                <div className={styles.svgContainer}>
                <FaVideo size={25} className={`opacity-70 cursor-pointer`} />
                </div>
                <p>Video</p>
            </div>
            </>}
            <div onClick={() => { setAddFriendModal(true) }} className={styles.elementsContainer}>
                <div className={styles.svgContainer}>
                <FaUserPlus size={25} className={`opacity-70 cursor-pointer`} />
                </div>
                <p>Add friend</p>
            </div>
            <div onClick={() => { setUserModal(true) }} className={styles.elementsContainer}>
                <div className={styles.svgContainer}>
                <FaUserCircle size={25} className={`opacity-70 cursor-pointer`} />
                </div>
                <p>Your profile</p>
            </div>
            <button className={styles.blueButton} onClick={logout}>
                Log out
            </button>

        </div>
    )
}

export default MoreOption