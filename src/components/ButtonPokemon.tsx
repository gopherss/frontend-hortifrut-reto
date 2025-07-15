import { type ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLElement>{
    label: string;
}

const ButtonPokemon = ({ label, ...props }: Props) => {
  return (
    <button {...props} className='btn-pokemon'>
        {label}
    </button>
  )
}

export default ButtonPokemon