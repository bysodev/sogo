"use client";

import TooltipMessage from "@/components/TooltipMessage";
import IconLoading from "@/components/icons/IconLoading";
import IconLogo from "@/components/icons/logo";
import { showErrorToast, showSuccessToast } from "@/utilities/sweet-alert";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";

export default function LoginPage() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  interface UseFormInputs {
    username: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UseFormInputs>({ mode: "onChange" });

  const onSubmit = async (data: UseFormInputs) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (!response?.ok)
      showErrorToast(response?.error)
    if (response?.status === 200) {
      showSuccessToast('Iniciaste sesión correctamente')
      reset();
      push("/learn");
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full lg:w-auto xl:w-[50%] p-4 lg:p-0">
      <div className="p-2 sm:p-8 sm:py-2 xl:px-6">
        <div className="flex">
          <Link href={"/"} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white duration-300 flex gap-2 items-center font-semibold"><IoArrowBackOutline /><span>Inicio</span></Link>
        </div>
        <div className="flex justify-center">
          <Link href={"/"}>
            <IconLogo height={80} width={80} className="mx-auto mb-6" />
          </Link>
        </div>
        <p className="mb-8 whitespace-normal text-3xl text-center font-bold text-gray-950 dark:text-white">
          Bienvenido
        </p>
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
        >
          <div className="grid gap-4">
            <div
              className={`relative flex flex-wrap text-sm ${errors.username
                ? "text-red-600 border-red-400"
                : "text-gray-600 border-gray-400"
                } container-fluid`}
            >
              <input
                disabled={isLoading}
                autoComplete="username"
                className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                type="text"
                placeholder="Nombre de usuario"
                {...register("username", {
                  required: { value: true, message: "Usuario requerido" },
                  minLength: {
                    value: 4,
                    message: "Requiere al menos 4 caracteres",
                  },
                })}
              />
              {errors.username && (
                <TooltipMessage message={errors.username.message!} />
              )}
            </div>

            <div
              className={`relative flex flex-wrap text-sm ${errors.password
                ? "text-red-600 border-red-400"
                : "text-gray-600 border-gray-400"
                } container-fluid`}
            >
              <input
                autoComplete="password"
                disabled={isLoading}
                className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Contraseña requerida",
                  },
                  minLength: {
                    value: 6,
                    message: "Requiere al menos 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <TooltipMessage message={errors.password.message!} />
              )}
            </div>
          </div>
          <div className="p-2 text-end">
            <Link
              href={"/auth/recovery"}
              className="font-medium text-sm text-gray-500 dark:text-gray-300 align-baseline
										hover:text-gray-700 dark:hover:text-white"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <button
            disabled={isLoading}
            className="mt-2 py-3 px-4 w-full font-bold text-white bg-gray-900 btn hover:bg-gray-950 dark:bg-purple-500 dark:hover:bg-purple-600"
            type="submit"
            id="submit-login"
          >
            {isLoading ? <IconLoading height={20} className="text-white" /> : 'Iniciar Sesión'}
          </button>
          <div className="flex flex-row items-center gap-4 my-4">
            <div className="h-0.5 w-full bg-gray-300"></div>
            <div className="text-gray-400 dark:text-white font-bold">O</div>
            <div className="h-0.5 w-full bg-gray-300"></div>
          </div>
          <div className="grid md:grid-flow-row sm:grid-cols-2 gap-4 text-sm">
            <button
              disabled={isLoading}
              onClick={() => signIn("google", { callbackUrl: '/lesson' })}
              className="items-center inline-flex justify-center gap-2 2xl:gap-4 py-3 px-4 w-full font-semibold text-gray-950 border border-gray-600 btn hover:bg-gray-50 dark:bg-gray-50 dark:hover:bg-gray-200"
              type="button"
            >
              <Image
                loading="lazy"
                height={25}
                width={25}
                src="./../src/google-icon.svg"
                alt="Logo de Google"
              />
              <span>Google</span>
            </button>
            <button
              disabled={isLoading}
              onClick={() => signIn("github", { callbackUrl: '/lesson' })}
              className="items-center inline-flex justify-center gap-2 2xl:gap-4 py-3 px-4 w-full font-semibold text-gray-950 border border-gray-600 btn hover:bg-gray-50 dark:bg-gray-50 dark:hover:bg-gray-200"
              type="button"
            >
              <Image
                loading="lazy"
                height={25}
                width={25}
                src="./../src/github-icon.svg"
                alt="Logo de GitHub"
              />
              GitHub
              <span></span>
            </button>
          </div>
          <div className="text-center mt-8 text-sm font-semibold text-gray-400 align-baseline dark:text-gray-300">
            <p>¿No tienes una cuenta?</p>
            <Link
              aria-disabled={isLoading}
              href={"/auth/register"}
              className="font-bold transition-colors duration-300 text-gray-500 hover:text-gray-700 dark:text-purple-500 dark:hover:text-purple-600"
            >
              Registrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
