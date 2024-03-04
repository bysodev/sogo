"use client";

import IconLoading from "@/components/icons/IconLoading";
import IconLogo from "@/components/icons/logo";
import textFieldStyles from "@/utilities/stylesMUI";
import { showErrorMessage, showErrorToast, showSuccessMessage } from "@/utilities/sweet-alert";
import { rgxEmail } from "@/validators/auth-validators";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import useSWR from "swr";

const url_app = process.env.NEXT_PUBLIC_ROUTE_APP

async function fetchRecovery(email: string) {
  const myHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  try {
    const response = await fetch(`${url_app}/api/auth/user/recovery`, {
      method: 'POST',
      body: JSON.stringify({
        email
      }),
      headers: myHeaders,
      redirect: 'follow'
    });
    const body = await response.json();
    if (response.status === 200) {
      showSuccessMessage({
        html: `<p>Código de recuperación enviado</p>
        <p class='flex justify-center gap-2 overflow-hidden mt-4'>
        <svg class="text-purple-600 h-5 w-5" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"></path></svg>
          <span>Revisa tu correo electrónico para reestablecer tu contraseña</span>
        </p>
        `});
      return true;
    } else {
      showErrorMessage(body.detail);
      return false;
    }
  } catch (error) {
    showErrorMessage('Problemas con el servidor');
  }
}

async function fetchUpdatePassword(password: string, token: string) {
  const myHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  try {
    const response = await fetch(`${url_app}/api/auth/user/recovery`, {
      method: 'PUT',
      body: JSON.stringify({
        password,
        token
      }),
      headers: myHeaders,
      redirect: 'follow'
    });
    const body = await response.json();
    if (response.status === 201) {
      showSuccessMessage({
        html: `<p>Contraseña actualizada correctamente</p><p>Inicia sesión con tus nuevas credenciales</p>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Continuar',
      });
      return true;
    } else {
      showErrorMessage(body.detail);
      return false;
    }
  } catch (error) {
    showErrorMessage('Problemas con el servidor');
  }
}


export default function PasswordRecoveryPage() {

  const params = useSearchParams();
  const token = params.get('token');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const { data, error, isValidating } = useSWR(token ? `${url_app}/api/auth/user/recovery?token=${token}` : null, fetch, { revalidateOnFocus: false });

  useEffect(() => {
    if (data && data.status === 200) {
      setIsTokenValid(true);
    } else if (data && data.status === 400) {
      showErrorToast('El token de recuperación no es válido');
      setIsTokenValid(false);
    }
  }, [data, error]);


  interface UseFormInputs {
    email?: string;
    password?: string;
    confirmPassword?: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues
  } = useForm<UseFormInputs>({ mode: "onChange" });


  const onSubmitEmail = async (data: UseFormInputs) => {
    setIsLoading(true);
    const response = await fetchRecovery(data.email ?? '');
    setIsLoading(false);
    if (response) {
      reset();
    }
  };

  const onSubmitPassword = async (data: UseFormInputs) => {
    setIsLoading(true);
    if (data.password && data.confirmPassword && token) {
      const response = await fetchUpdatePassword(data.password, token);
      setIsLoading(false);
      if (response) {
        reset();
        push('/auth/login');
      }
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
        {isValidating ? (
          <div className="grid place-content-center alig h-48">
            <IconLoading height={40} className="text-gray-900 dark:text-purple-500" />
          </div>
        ) : isTokenValid ? (
          <>
            <p className="mb-8 whitespace-normal text-3xl text-center font-bold text-gray-950 dark:text-white">
              Cambiar contraseña
            </p>
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmitPassword)(e);
              }}
            >
              <div className="grid gap-4">

                <TextField
                  autoComplete="newPassword"
                  disabled={isLoading}
                  sx={textFieldStyles}
                  className={`focus:outline-none w-full bg-transparent focus:bg-transparent border shadow-none border-gray-400  dark:text-gray-200 ${errors.password
                    ? "text-red-600 border-red-400"
                    : "text-gray-600 border-gray-400"
                    }`}
                  type="password"
                  label="Nueva contraseña"
                  size="small"
                  {...register("password", {
                    required: { value: true, message: "Contraseña requerida" },
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
                <TextField
                  autoComplete="newRePassword"
                  disabled={isLoading}
                  sx={textFieldStyles}
                  className={`focus:outline-none w-full bg-transparent focus:bg-transparent border shadow-none border-gray-400  dark:text-gray-200 ${errors.confirmPassword
                    ? "text-red-600 border-red-400"
                    : "text-gray-600 border-gray-400"
                    }`}
                  type="password"
                  label="Confirmar contraseña"
                  size="small"
                  {...register("confirmPassword", {
                    required: { value: true, message: "Confirmación de contraseña requerida" },
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
                    validate: value => value === getValues().password || "Las contraseñas no coinciden"
                  })}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword && errors.confirmPassword.message}
                />
                <button
                  disabled={isLoading}
                  className="mt-2 py-3 px-4 w-full font-bold text-white bg-gray-900 btn hover:bg-gray-950 dark:bg-purple-500 dark:hover:bg-purple-600"
                  type="submit"
                  id="submit-recovery"
                >
                  {isLoading ? <IconLoading height={20} className="text-white" /> : 'Actualizar contraseña'}
                </button>
                <div className="text-center mt-4 text-sm font-semibold text-gray-400 align-baseline dark:text-gray-300">
                  <p>¿Tienes una cuenta?</p>
                  <Link
                    title="Ir a la página para iniciar sesión"
                    href={"/auth/login"}
                    className="font-bold transition-colors duration-300 text-gray-500 hover:text-gray-700 dark:text-purple-500 dark:hover:text-purple-600"
                  >
                    Inicia sesión
                  </Link>
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="mb-8 whitespace-normal text-3xl text-center font-bold text-gray-950 dark:text-white">
              Recuperar contraseña
            </p>
            <form
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmitEmail)(e);
              }}
            >
              <div className="grid gap-4">
                <TextField
                  autoComplete="email"
                  disabled={isLoading}
                  sx={textFieldStyles}
                  className={`focus:outline-none w-full bg-transparent focus:bg-transparent border shadow-none border-gray-400  dark:text-gray-200 ${errors.email
                    ? "text-red-600 border-red-400"
                    : "text-gray-600 border-gray-400"
                    }`}
                  type="text"
                  label="Correo electrónico"
                  size="small"
                  {...register("email", {
                    required: { value: true, message: "Correo electrónico requerido" },
                    pattern: {
                      value: rgxEmail,
                      message: "Correo electrónico inválido",
                    },
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                />
                <button
                  disabled={isLoading}
                  className="mt-2 py-3 px-4 w-full font-bold text-white bg-gray-900 btn hover:bg-gray-950 dark:bg-purple-500 dark:hover:bg-purple-600"
                  type="submit"
                  id="submit-recovery"
                >
                  {isLoading ? <IconLoading height={20} className="text-white" /> : 'Obtener código'}
                </button>
                <div className="text-center mt-4 text-sm font-semibold text-gray-400 align-baseline dark:text-gray-300">
                  <p>¿Tienes una cuenta?</p>
                  <Link
                    title="Ir a la página para iniciar sesión"
                    href={"/auth/login"}
                    className="font-bold transition-colors duration-300 text-gray-500 hover:text-gray-700 dark:text-purple-500 dark:hover:text-purple-600"
                  >
                    Inicia sesión
                  </Link>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
