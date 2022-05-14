import NavigationLink from '@/components/NavigationLink'
import { useLocation } from 'react-router-dom'
import { mascot } from '@/util/helpers/version'

const NavigationBar = () => {
  const location = useLocation()

  const links = [
    { name: 'Overview', to: '/' },
    { name: 'Settings', to: '/settings' },
  ]

  return (
    <>
      <div className='fixed w-full bg-neutral-900 z-[10000] h-[30px] dragging-enabled'>
        <div className='content py-1'>
          <h3>Echo (Version {mascot.name})</h3>
        </div>
      </div>
      <div className='h-[30px]'></div>
      <div className='bg-black  border-neutral-700 border-b'>
        <div className='-ml-[16px]'>
          <div className='flex content'>
            {links.map((link) => (
              <NavigationLink
                key={link.name}
                name={link.name}
                to={link.to}
                active={location.pathname === link.to}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavigationBar
