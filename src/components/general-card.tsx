import Image from "next/image";

const A = "/lesson/vocals/letra_A.jpg";
export const GeneralCard = () => {
  return (
    <div className="rounded border-gray-300 border-2 flex shadow-md m-2">
      <Image
        src={A}
        alt="Letra A"
        width={100}
        height={100}
        className="m-2 shadow w-auto"
      />
      <Image
        src={A}
        alt="Letra A"
        width={100}
        height={100}
        className="m-2 shadow w-auto"
      />
    </div>
  );
};
