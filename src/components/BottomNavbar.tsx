import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BiSolidLogOut } from "react-icons/bi";
import { FaBookBookmark, FaGraduationCap, FaUser } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";

const BottomNavbar = () => {
    const menus = [
        { name: "Inicio", link: "/", icon: MdSpaceDashboard },
        { name: "Cuenta", link: "/profile", icon: FaUser },
        { name: "Aprendizaje", link: "/learn", icon: FaGraduationCap },
        { name: "Lecciones", link: "/lesson", icon: FaBookBookmark },
        { name: "Salir", link: "/", icon: BiSolidLogOut, logout: true },
    ];

    return (
        <div className="absolute min-h-screen lg:hidden">
            <div className="fixed bottom-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-5 mx-auto">

                    {menus?.map((menu, i) => (
                        <Link key={i} href={menu.link} {...(menu?.logout && {
                            onClick: () => {
                                signOut()
                            }
                        })} className="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                            {React.createElement(menu?.icon, { size: "20", className: "w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" })}
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{menu.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BottomNavbar;