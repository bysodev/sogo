import BgImage from "@/../public/images/hand.gif";
import Image from "next/image";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-full max-h-screen flex">
            <div className="w-2/5 lg xl:w-2/5 hidden lg:block">
                <Image
                    className="h-full w-full object-cover opacity-80"
                    src={BgImage}
                    alt="Logo de Google"
                />
            </div>
            <div className="w-full lg:w-3/5 grid place-items-center h-full m-auto bg-white-200 dark:bg-gray-900 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
