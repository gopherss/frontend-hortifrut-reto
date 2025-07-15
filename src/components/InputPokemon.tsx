import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLElement> {}

const InputPokemon = ({...rest}: Props) => {
  return <input {...rest} className="input-pokemon"/>;
};

export default InputPokemon;
