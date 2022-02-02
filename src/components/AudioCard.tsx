import { VolumeUpIcon, PlayIcon, DotsVerticalIcon } from '@heroicons/react/outline'

interface AudioCardProps {
  name: string
}

const AudioCard = (props: AudioCardProps) => {
  return (
    <div className='relative flex items-center bg-black border-neutral-800 border rounded-md p-4'>
      <div className='grid place-items-center absolute w-full h-full -ml-4 transition-opacity opacity-0 hover:opacity-100 bg-gray-800 rounded-md'>
        <div className='flex w-full'>
          <div className='flex-grow'></div>
          <div className='flex flex-grow-0 items-center'>
            <PlayIcon className='w-7 h-7' />{' '}
            <span className='ml-1.5'>Play</span>
          </div>
          <div className='flex justify-end flex-grow'>
              <button className="p-2 m-2 rounded-md transition-colors bg-transparent hover:bg-gray-900"><DotsVerticalIcon className="w-5" /></button>
          </div>
        </div>
      </div>
      <VolumeUpIcon className='w-5 h-5' />{' '}
      <p className='ml-1.5'>{props.name}</p>
    </div>
  )
}

export default AudioCard
