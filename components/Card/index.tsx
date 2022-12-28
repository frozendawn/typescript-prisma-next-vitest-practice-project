import Image from "next/image";
import type { shopItem } from "../../types/shopItem";

interface Props {
  item: shopItem
}

const Card: React.FC<Props> = ({item}) => {

  const { name, description, imageUrl, price } = item

  return (
    <div className="h-36 w-31 bg-white">
      <div className="flex flex-col items-center">
        <div className="h-31">
          <div className="h-full">
            <Image
              src={imageUrl}
              alt={description}
              height={360}
              width={310}
              className="h-full"
            />
          </div>
        </div>
        <div>{name}</div>
        <div>{price}</div>
      </div>
    </div>
  );
};

export default Card;
