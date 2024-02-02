"use client"
import IconLoading from "@/components/icons/IconLoading";
import IconLogo from "@/components/icons/logo";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const URL = process.env.NEXT_PUBLIC_ROUTE_APP;

async function getVerified(token: string) {
  try {
    const response = await fetch(`${URL}/api/auth/user/verify?token=${token}`, {

    }); // Include credentials in the request
    const data = await response.json();
    return { ok: response.status, message: data.detail };
  } catch (e) {
    return { ok: 400, message: "Algo falló con el sistema" };
  }
}

export default function Verify() {
  const params = useSearchParams();
  const token = params.get('token');
  const [verified, setVerified] = useState(false);
  const [tokenError, setTokenError] = useState(() => {
    if (!token) {
      return true;
    }
    return false;
  });
  const [loading, setLoading] = useState(false);

  async function submitVerify() {
    setLoading(true);
    getVerified(token as string)
      .then((response) => {
        if (response.ok === 200) {
          setVerified(true);
        } else if (response.ok === 401) {
          setVerified(true);
          setTokenError(false);
        } else {
          setVerified(false);
          setTokenError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="m-auto grid h-full place-content-center w-full bg-white text-black dark:bg-gray-950 dark:text-white">
      <div className="container w-full sm:w-[35rem] xl:w-[40rem] p-2 md:my-10 md:p-8 text-center m-auto flex flex-col gap-4 md:gap-6 place-items-center">
        <Link href={"/"}>
          <IconLogo height={80} width={80} className="mx-10" />
        </Link>
        {!loading ? (
          <>
            <h3 className="pt-4 capitalize font-semibold text-2xl md:text-3xl whitespace-pre-wrap lg:whitespace-nowrap">
              {verified ? "Proceso de confirmación" : "Proceso de verificación"}
            </h3>
            {tokenError ? (
              <p className="text-gray-700 dark:text-gray-200 text-balance text-sm md:text-base">
                Acabas de ingresar con un enlace incorrecto. Por favor, revisa tu correo electrónico para verificar tu cuenta o{" "}
                <Link className="font-bold hover:text-black dark:hover:text-purple-200" href="/auth/register">
                  crea
                </Link>{" "}
                una en caso de no tenerla.
              </p>
            ) : (
              <>
                <p className="text-gray-700 dark:text-gray-200 text-balance text-sm md:text-base">
                  {verified
                    ? <>¡Gracias por registrarte!<br />Puedes cerrar esta ventana e iniciar sesión con tus datos para empezar a aprender.</>
                    : "Por favor, comienza el proceso de verificación accionando sobre el siguiente botón."}
                </p>
                {!verified && (
                  <button
                    className="mt-2 py-3 px-4 w-40 font-bold transition-all text-white bg-gray-900 rounded-full hover:bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    onClick={() => submitVerify()}
                    id="submit-login"
                  >
                    Verificar
                  </button>
                )}
              </>
            )}
            {verified && (
              <div className="flex justify-center items-center mb-4">
                <button
                  className="mt-2 py-3 px-4 w-40 font-bold transition-all text-white bg-gray-900 rounded-full hover:bg-gray-950 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    const win = window.open('/auth/login', '_self');
                    if (win) {
                      win.close();
                    }
                  }}
                >
                  Iniciar sesión
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="h-40 grid place-content-center">
            <IconLoading height={20} className="text-dark dark:text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
