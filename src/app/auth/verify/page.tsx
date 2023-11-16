"use client";
import { showErrorMessage, showSuccessMessage } from "@/utilities";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const URL_BACKPYTHON = process.env.NEXT_PUBLIC_API_BACKEND;

async function getVerified(token: string) {
  try {
    const res = await fetch(`${URL_BACKPYTHON}/user/verified?token=${token}`);
    const data = await res.json();
    console.log(res.status)
    if (res.status === 200) {
      return { ok: true, message: data.respuesta };
    }
    if (res.status === 401) {
      return { ok: false, message: data.respuesta };
    }
  } catch (e) {
    return { ok: false, message: "Algo fallo con el sistema" };
  }
}

export default function Verify() {
  const params = useSearchParams();
  const token = params.get('token');
  const [verified, setVerified] = useState(false);
  const [process, setProcess] = useState(false);
  console.log(token)

  function btnVerify(){
    if( !verified ) {
      getVerified(token+'').then(response => {
        if (response?.ok) {
          setVerified(true);
          showSuccessMessage(response?.message);
        } else {
          showErrorMessage(response?.message);
        }
      });
    }
    setProcess(true);
  }

  return (
    <div className="container h-screen mx-auto">
      <div className="flex h-full justify-center items-center px-6">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            style={{
              backgroundImage: `url('https://source.unsplash.com/oWTW-jNGl9I/600x800')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {(!process) ? 
            (
              <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                <div className="px-8 text-center">
                  <h3 className="pt-4 mb-2 text-step-2 capitalize font-bold">
                    Inicializar el proceso de verificación!
                  </h3>
                 
                  {
                    !token ?
                    (
                      <p className="mb-4 text-step--1 text-gray-700">
                        Usted acaba de ingresar con un link que no es el correcto, comuniquese con administración!!
                      </p>
                    ):
                    (
                      <button
                        className="mt-2 py-3 px-4 w-full font-bold text-white bg-gray-900 rounded-full hover:bg-gray-950 "
                        onClick={() => btnVerify()}
                        id="submit-login"
                      >
                        Comenzar
                      </button>
                    )
                  }
                 
                </div>
              </div>
            ):(
              <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                <div className="px-8 text-center">
                  <h3 className="pt-4 mb-2 text-step-2 capitalize font-bold">
                    Confirmar cuenta!
                  </h3>
                  <p className="mb-4 text-step--1 text-gray-700">
                    Gracias por registrarte! Estamos confirmando tu cuenta, para que
                    puedas iniciar sesión. Por favor, ten paciencia, esto puede
                    tardar unos minutos.
                  </p>
                </div>

                <div className="flex justify-center items-center mb-4">
                  {verified ? (
                    <Link
                      href={"/auth/login"}
                      className="w-full text-center px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:shadow-outline"
                    >
                      Iniciar sesión
                    </Link>
                  ) : (
                    // <Spinner className={'h-full'} />
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
