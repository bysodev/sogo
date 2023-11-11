import { useEffect, useState } from "react";
// import { BsFillMoonStarsFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
const logo = "/src/logo-min.svg";
export default function NavBar({ toggleDarkMode }: any) {
  const [navbar, setNavbar] = useState(false);

  const [small, setSmall] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 50)
      );
    }
  }, []);

  return (
    <nav
      className={`sticky top-0 ${navbar ? "h-screen" : ""
        }  w-full md:h-auto z-10 ${small
          ? "py-4 bg-gradient-to-br from-[#f4f6ff] via-[#dadfff] to-[#c3d3ff] dark:from-gray-900 dark:via-gray-950 dark:to-black rounded-b-md"
          : ""
        }`}
    >
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between md:block">
            <Link href={"#"} className="flex items-center relatieve">
              <Image
                src={logo}
                className="h-4 w-4 sm:h-6 sm:w-6 dark:invert mr-0.5"
                alt="Sogo Sign Logo"
              />
              <span className="text-gray-800 dark:text-gray-200 self-center text-base sm:text-xl md:text-2xl font-bold ">
                ogo Sign
              </span>
            </Link>
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
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar
                ? "block bg-blue-100 dark:bg-gray-800 md:bg-transparent dark:md:bg-transparent p-4 rounded-lg"
                : "hidden"
              }`}
          >
            <ul className="text-gray-800 hover:text-gray-950 dark:text-white items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 font-medium">
              <li>
                <a onClick={() => setNavbar(false)} href="#features">
                  Características
                </a>{" "}
              </li>
              <li>
                <a onClick={() => setNavbar(false)} href="#">
                  Acerca de
                </a>{" "}
              </li>
              <li>
                <a onClick={() => setNavbar(false)} href="#">
                  Contacto
                </a>{" "}
              </li>
              <li className="block sm:hidden md:block">
                {/* <BsFillMoonStarsFill
                  onClick={toggleDarkMode}
                  className="cursor-pointer"
                /> */}
                <button className="cursor-pointer" onClick={toggleDarkMode} > Mode </button>
              </li>
            </ul>

            <div className="text-gray-800 hover:text-gray-950 dark:text-white font-medium w-full mt-3 grid sm:flex gap-2 sm:gap-4 items-center md:hidden p-4 rounded text-center">
              {/* <BsFillMoonStarsFill
                onClick={toggleDarkMode}
                className="cursor-pointer hidden sm:block md:hidden flex-none"
              /> */}
              <button className="cursor-pointer hidden sm:block md:hidden flex-none" onClick={toggleDarkMode} > Mode </button>
              <Link
                className="text-gray-800 border-2 border-gray-950 hover:text-gray-950 dark:text-white dark:border-white rounded-full p-2 sm:flex-1 w-full sm:w-1/2"
                href={`auth/login`}
                rel="preload"
              >
                Iniciar Sesión
              </Link>
              <a
                href="#"
                className="p-2 px-6 text-white bg-gray-900 rounded-full hover:bg-gray-950 dark:bg-white dark:text-gray-900 sm:flex-1 w-full sm:w-1/2"
                aria-current="page"
              >
                Unirse
              </a>
            </div>
          </div>
        </div>
        <div className="font-medium hidden space-x-6 md:inline-block dark:text-white">
          <Link href={`auth/login`} rel="preload">
            Iniciar Sesión
          </Link>
          <Link
            className="p-2 px-6 w-full text-white bg-gray-900 rounded-full hover:bg-gray-950 dark:bg-white dark:text-gray-900"
            href={`auth/register`}
            rel="preload"
          >
            Unirse
          </Link>
        </div>
      </div>
    </nav>
  );
}
