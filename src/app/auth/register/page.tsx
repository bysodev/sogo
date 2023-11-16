"use client";
import TooltipMessage from "@/components/TooltipMessage";
import IconLogo from "@/components/icons/IconLogo";
import { showErrorMessage, showSuccessMessage } from "@/utilities";
import { rgxEmail } from "@/validators/auth-validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
const url_app = process.env.NEXT_PUBLIC_ROUTE_APP
const myHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})

async function fetchRegister(username: string, password: string, email: string) {
  const respuesta = await fetch(`${url_app}/api/auth/user/`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      email
    }),
    headers: myHeaders,
    redirect: 'follow'
  })

  if( respuesta.status === 201 ){
    showSuccessMessage(
      'Su cuenta fue creada exitosamente, ahora espere la verificación'
    );
    const data = await respuesta.json();
    console.log(data)
    fetchVerification( data['username'], email, data['token'] )

  }else{
    showErrorMessage(
      'La aplicación esta fallando con las consultas'
    );
  }
}

async function fetchVerification(username: string, email: string, token: string) {
  console.log({username, email, token})
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
    if (response.ok) {
      showSuccessMessage(
        'El correo de verificación fue enviado exitosamente'
      );
    }
  } catch (e) {
    showErrorMessage(
      'El correo de verificación no pudo ser enviado!! Comuniquese con la administración'
    );
  }
}

export default function Home() {
  // const fetchRegisterUser = zustandStore((state) => state.fetchRegisterUser);

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
    fetchRegister( data.username, data.password, data.email )
    reset();
    push("/auth/login");
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
