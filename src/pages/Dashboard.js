import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
import ChatbotWidget from '../components/common/ChatbotWidget'

const Dashboard = () => {
  return (
    <div className=" relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar/>
      <div className=" h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="bg-gray-200 mx-auto  py-10">
          <Outlet/>
        </div>
      </div>
      <ChatbotWidget/>
    </div>
  )
}

export default Dashboard
