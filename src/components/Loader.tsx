import Image from "next/image";
import loader from "../public/src/logo-min.svg";
export default function Loading() {
  return (
    <>
      <div className="h-screen w-screen grid place-items-center">
        <Image height={40} width={40} src={loader} alt="Loader" />
      </div>
    </>
  );
}
