import { Link } from 'react-router-dom'

interface NavigationLinkProps {
    name: string;
    active?: boolean;
    to: string;
}

const NavigationLink = (props: NavigationLinkProps) => {
    return (
        <Link to={props.to} className={`relative transition-colors hover:text-white text-neutral-500 ${props.active && 'nav-link-active'} px-4 py-3 text-sm nav-link`}>
            { props.name }
        </Link>
    )
}

export default NavigationLink