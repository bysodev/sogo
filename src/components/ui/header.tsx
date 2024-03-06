'use client'
import Logo from "@/components/icons/logo";
import useScreenSize from '@/utilities/useScreenSize';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";

export default function NavBar({ toggleDarkMode, theme }: any) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [navbar, setNavbar] = useState(false);
  const [top, setTop] = useState(false);
  const isMdScreen = useScreenSize('md');

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }

  useEffect(() => {
    if (navbar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [navbar]);

  useEffect(() => {
    setNavbar(false);
  }, [pathname]);

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  useEffect(() => {
    if (isMdScreen) {
      setNavbar(false);
    }
  }, [isMdScreen]);

  return (
    pathname === '' || pathname === '/' && (
      <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg dark:bg-black/80' : ''}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 relative">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center justify-between md:block">
              <Link href={"/"} className="flex items-center relatieve gap-1 text-gray-800 dark:text-gray-200">
                <Logo />
                <span className="self-center text-xs font-bold leading-none">
                  Lengua de <br /> Señas <br /> Ecuatoriana
                </span>
              </Link>
            </div>
            <div
              className={`flex-1 justify-self-center md:block md:pb-0 md:mt-0 ${navbar
                ? "absolute start-0 bg-white w-full -z-10 top-0 justify-around flex flex-col dark:bg-gray-800 md:bg-transparent dark:md:bg-transparent px-16 py-20 text-center h-[100dvh]"
                : "hidden"
                }`}
            >

              <ul className="text-gray-800 dark:text-white items-center justify-center space-y-4 md:flex md:space-x-6 md:space-y-0 font-medium text-sm lg:text-base">
                <li>
                  <a className="hover:text-purple-600 dark:hover:text-purple-400" onClick={() => setNavbar(false)} href="#features">
                    Características
                  </a>
                </li>
                <li>
                  <a className="hover:text-purple-600 dark:hover:text-purple-400" onClick={() => setNavbar(false)} href="#about">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a className="hover:text-purple-600 dark:hover:text-purple-400" onClick={() => setNavbar(false)} href="#contact">
                    Contacto
                  </a>
                </li>
                <li>
                  <a className="hover:text-purple-600 dark:hover:text-purple-400" onClick={() => setNavbar(false)} href="#faq">
                    F.A.Q
                  </a>
                </li>
              </ul>
              <div className="text-gray-800 dark:text-white font-medium w-full mt-3 flex flex-col justify-center gap-2 sm:gap-4 md:hidden p-4 rounded text-center">
                <div className="absolute bottom-10 left-10 border-gray-950 dark:border-white focus:text-dark dark:focus:text-white border-2 p-2 rounded-md block md:hidden">
                  <BsFillMoonStarsFill
                    onClick={toggleDarkMode}
                    className="hover:text-purple-600  cursor-pointer"
                  />
                </div>
                {status === 'authenticated' ? (
                  <>
                    {/* <div className="whitespace-nowrap font-semibold"><span className="hidden xl:inline font-normal">Bienvenido,</span> {session.user.name}</div> */}
                    <Link
                      className="text-gray-800 hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                      href={'/learn'}
                      rel="preload"
                    >
                      <h2 className="text-lg whitespace-pre duration-100 leading-none">
                        Ingresar
                      </h2>
                    </Link>
                    <Link
                      onClick={
                        () => {
                          signOut()
                        }
                      }
                      href={'/'}
                      className="btn-sm text-white bg-gray-900 hover:bg-gray-950 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                      Cerrar Sesión
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className="text-gray-800 border-2 border-gray-950 hover:text-purple-600 dark:text-white dark:border-white dark:hover:text-purple-400 rounded-full p-2 sm:flex-1 w-full"
                      href={`auth/login`}
                      rel="preload"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href={'auth/register'}
                      className="btn-sm text-white bg-gray-900 hover:bg-gray-950 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                      aria-current="page"
                    >
                      Unirse
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="font-medium hidden gap-4 dark:text-white md:flex items-center">
              {status === 'authenticated' ? (
                <>
                  {/* <div className="whitespace-nowrap font-semibold"><span className="hidden xl:inline font-normal">Bienvenido,</span> {session.user.name}</div> */}
                  <Link
                    className="text-gray-800 hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                    href={'/learn'}
                    rel="preload"
                  >
                    <h2 className="text-lg whitespace-pre duration-100 leading-none">
                      Ingresar
                    </h2>
                  </Link>
                  <Link
                    onClick={
                      () => {
                        signOut()
                      }
                    }
                    href={'/'}
                    className="btn-sm text-white bg-gray-900 hover:bg-gray-950 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                    Cerrar Sesión
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="text-gray-800 hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                    href={`auth/login`}
                    rel="preload"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    className="btn-sm text-white bg-gray-900 hover:bg-gray-950 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                    href={`auth/register`}
                    rel="preload"
                  >
                    Unirse
                  </Link>
                </>
              )}
              <span className="hidden md:inline">
                {
                  theme === "light" ?
                    (<BsSunFill
                      onClick={toggleDarkMode}
                      className="cursor-pointer"
                    />)
                    :
                    (<BsFillMoonStarsFill
                      onClick={toggleDarkMode}
                      className="cursor-pointer"
                    />)
                }
              </span>
            </div>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-800 dark:text-white rounded-md outline-none  focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-6 sm:h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-6 sm:h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
}
