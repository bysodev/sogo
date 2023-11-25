import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BiSolidLogOut } from "react-icons/bi";
import { FaBookBookmark, FaGraduationCap, FaUser } from "react-icons/fa6";
import { HiXCircle } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import IconLogo from "./icons/IconLogo";

const SideNavbar: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({ isOpen, onToggle }) => {
    const menus = [
        { name: "Inicio", link: "/", icon: MdSpaceDashboard },
        { name: "Cuenta", link: "/", icon: FaUser },
        { name: "Aprendizaje", link: "/learn", icon: FaGraduationCap },
        { name: "Lecciones", link: "/lesson", icon: FaBookBookmark },
        { name: "Cerrar Sesión", link: "/", icon: BiSolidLogOut, logout: true },
    ];
    const handleToggle = () => {
        onToggle(); // Llama a la función de devolución de llamada del componente padre
    };

    return (
        <section
            className={`hidden lg:flex fixed flex-col gap-6 bg-gray-900 min-h-screen duration-300 text-gray-100 p-4 ${isOpen ? "w-52" : "w-16"}`}
        >
            <div className="py-6 gap-8 flex justify-center items-center">
                <div className={`flex items-center gap-2 duration-100 ${!isOpen && "opacity-0 translate-x-28 overflow-hidden"}`}>
                    <IconLogo width={30} height={30} />
                    <h1 className="whitespace-pre text-xl font-semibold">oGo Sign</h1>
                </div>
                <HiXCircle
                    size={26}
                    className={`cursor-pointer duration-300 ${!isOpen && "absolute rotate-[225deg]"}`}
                    onClick={() => handleToggle()}
                />
            </div>
            <div className="grid gap-4 lg:gap-8">
                {menus?.map((menu, i) => (
                    <Link
                        href={menu?.link}
                        key={i}
                        className={`${menu?.icon && "gap-3.5"} ${menu?.logout && "lg:mt-[calc(100vh-28rem)]"} flex items-center text-sm font-medium p-2 hover:bg-gray-800 rounded-md`}
                        {...(menu?.logout && {
                            onClick: () => {
                                signOut()
                            }
                        })}
                    >
                        <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                        <h2
                            style={{
                                transitionDelay: `${menu?.logout ? 0 : (100 + i * 50)}ms`,

                                // transitionDelay: `${300 + i * 50}ms`,
                            }}
                            className={`whitespace-pre duration-300 ${!isOpen && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                        >
                            {menu?.name}
                        </h2>
                        <h2
                            className={`${isOpen && "hidden"
                                } absolute left-20 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
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