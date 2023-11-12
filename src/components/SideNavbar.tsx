import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { BiSolidLogOut } from "react-icons/bi";
import { FaBookBookmark, FaGraduationCap, FaUser } from "react-icons/fa6";
import { HiXCircle } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import IconLogo from "./icons/IconLogo";

const SideNavbar = () => {
    const menus = [
        { name: "Dashboard", link: "/", icon: MdSpaceDashboard },
        { name: "Cuenta", link: "/", icon: FaUser },
        { name: "Aprendizaje", link: "/learn", icon: FaGraduationCap },
        { name: "Lecciones", link: "/lesson", icon: FaBookBookmark },
        { name: "Cerrar Sesión", link: "/", icon: BiSolidLogOut, logout: true },
    ];
    const [open, setOpen] = useState(true);
    return (
        <section
            className={`fixed bg-gray-900 min-h-screen ${open ? "w-52" : "w-16"
                } duration-300 text-gray-100 px-4`}
        >
            <div className="py-6 gap-8 flex justify-center items-center">
                <div className={`flex items-center gap-2 duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                    <IconLogo width={30} height={30} />
                    <h1 className="whitespace-pre text-xl font-semibold">oGo Sign</h1>
                </div>
                <HiXCircle
                    size={26}
                    className={`cursor-pointer duration-300 ${!open && "absolute rotate-[225deg]"}`}
                    onClick={() => setOpen(!open)}
                />
            </div>
            <div className="mt-4 flex flex-col gap-4 relative">
                {menus?.map((menu, i) => (
                    <Link
                        href={menu?.link}
                        key={i}
                        className={`${menu?.icon && "mt-5"
                            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                        {...(menu?.logout && {
                            onClick: () => {
                                signOut()
                            }
                        })}
                    >
                        <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                        <h2
                            style={{
                                transitionDelay: `${300 + i * 50}ms`,
                            }}
                            className={`whitespace-pre duration-300 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                        >
                            {menu?.name}
                        </h2>
                        <h2
                            className={`${open && "hidden"
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