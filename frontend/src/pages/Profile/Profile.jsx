import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user,loading} = useSelector(
    (state) => state.user
  );
  console.log(user)
  return (
    <div>Profile</div>
  )
}

export default Profile