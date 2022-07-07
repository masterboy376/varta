import Image from 'next/image'
import { useRouter } from 'next/router'

const styles = {
  wrapper:'relative mb-4 block flex justify-center',
  roomAvatar:"before:content-[''] before:w-4 before:top-5 before:h-1/5 before:block before:bg-white before:rounded before:rounded-tl-none before:rounded-bl-none before:-left-3 before:absolute before:transition-all before:duration-200 before:ease-out before:hover:h-3/5 before:hover:top-2",
  roomAvatarImage:'w-12 h-12 bg-[#36393f] rounded-full mb-3 relative left-3 cursor-pointer flex justify-center transition-all duration-300 ease-in hover:rounded-2xl',
}

const RoomAvatar = ({ id, avatar, name }) => {
  const router = useRouter()

  const changeUrl = () => {
    router.push(`?channel=${id}&name=${name}`)
  }

  return (
    <div className={styles.wrapper} onClick={changeUrl}>
      <div className={styles.roomAvatar}>
        <Image
          src={avatar}
          className={styles.roomAvatarImage}
          height={48}
          width={48}
          alt={name}
        />
      </div>
    </div>
  )
}

export default RoomAvatar
