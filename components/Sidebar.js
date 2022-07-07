// import styles from '../styles/sidebar.module.css'
import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import RoomAvatar from './RoomAvatar'
import SideOption from './sideOption'
import { VartaContext } from '../context/context'

const styles = {
  wrapper:'h-full bg-gray-900 border-r border-gray-700 overflow-y-scroll relative pt-2 flex-1 shadow',
}

const Sidebar = () => {
  const router = useRouter()
  const {channels, setChannels} = useContext(VartaContext)
  // const [channels, setChannels] = useState([])

  // useEffect(()=>{async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/getchannels`,
  //     )

  //     const data = await response.json()
  //     setChannels(data)
  //     console.log(channels)

  //     router.push(`?channel=${data[0].roomId}&name=${data[0].roomName}`)
  //     console.log(channels)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }}, [])

  return (
    <div className={styles.wrapper}>
      {/* {Array.from(channels).map((channel, index) => (
        <RoomAvatar
          key={index}
          id={channel.roomId}
          avatar={channel.avatar}
          name={channel.roomName}
        />
      ))} */}
      <RoomAvatar
          key={1}
          id={123456}
          avatar={"/avatar-2.png"}
          name={'Join'}
        />
      <RoomAvatar
          key={2}
          id={123456}
          avatar={"/avatar-2.png"}
          name={'Join'}
        />
      <RoomAvatar
          key={3}
          id={123456}
          avatar={"/avatar-2.png"}
          name={'Join'}
        />
      <RoomAvatar
          key={4}
          id={123456}
          avatar={"/avatar-2.png"}
          name={'Join'}
          />
          <SideOption/>
    </div>
  )
}

export default Sidebar
