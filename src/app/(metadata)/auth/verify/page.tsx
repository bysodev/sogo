"use client";
import IconLogo from "@/components/icons/logo";
import { showErrorMessage, showSuccessMessage } from "@/utilities";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const URL_BACKPYTHON = process.env.NEXT_PUBLIC_API_BACKEND;

async function getVerified(token: string) {
  try {
    const response = await fetch(`${URL_BACKPYTHON}/user/verified?token=${token}`);
    const data = await response.json();
    return { ok: response.status, message: data.detail };
  } catch (e) {
    return { ok: 400, message: "Algo fallo con el sistema" };
  }
}

export default function Verify() {
  const params = useSearchParams();
  const token = params.get('token');
  const [verified, setVerified] = useState(false);
  const [process, setProcess] = useState(false);
  function btnVerify() {
    if (!verified) {
      getVerified(token + '').then(response => {
        if (response.ok === 200) {
          setVerified(true);
          showSuccessMessage(response?.message);
        } else if (response?.ok === 401) {
          setVerified(true);
          showErrorMessage(response?.message);
        } else {
          showErrorMessage(response?.message);
        }
      });
    }
    setProcess(true);
  }

  return (
    <div className="container h-screen m-auto grid place-content-center gap-20">
      <div className="bg-white text-black dark:bg-slate-500 rounded-lg shadow-lg dark:text-white w-2/3 p-8 text-center m-auto flex flex-col gap-10 place-items-center">
        <Link href={"/"}>
          <IconLogo height={80} width={80} className="mx-10" />
        </Link>
        {(!process) ?
          (
            <div className="">
              <h3 className="pt-4 mb-2 capitalize font-semibold text-4xl">
                Proceso de verificación
              </h3>
              {
                !token ?
                  (
                    <p className="text-gray-700 dark:text-gray-200 text-lg p-8 px-20  text-balance">
                      Acabas de ingresar con un enlace incorrecto. Por favor, revisa tu correo electrónico para verificar tu cuenta o <a className="font-bold hover:text-black dark:hover:text-purple-200" href="/auth/register">crea</a> una en caso de no tenerla.
                    </p>
                  ) :
                  (
                    <>
                      <p className="text-gray-700 dark:text-gray-200 text-lg p-8 px-20  text-balance">
                        Por favor, comienza el proceso de verificación accionando sobre el siguiente botón.
                      </p>
                      <button
                        className="mt-2 py-3 px-4 w-full font-bold text-white bg-gray-900 rounded-full hover:bg-gray-950 "
                        onClick={() => btnVerify()}
                        id="submit-login"
                      >
                        Comenzar
                      </button>
                    </>
                  )
              }
            </div>
          ) : (
            <div>
              <div className="px-8 text-center">
                <h3 className="pt-4 mb-2 capitalize font-semibold text-4xl">
                  Proceso de confirmación
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-lg p-8 px-20  text-balance">
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
  );
}
