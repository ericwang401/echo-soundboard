import React, { useState } from 'react'
import NavigationLink from '@/components/NavigationLink'
import { useLocation } from 'react-router-dom'

const NavigationBar = () => {
  const location = useLocation()

  const links = [
    {name: 'Overview', to: '/'},
    {name: 'Settings', to: '/test'}
  ]

  return (
    <div className='bg-black border-neutral-800 border-b'>
      <div className='flex content'>
        {links.map(link => <NavigationLink key={link.name} name={link.name} to={link.to} active={location.pathname === link.to} />)}
      </div>
    </div>
  )
}

export default NavigationBar
