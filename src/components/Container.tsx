import { ReactNode } from 'react'

export interface ContainerProps {
    children: ReactNode;
    className?: string;
}

const Container = (props: ContainerProps) => {
    return (
        <div className={`h-full w-full overflow-auto ${props.className}`}>
            { props.children }
        </div>
    )
}

export default Container