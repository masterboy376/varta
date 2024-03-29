import Head from 'next/head'
import SideBar from '../components/Sidebar'
import ConversationList from '../components/ConversationList'
import ChatView from '../components/ChatView'
import React, { useContext, useEffect } from 'react'
import { VartaContext } from '../context/context'
import MoreOption from '../components/moreOption'
import Modal from 'react-modal'
import AddFriend from '../components/AddFriend'
import UserDetails from '../components/UserDetails'
// import NewChannel from '../components/NewChannel'


export default function Home() {
  const { isLeftBar, isLoggedin, addFriendModal, setAddFriendModal, userModal, setUserModal, setPhoneModal, setVideoModal, phoneModal, videoModal } = useContext(VartaContext)
  const styles = {
    wrapper: 'h-screen flex items-start w-screen overflow-hidden',
    main: 'fixed top-0 right-0 w-full sm:w-4/5 h-full',
    side: `w-full sm:w-1/5 transition-all duration-300 ease-in-out z-50 sm:z-0 ${isLeftBar ? '-translate-x-0' : '-translate-x-full'} sm:-translate-x-0 h-full flex items-start`,
  }
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
      width:'90%',
      maxWidth:'700px',
    },
    overlay: {
      backgroundColor: 'rgba(17, 24, 39, 0.5)',
    },
  }
  const customStyles1 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgb(17 ,24, 39)',
      padding: 0,
      border: '1px solid rgb(55, 65, 81)',
      width:'100%',
      height:'100vh'
    },
    overlay: {
      backgroundColor: 'rgba(17, 24, 39, 0.5)',
    },
  }

  return (
    <>
      <Head>
        <title>Varta</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icons/discord.svg" />
      </Head>

      <div className={styles.wrapper}>
        {isLoggedin &&
          <>
            <div className={styles.side}>
              {/* <SideBar /> */}
              <ConversationList />
            </div>
            <div className={styles.main}>
              <ChatView />
            </div>
            <MoreOption />
            <Modal isOpen={addFriendModal} onRequestClose={()=>{setAddFriendModal(false)}} style={customStyles}>
              <AddFriend/>
            </Modal>
            {/* <Modal isOpen={router.query.createChannel} onRequestClose={()=>{router.push('/')}} style={customStyles}>
              <NewChannel/>
            </Modal> */}
            <Modal isOpen={phoneModal} onRequestClose={()=>{setPhoneModal(false)}} style={customStyles}>
              <div>Phone</div>
            </Modal>
            <Modal isOpen={videoModal} onRequestClose={()=>{setVideoModal(false)}} style={customStyles}>
              <div>video</div>
            </Modal>
            <Modal isOpen={userModal} onRequestClose={()=>{setUserModal(false)}} style={customStyles1}>
              <UserDetails/>
            </Modal>
          </>
        }
      </div>
    </>
  )
}