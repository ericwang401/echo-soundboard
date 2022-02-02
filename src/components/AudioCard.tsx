import { VolumeUpIcon, PlayIcon, DotsVerticalIcon } from '@heroicons/react/outline'

interface AudioCardProps {
  name: string
}

const AudioCard = (props: AudioCardProps) => {
  return (
    <div className='relative flex items-center bg-black border-neutral-700 border rounded-md p-4 overflow-hidden whitespace-nowrap'>
      <div className='grid place-items-center absolute w-full h-full -ml-4 transition-opacity opacity-0 hover:opacity-100 bg-gray-800 rounded-md'>
        <div className="absolute cursor-pointer inset-0 pointe opacity-0" onClick={() => alert('test')}></div>
        <div className='grid grid-cols-3 w-full'>
          <div className='col-start-2 flex justify-center items-center'>
            <PlayIcon className='w-7 h-7' />
            <span className='ml-1.5'>Play</span>
          </div>
          <div className='col-start-3 flex justify-end'>
              <button className="p-2 z-10 m-2  ml-0 rounded-md transition-colors bg-transparent hover:bg-gray-900"><DotsVerticalIcon className="w-5" /></button>
          </div>
        </div>
      </div>
      <VolumeUpIcon className='w-5 h-5 flex-shrink-0' />
      <p className='ml-1.5 flex-shrink break-words overflow-ellipsis overflow-hidden'>{props.name}</p>
    </div>
  )
}

export default AudioCard
