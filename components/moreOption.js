import React, { useContext } from 'react'
import { VartaContext } from '../context/context'
import { AiOutlineClose } from 'react-icons/ai'
import Image from 'next/image'
import personPlus from '../public/icons/person-plus.svg'
import video from '../public/icons/video.svg'
import inbox from '../public/icons/inbox.svg'
import phone from '../public/icons/phone.svg'
import help from '../public/icons/help.svg'
import pin from '../public/icons/pin.svg'
import ethLogo from '../public/eth.png'

const MoreOption = () => {
    const { isRightBar, setIsRightBar, logout } = useContext(VartaContext)
    const styles = {
        wrapper: `w-full transition-all duration-300 sm:w-1/4 bg-gray-900 ${isRightBar ? 'translate-x-0' : 'translate-x-full'} sm:hidden block fixed top-0 right-0 h-screen`,
        elementsContainer: 'flex items-center p-2 rounded-md sursor-pointer mb-2 mx-2 my-2 hover:bg-gray-800',
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

            <div className={styles.elementsContainer}>
                <div className={styles.svgContainer}>
                    <Image
                        height={25}
                        width={25}
                        src={phone}
                        className={styles.svg}
                        alt='phone'
                    />
                </div>
                <p>Phone</p>
            </div>
            <div className={styles.elementsContainer}>
                <div className={styles.svgContainer}>
                    <Image
                        height={25}
                        width={25}
                        src={video}
                        className={styles.svg}
                        alt='video'
                    />
                </div>
                <p>Video</p>
            </div>
            <div className={styles.elementsContainer}>
                <div className={styles.svgContainer}>
                    <Image
                        height={25}
                        width={25}
                        src={pin}
                        className={styles.svg}
                        alt='pinned message'
                    />
                </div>
                <p>Pinned message</p>
            </div>
            <div className={styles.elementsContainer}>
                <div className={styles.svgContainer}>
                    <Image
                        height={25}
                        width={25}
                        src={personPlus}
                        className={styles.svg}
                        alt='add friend'
                    />
                </div>
                <p>Add friend</p>
            </div>
            <button className={styles.blueButton} onClick={logout}>
                Log out
            </button>

        </div>
    )
}

export default MoreOption