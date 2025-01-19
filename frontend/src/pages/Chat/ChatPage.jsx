import React from 'react'
import Profile from '../../components/Profile'
import Sider from './components/Sider'
import { useSelector } from 'react-redux'

const ChatPage = () => {
  let {isVisible} = useSelector((state)=>state.profileVisibility)
  return (
    <div className='h-full flex'>
      <Sider />
      <div className='w-full bg-[#020617]'></div>
      {isVisible&&<Profile />}
    </div>
  )
}

export default ChatPage