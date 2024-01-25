import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { BiSolidLogOut } from "react-icons/bi";
import { FaBookBookmark, FaGraduationCap, FaUser } from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import IconLogo from "./icons/logo";

interface Menu {
    name: string;
    link: string;
    icon: React.ElementType;
    logout?: boolean;
}

const SideNavbar: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({ isOpen, onToggle }) => {
    const pathname = usePathname()
    const [currentPath, setCurrentPath] = useState<string>("");

    useEffect(() => {
        setCurrentPath(pathname);
    }, [pathname]);

    const menus: Menu[] = [
        { name: "Aprendizaje", link: "/learn", icon: FaGraduationCap },
        { name: "Lecciones", link: "/lesson", icon: FaBookBookmark },
        { name: "Retos", link: "#", icon: MdSpaceDashboard },
        { name: "Perfil", link: "/profile", icon: FaUser },
        { name: "Cerrar Sesión", link: "/", icon: BiSolidLogOut, logout: true },
    ];

    const handleToggle = () => {
        onToggle();
    };

    return (
        <section
            className={`hidden lg:flex fixed flex-col gap-6 dark:bg-gray-900 min-h-screen duration-300 border-r-4 dark:text-gray-100 p-6 overflow-hidden ${isOpen ? "w-72" : "w-24"
                }`}
        >
            <div className={`gap-4 flex border-b-2 pb-4 ${isOpen ? "justify-between" : "justify-center"} items-center`}>
                <Link href={"/"} className={`flex items-center duration-100 ${!isOpen && "opacity-0 translate-x-28 overflow-hidden"}`}>
                    <IconLogo width={30} height={30} />
                    <h1 className="whitespace-pre text-3xl font-bold mt-2 tracking-wider">oGo Sign</h1>
                </Link>
                <HiX
                    size={26}
                    className={`cursor-pointer duration-300 ${!isOpen && "absolute rotate-[225deg]"}`}
                    onClick={() => handleToggle()}
                />
            </div>
            <div className="grid gap-5 nav-link">
                {menus?.map((menu, i) => (
                    <Link
                        href={menu?.link}
                        key={i}
                        className={`
                            } ${menu?.icon && "gap-3.5"} ${menu?.logout && "lg:mt-[calc(100vh-30rem)]"
                            }  flex items-center text-sm font-semibold p-3 hover:bg-gray-200 rounded-xl ${currentPath === menu?.link ? "active" : ""
                            }`}
                        {...(menu?.logout && {
                            onClick: () => {
                                signOut();
                            },
                        })}
                    >
                        <div>{React.createElement(menu?.icon, { size: "25" })}</div>
                        <h2
                            style={{
                                display: !isOpen ? "none" : "block",
                            }}
                            className="text-lg whitespace-pre duration-300 leading-none"
                        >
                            {menu?.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default SideNavbar;