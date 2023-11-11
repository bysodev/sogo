"use client";

import { useForm } from "react-hook-form";
import { zustandStore } from "@/utilities/store/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TooltipMessage from "../../../components/TooltipMessage";
import IconLogo from "@/components/icons/IconLogo";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const { push } = useRouter();
  const [fetchLoginUser, user] = zustandStore((state) => [
    state.fetchLoginUser,
    state.user,
  ]);

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
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    console.log(response);
    if (response?.status === 200) {
      reset();
      push("/learn");
    }
  };

  return (
    <div className="h-screen w-full max-h-screen">
      <div className="grid place-items-center h-full w-full m-auto">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-auto xl:w-1/3 2xl:w-auto bg-white p-1 rounded-lg lg:rounded-l-none">
          <div className="p-2 sm:p-8 sm:py-2 xl:px-6">
            <Link href={"/"}>
              <IconLogo height={80} width={80} className="mx-auto mb-6" />
            </Link>
            <p className="mb-8 whitespace-normal text-3xl text-center font-bold text-gray-950">
              Bienvenido
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)(e);
              }}
            >
              <div className="grid gap-4">
                <div
                  className={`flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${errors.username
                      ? "text-red-600 border-red-400"
                      : "text-gray-600 border-gray-400"
                    } container-fluid`}
                >
                  <input
                    autoComplete="username"
                    className="flex-1 focus:outline-none"
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
                  className={`flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${errors.password
                      ? "text-red-600 border-red-400"
                      : "text-gray-600 border-gray-400"
                    } container-fluid`}
                >
                  <input
                    autoComplete="password"
                    className="flex-1 focus:outline-none"
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
                  href={"*"}
                  className="font-medium text-sm text-gray-500 align-baseline
										hover:text-gray-700"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <button
                className="mt-2 py-3 px-4 w-full font-bold text-white bg-gray-900 rounded-full hover:bg-gray-950 "
                type="submit"
                id="submit-login"
              >
                Iniciar Sesión
              </button>
              <div className="flex flex-row items-center gap-4 my-4">
                <div className="h-0.5 w-full bg-gray-300"></div>
                <div className="text-gray-400 font-bold">O</div>
                <div className="h-0.5 w-full bg-gray-300"></div>
              </div>
              <div className="grid md:grid-flow-row sm:grid-cols-2 gap-4 text-sm">
                <button
                  onClick={() => signIn("google")}
                  className="items-center inline-flex justify-center gap-2 2xl:gap-4 py-3 px-4 w-full font-semibold text-gray-950 border border-gray-600 rounded-full hover:bg-gray-50"
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
                  onClick={() => signIn("github")}
                  className="items-center inline-flex justify-center gap-2 2xl:gap-4 py-3 px-4 w-full font-semibold text-gray-950 border border-gray-600 rounded-full hover:bg-gray-50"
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
              <div className="text-center mt-8 text-sm font-semibold text-gray-400 align-baseline">
                <p>¿No tienes una cuenta?</p>
                <Link
                  href={"/auth/register"}
                  className="font-bold text-gray-500 hover:text-gray-700"
                >
                  Registrate
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
