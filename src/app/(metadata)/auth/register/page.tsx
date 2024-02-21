"use client";
import TooltipMessage from "@/components/TooltipMessage";
import IconLoading from "@/components/icons/IconLoading";
import IconLogo from "@/components/icons/logo";
import { showErrorMessage, showSuccessMessage, updateSuccessMessage } from "@/utilities/sweet-alert";
import { rgxEmail } from "@/validators/auth-validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
const url_app = process.env.NEXT_PUBLIC_ROUTE_APP
const myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})

async function fetchRegister(username: string, password: string, email: string) {
  const myHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  try {
    const response = await fetch(`${url_app}/api/auth/user/`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email
      }),
      headers: myHeaders,
      redirect: 'follow'
    });
    if (response.status === 201) {
      showSuccessMessage({
        html: `<p>Su cuenta fue creada exitosamente</p>
      <p class='flex justify-center gap-2 overflow-hidden mt-4'>
        <svg class="animate-spin text-purple-600 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Enviando verificación</span>
      </p>
      `});
      const user = await response.json();
      const verified = await fetchVerification(username, email, user.data.token);
      if (verified.ok) {
        updateSuccessMessage({
          html: `<p>Verificación enviada</p>
        <p class='flex justify-center gap-2 overflow-hidden mt-4'>
        <svg class="text-purple-600 h-5 w-5" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"></path></svg>
          <span>Revisa tu correo electrónico para activar tu cuenta</span>
        </p>
        `});
        return true;
      } else {
        updateSuccessMessage(
          { html: 'El correo de verificación no pudo ser enviado. Comuniquese con la administración' }
        );
        return false;
      }
    } else {
      const error = await response.text();
      showErrorMessage(error);
      return false;
    }
  } catch (error) {
    showErrorMessage('Problemas con el servidor');
  }
}

async function fetchVerification(username: string, email: string, token: string) {
  try {
    const response = await fetch(`${url_app}/api/emails/`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        token,
      }),
      headers: myHeaders,
      redirect: 'follow',
    });
    if (!response.ok) {
      throw new Error('Error en la verificación');
    }
    return response;
  } catch (e) {
    throw new Error('Error al procesar la solicitud');
  }
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  interface UseFormInputs {
    username: string;
    email: string;
    password: string;
    repass: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UseFormInputs>({ mode: "onChange" });

  const { push } = useRouter();

  async function onSubmit(data: UseFormInputs) {
    setIsLoading(true);
    const val = await fetchRegister(data.username, data.password, data.email)
    setIsLoading(false);
    if (val) {
      reset();
      push("/auth/login");
    }
  }

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
          Crea una cuenta
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
                : "text-gray-600 border-gray-400 dark:text-gray-400"
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
                  maxLength: {
                    value: 15,
                    message: "Máximo 15 caracteres",
                  },
                })}
              />
              {errors.username && (
                <TooltipMessage message={errors.username.message!} />
              )}
            </div>

            <div
              className={`relative flex flex-wrap text-sm ${errors.email
                ? "text-red-600 border-red-400"
                : "text-gray-600 border-gray-400 dark:text-gray-400"
                } container-fluid`}
            >
              <input
                disabled={isLoading}
                autoComplete="email"
                className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                type="text"
                placeholder="Correo electrónico"
                {...register("email", {
                  required: { value: true, message: "Correo requerido" },
                  pattern: {
                    value: rgxEmail,
                    message: "Correo electrónico no válido",
                  },
                })}
              />
              {errors.email && (
                <TooltipMessage message={errors.email.message!} />
              )}
            </div>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
              <div
                className={`relative flex flex-wrap text-sm ${errors.password
                  ? "text-red-600 border-red-400"
                  : "text-gray-600 border-gray-400 dark:text-gray-400"
                  } container-fluid`}
              >
                <input
                  disabled={isLoading}
                  className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Contraseña requerido",
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
                      message: "La contraseña debe contener al menos una letra, un número y una letra mayúscula"
                    },
                  })}
                />
                {errors.password && (
                  <TooltipMessage message={errors.password.message!} />
                )}
              </div>
              <div
                className={`relative flex flex-wrap text-sm ${errors.repass
                  ? "text-red-600 border-red-400"
                  : "text-gray-600 border-gray-400 dark:text-gray-400"
                  } container-fluid`}
              >
                <input
                  disabled={isLoading}
                  className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                  type="password"
                  placeholder="Confirmar contraseña"
                  {...register("repass", {
                    required: {
                      value: true,
                      message: "Confirmación requerida",
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
                      message: "La contraseña debe contener al menos una letra, un número y una letra mayúscula"
                    },
                    validate: (value: string) => {
                      if (value !== watch("password"))
                        return "Las contraseñas no coinciden";
                    },
                  })}
                />
                {errors.repass && (
                  <TooltipMessage message={errors.repass.message!} />
                )}
              </div>
            </section>
          </div>
          <button
            disabled={isLoading}
            className="mt-4 py-3 px-4 w-full font-bold text-white bg-gray-900 btn hover:bg-gray-950 dark:bg-purple-500 dark:hover:purple-600"
            type="submit"
          >
            {isLoading ? <IconLoading height={20} className="text-white" /> : 'Registrar cuenta'}
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
        </form>
      </div>
    </div>
  );
}
