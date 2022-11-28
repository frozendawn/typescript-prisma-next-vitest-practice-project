import Image from "next/image";

const Card: React.FC = () => {

  return (
    <div className="h-36 w-31 bg-white">
      <div className="flex flex-col items-center">
        <div className="h-31">
          <div className="h-full">
            <Image
              src="https://www.taiwangun.com/img/imagecache/12001-13000/8e9d8d580bda52125378aa25c28b09e207571e7e.webp"
              alt="aug img"
              height={360}
              width={310}
              className="h-full"
            />
          </div>
        </div>
        <div>JG0449A AU-2G [J.G.WORKS]</div>
        <div>185.14€</div>
      </div>
    </div>
  );
};

export default Card;
