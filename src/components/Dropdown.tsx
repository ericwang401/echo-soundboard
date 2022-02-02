import { ChevronDownIcon } from '@heroicons/react/outline'

export interface DropdownItem {
  value: string
  display: string
}

export interface DropdownProps {
  items: DropdownItem[]
  value?: string
  onChange: Function
  className?: string
}

const Dropdown = (props: DropdownProps) => {
  const callback = (...args: any) => {
    props.onChange(...args)
  }

  return (
    <div className='relative inline-block'>
      <div
        className={
          'absolute z-10 flex items-center justify-end px-2.5 inset-0 select-none pointer-events-none '
        }
      >
        <ChevronDownIcon className='w-3 h-3' />
      </div>
      <select
        onChange={(...args) => callback(...args)}
        value={props.value}
        className={
          'bg-black transition-colors border border-neutral-700 hover:border-neutral-300 text-sm outline-none rounded-md px-2.5 py-2  appearance-none ' +
          props.className
        }
      >
        {props.items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.display}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
