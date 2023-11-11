"use client";
import { useForm } from "react-hook-form";
import { zustandStore } from "@/utilities/store/user";
import Link from "next/link";
import TooltipMessage from "@/components/TooltipMessage";
import IconLogo from "@/components/icons/IconLogo";
import { rgxEmail } from "@/utilities/validators/auth-validators";
import { useRouter } from "next/navigation";

export default function Home() {
  const fetchRegisterUser = zustandStore((state) => state.fetchRegisterUser);

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
    const response = await fetchRegisterUser(
      data.username,
      data.password,
      data.email
    );
    if (response) {
      // Si las contraseñas coinciden, continuar con el reset y redirección
      reset();
      push("/auth/login");
    }
  }

  return (
    <div className="h-screen w-full max-h-screen">
      <div className="grid place-items-center h-full w-full m-auto">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-[30%] xl:w-1/3 2xl:w-auto bg-white p-1 rounded-lg lg:rounded-l-none">
          <div className="p-2 sm:p-8 sm:py-2 xl:px-6">
            <Link title="Ir a la página de inicio" href={"/"}>
              <IconLogo height={80} width={80} className="mx-auto mb-6" />
            </Link>
            <p className="mb-8 whitespace-normal text-3xl text-center font-bold text-gray-950">
              Crea una cuenta
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
                  className={`flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${errors.email
                      ? "text-red-600 border-red-400"
                      : "text-gray-600 border-gray-400"
                    } container-fluid`}
                >
                  <input
                    autoComplete="email"
                    className="flex-1 focus:outline-none"
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

                <section className="grid gap-4 2xl:grid-cols-2">
                  <div
                    className={`flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${errors.password
                        ? "text-red-600 border-red-400"
                        : "text-gray-600 border-gray-400"
                      } container-fluid`}
                  >
                    <input
                      className="flex-1 focus:outline-none"
                      type="password"
                      placeholder="Contraseña"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Contraseña requerido",
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
                  <div
                    className={`relative flex flex-wrap text-sm border rounded-3xl p-3 ps-6 ${errors.repass
                        ? "text-red-600 border-red-400"
                        : "text-gray-600 border-gray-400"
                      } container-fluid`}
                  >
                    <input
                      className="flex-1 focus:outline-none"
                      type="password"
                      placeholder="Confirmar contraseña"
                      {...register("repass", {
                        required: {
                          value: true,
                          message: "Confirmación requerida",
                        },
                        minLength: {
                          value: 6,
                          message: "Requiere al menos 6 caracteres",
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
                className="mt-4 py-3 px-4 w-full font-bold text-white bg-gray-900 rounded-full hover:bg-gray-950 "
                type="submit"
              >
                Registrar cuenta
              </button>
              <div className="flex flex-row items-center gap-4 my-8">
                <div className="h-0.5 w-full bg-gray-300"></div>
              </div>
              <div className="text-center mt-4 text-sm font-semibold text-gray-400 align-baseline">
                <p>¿Ya tienes una cuenta?</p>
                <Link
                  title="Ir a la página para iniciar sesión"
                  href={"/auth/login"}
                  className="font-bold text-gray-500 hover:text-gray-700"
                >
                  Inicia sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
