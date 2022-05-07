import styled, { css } from 'styled-components/macro'
import tw from 'twin.macro'

const StyledInput = styled.input`
    ${tw`bg-black transition-colors border border-neutral-700 hover:border-neutral-300 text-sm outline-none rounded-md px-2.5 py-2  appearance-none`}
`

type ComponentProps = Omit<JSX.IntrinsicElements['input'], 'ref'>

const Input = ({ children, ...props }: ComponentProps) => {
    return <StyledInput {...props}>{children}</StyledInput>
}

export default Input