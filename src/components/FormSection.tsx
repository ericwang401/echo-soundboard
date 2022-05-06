import { ReactNode } from 'react'

interface FormSectionProps {
  form: ReactNode
  title: string
  actions?: ReactNode
  removePadding?: boolean
  noTitle?: boolean
  classNames?: string
}

const FormSection = (props: FormSectionProps) => {
  return (
    <div className={`${props.removePadding ? '' : 'p-6'} relative bg-black border-neutral-700 border rounded-md`}>
      {!props.noTitle && <h3 className='text-xl font-semibold'>{props.title}</h3>}
      <div className={`${props.noTitle ? '' : 'py-3'} space-y-2`}>{props.form}</div>
    </div>
  )
}

export default FormSection
