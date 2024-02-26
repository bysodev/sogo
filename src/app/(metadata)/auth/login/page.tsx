"use client";

import IconLoading from "@/components/icons/IconLoading";
import IconLogo from "@/components/icons/logo";
import textFieldStyles from "@/utilities/stylesMUI";
import { showErrorToast, showSuccessToast } from "@/utilities/sweet-alert";
import { TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";

export default function LoginPage() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

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

  useEffect(() => {
    const hostname = window.location.hostname;
    const privateIpPattern = /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/;
    if (privateIpPattern.test(hostname)) {
      setIsPrivate(true);
    }
  }, []);

  const handleSignIn = (provider: string) => {
    if (!isLoading) {
      if (isPrivate) {
        showErrorToast('La red MIESPE no permite inicio de sesión por proveedores externos')
        return;
      }
      setIsLoading(true);
      signIn(provider, { callbackUrl: '/learn' });
    }
  };
  return (
    <div className="w-full lg:w-auto xl:w-[50%] p-4 lg:p-0">
      <div className="p-2 sm:p-8 sm:py-2 xl:px-6">
        <div className="flex">
          <Link href={"/"} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white duration-300 flex gap-2 items-center font-semibold"><IoArrowBackOutline /><span>Inicio</span></Link>
        </div>
        <div className="flex justify-center">
          <Link href={"/"}>
            <IconLogo height={60} width={60} className="mx-auto mb-6" />
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
            <TextField
              autoComplete="usuario"
              disabled={isLoading}
              sx={textFieldStyles}
              className={`focus:outline-none w-full bg-transparent focus:bg-transparent btn border shadow-none border-gray-400  dark:text-gray-200 ${errors.username
                ? "text-red-600 border-red-400"
                : "text-gray-600 border-gray-400"
                }`}
              type="text"
              label="Nombre de usuario"
              size="small"
              {...register("username", {
                required: { value: true, message: "Usuario requerido" },
                minLength: {
                  value: 4,
                  message: "Requiere al menos 4 caracteres",
                },
                maxLength: {
                  value: 15,
                  message: "Máximo 15 caracteres",
                },
              })}
              error={Boolean(errors.username)}
              helperText={errors.username && errors.username.message}
            />
            <TextField
              autoComplete="password"
              disabled={isLoading}
              sx={textFieldStyles}
              className={`focus:outline-none w-full bg-transparent focus:bg-transparent btn border shadow-none border-gray-400  dark:text-gray-200 ${errors.password
                ? "text-red-600 border-red-400"
                : "text-gray-600 border-gray-400"
                }`}
              type="password"
              label="Contraseña"
              size="small"
              {...register("password", {
                required: {
                  value: true,
                  message: "Contraseña requerida",
                },
                minLength: {
                  value: 8,
                  message: "Requiere al menos 8 caracteres",
                },
                maxLength: {
                  value: 15,
                  message: "Máximo 15 caracteres",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z]).{8,}$/,
                  message: "Debe contener al menos una letra mayúscula y un número"
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password && errors.password.message}
            />
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
            title="Iniciar Sesión"
            disabled={isLoading}
            className="mt-2 py-3 px-4 w-full font-bold text-white bg-gray-900 btn hover:bg-gray-950 dark:bg-purple-500 dark:hover:bg-purple-600"
            type="submit"
            id="submit-login"
          >
            {isLoading ? <IconLoading height={20} width={20} className="text-white" /> : 'Iniciar Sesión'}
          </button>
          <div className="flex flex-row items-center gap-4 my-4">
            <div className="h-0.5 w-full bg-gray-300"></div>
            <div className="text-gray-400 dark:text-white font-bold">O</div>
            <div className="h-0.5 w-full bg-gray-300"></div>
          </div>
          <div className="grid md:grid-flow-row sm:grid-cols-2 gap-4 text-sm">
            <button
              disabled={isLoading}
              onClick={() => handleSignIn("google")}
              className="button_login_provider transition-all items-center inline-flex justify-center gap-2 2xl:gap-4 py-3 px-4 w-full font-semibold text-gray-950 border border-gray-600 btn hover:bg-200 hover:border-gray-400 dark:bg-gray-50 dark:hover:bg-gray-200"
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
              onClick={() => handleSignIn("github")}
              className="button_login_provider transition-all items-center inline-flex justify-center gap-2 2xl:gap-4 py-3 px-4 w-full font-semibold text-gray-950 border border-gray-600 btn hover:bg-200 hover:border-gray-400 dark:bg-gray-50 dark:hover:bg-gray-200"
              type="button"
            >
              <Image
                loading="lazy"
                height={25}
                width={25}
                src="./../src/github-icon.svg"
                alt="Logo de GitHub"
              />
              <span>GitHub</span>
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
