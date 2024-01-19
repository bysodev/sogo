import BgImage from "@/../public/images/hand.gif";
import Image from "next/image";

export const metadata = {
    description: "Plataforma de aprendizaje de Lengua de Señas Ecuatoriana",
    generator: "Next.js",
    applicationName: "Sogo Sign",
    referrer: "origin-when-cross-origin",
    keywords: [
        "plataforma",
        "aprendizaje",
        "lengua de señas",
        "lengua de ecuatoriana",
        "LSE",
    ],
    authors: [
        { name: "Anthony", url: "https://github.com/Anthonymgd" },
        { name: "Bryan", url: "https://github.com/bysodev" },
    ],
    icons: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            url: '/src/favicon.svg',
            media: '(prefers-color-scheme: light)',
        },
        {
            rel: 'icon',
            type: 'image/png',
            url: '/src/favicon-dark.svg',
            media: '(prefers-color-scheme: dark)',
        },
    ],
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

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
