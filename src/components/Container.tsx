import { ReactNode } from 'react'

export interface ContainerProps {
    children: ReactNode;
}

const Container = (props: ContainerProps) => {
    return (
        <div className="h-full w-full">
            { props.children }
        </div>
    )
}

export default Container