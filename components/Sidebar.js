import { useEffect, useState, useContext } from 'react'
import RoomAvatar from './RoomAvatar'
import SideOption from './sideOption'
import { VartaContext } from '../context/context'

const styles = {
  wrapper:'h-full bg-gray-900 border-r border-gray-700 overflow-y-scroll relative pt-2 flex-1 shadow',
}

const Sidebar = () => {
  const {router} = useContext(VartaContext)

  return (
    <div className={styles.wrapper}>
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
