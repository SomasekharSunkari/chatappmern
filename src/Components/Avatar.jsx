import React from 'react'

const Avatar = ({userId,username}) => {
    const id = parseInt(userId,16);
    const colors = ['bg-red-200','bg-yellow-200','bg-green-200','bg-blue-200','bg-orange-200','bg-pink-200']
    const index = id % colors.length;
    const color = colors[index]
  return (
    <div>
         <div className={'w-8 h-8  rounded-full text-center text-lg capitalize opacity-70 ' + color}>
              {username[0]
              }
              </div>
      
    </div>
  )
}

export default Avatar
