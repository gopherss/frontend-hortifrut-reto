
interface Props {
  name: string;
  image: string;
  weight?: number;
}

const CardPokemon = ({ name, image, weight }: Props) => {
  return (
    <>
      <div className="card-pokemon">
      <img src={image} alt={name} />
      <div>
        <h5>{name}</h5>
        <span>{weight}</span>
      </div>
    </div>
    </>
  );
};

export default CardPokemon;
