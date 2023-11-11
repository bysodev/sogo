"use client";
import { showErrorMessage, showSuccessMessage } from "@/utilities/sweet-alert";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getSession } from "next-auth/react";

const URL_BACKPYTHON = process.env.NEXT_PUBLIC_API_BACKEND;

async function getVerified(token: string) {
  try {
    const res = await fetch(`${URL_BACKPYTHON}/user/verified?token=${token}`);
    console.log(res.status);
    const data = await res.json();
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

export default async function Verify() {
  const user = await getSession();

  const params = useSearchParams();
  const [verified, setVerified] = useState(false);

  getVerified(user?.user?.accessToken + "").then((response) => {
    if (response?.ok) {
      setVerified(true);
      showSuccessMessage(response?.message);
    } else {
      showErrorMessage(response?.message);
    }
  });

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
        </div>
      </div>
    </div>
  );
}
