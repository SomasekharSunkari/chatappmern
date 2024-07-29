import React, { useEffect, useState } from 'react'

const Chart = () => {
  const [ws,setWs]  = useState(null);
  const [onlinePeople,setOnlinePeople] = useState({})
  useEffect(()=>{

    const ws1 = new WebSocket("ws://localhost:4040")
    setWs(ws1)
  ws1.addEventListener("message",handelmessage);

  },[])
  const showOnlinepeople = (data) => {
    const peo = {};

    data.forEach(({username,userId}) => 
      peo[userId] = username
    )
    setOnlinePeople(peo)
    
  }
  const handelmessage = (ev)=>{
    const data = JSON.parse(ev.data)
    if('online' in data){
      showOnlinepeople(data.online)
    }
  }
  return (
    <div className='flex h-screen'>
      <div className='bg-white w-1/3 mt-2'>
      <div className='pl-4 pt-4 text-blue-500 font-bold text-2xl flex gap-2 items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
</svg>

        Mernchat</div>
         {Object.keys(onlinePeople).map(userId => (
          <div key={onlinePeople[userId]} className='pl-4 pt-4 pb-2 border-b-2 border-gray-100 '>
            {onlinePeople[userId]}
            </div>
         )) }
      </div>
      <div className='bg-blue-50 w-2/3 px-4 flex flex-col  py-6'>
        <div className='flex-grow'>Messageing place where msgs are  displayed</div>
        <div className='flex gap-2'>
          <input type="text"placeholder='Enter you message' className='flex-grow p-2 rounded-sm focus:outline-none'/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 p-2 rounded-sm hover:cursor-pointer bg-blue-400 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

        </div>

      </div>
    </div>
  )
}

export default Chart
