import { ReactNode } from 'react'

interface FormSectionProps {
    form: ReactNode;
    actions?: ReactNode;
}

const FormSection = (props: FormSectionProps) => {
    return (
        <div className="p-6 bg-black border-neutral-700 border rounded-md">
            { props.form }
        </div>
    )
}

export default FormSection