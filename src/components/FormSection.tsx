import { ReactNode } from 'react'

interface FormSectionProps {
  form: ReactNode
  title: string
  actions?: ReactNode
}

const FormSection = (props: FormSectionProps) => {
  return (
    <div className='p-6 bg-black border-neutral-700 border rounded-md'>
        <h3 className='text-xl font-semibold'>{props.title}</h3>
      <div className='py-3 space-y-2'>{props.form}</div>
    </div>
  )
}

export default FormSection
