"use client"
import ModalMUI from "@/components/ModalMUI";
import TooltipMessage from "@/components/TooltipMessage";
import IconLoading from "@/components/icons/IconLoading";
import { showErrorToast, showSuccessToast } from "@/utilities/sweet-alert";
import { useAvatars } from "@/utilities/useAvatars";
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaQuestionCircle } from "react-icons/fa";
import { HiX } from 'react-icons/hi';
import { MdEdit } from "react-icons/md";
import useSWR from 'swr';

const url = process.env.NEXT_PUBLIC_ROUTE_APP;
const IMAGE_PROVIDER = "https://api.dicebear.com/7.x/fun-emoji/jpg";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProfilePage() {
  const { data: user, error, isLoading, mutate } = useSWR(`${url}/api/auth/user/profile`, fetcher, { revalidateOnFocus: false }) || {};
  const { data: session, update } = useSession() || {};
  const [modalOpen, setModalOpen] = useState(false); // state to control the modal
  const [isChecked, setIsChecked] = useState(false);
  const [fetching, setFetching] = useState(false); // fix: separate the setter function from the state variable
  const { avatars } = useAvatars();

  const handleOpen = () => setModalOpen(true); // function to open the modal
  const handleClose = () => setModalOpen(false); // function to close the modal

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UseFormInputs>({ mode: "onChange" });



  async function handleUpdate(data: any) {
    setFetching(true);
    const { username, image, currentPassword, password } = data
    if (!username || !image) {
      setFetching(false);
      showErrorToast('Campos vacíos')
      return;
    }
    const updatedUser: any = {
      username: username,
      image: image,
    };

    if (currentPassword) {
      updatedUser.currentPassword = currentPassword;
    }

    if (password) {
      updatedUser.password = password;
    }

    try {
      const response = await fetch(`${url}/api/auth/user/profile`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      const status = await response.json();
      if (response.status === 201) {
        const valoresActuales = getValues();

        reset({
          ...valoresActuales,
          currentPassword: '',
          password: '',
          repass: '',
        });
        // Aquí actualizas la sesión con el nuevo nombre de usuario y el nuevo token
        await update({
          ...session,
          user: {
            ...session?.user,
            name: updatedUser.username,
            image: updatedUser.image,
            accessToken: status.refreshToken, // Aquí pasas el nuevo token
          },
        });
        showSuccessToast(status.message)
        mutate(); // Re-fetch the data
      } else {
        showErrorToast(status.detail)
      }
      setFetching(false);
    } catch (error) {
      setFetching(false);
      throw new Error('La actualización de datos de perfil falló');
    }
  }

  const [selectedAvatar, setSelectedAvatar] = useState<{ url: string, id: string } | null>(null);

  useEffect(() => {
    setValue("image", selectedAvatar?.id || '');
  }, [selectedAvatar, setValue]);

  useEffect(() => {
    if (session?.user?.image?.startsWith('https')) {
      const iamgeProvider = session?.user?.image;
      setSelectedAvatar({ url: iamgeProvider ?? '', id: iamgeProvider });
    } else {
      setSelectedAvatar({ url: `${IMAGE_PROVIDER}?seed=${session?.user?.image}` ?? '', id: `${session?.user?.image}` });
    }
  }, [session?.user?.image])

  async function handleImageClick(avatarId: string) {
    if (avatarId.startsWith('https')) return setSelectedAvatar({ url: avatarId, id: avatarId });
    const avatarUrl = `${IMAGE_PROVIDER}?seed=${avatarId}`;
    setSelectedAvatar({ url: avatarUrl, id: avatarId });
  }

  interface UseFormInputs {
    username: string;
    email: string;
    currentPassword: string;
    password: string;
    repass: string;
    image: string;
  }


  return (
    <div className="w-full p-4">
      <h1 className="lg:rounded-xl border-2 p-1 font-bold text-2xl text-center text-gray-500">Perfil</h1>
      <hr className="mt-4" />
      <div className="p-2 grid place-items-center gap-4">
        {!selectedAvatar || !selectedAvatar?.url ? (
          <CircularProgress />
        ) : (
          <div className="relative text-center">
            <Image
              className="rounded-full ounded-full border-[6px] border-gray-300"
              src={selectedAvatar?.url}
              alt=""
              height={150}
              width={150}
            />
            <span onClick={handleOpen} className="cursor-pointer absolute right-0 bottom-0 bg-gray-100 text-black border-[4px] border-gray-300 rounded-full p-2"><MdEdit size={20} /></span>
          </div>
        )}
        <form
          autoComplete="off"
          className="flex flex-col place-items-center w-full"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="flex flex-col w-full justify-center place-items-center gap-2">
            <div className={`relative text-center w-full text-sm ${error ? "text-red-600 border-red-400" : "text-gray-600 border-gray-400 dark:text-gray-400"} container-fluid`}>
              {isLoading ? (
                selectedAvatar?.url ? (
                  <CircularProgress />
                ) : null
              ) : (
                <div className="grid gap-4 text-start">
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="font-semibold">
                        Usuario:
                      </label>
                      <div className={`relative flex flex-wrap text-sm ${errors.username
                        ? "text-red-600 border-red-400"
                        : "text-gray-600 border-gray-400 dark:text-gray-400"
                        } container-fluid`}
                      >
                        <input
                          autoComplete="username"
                          className="w-full flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                          type="text"
                          defaultValue={user.data.username}
                          {...register("username", {
                            required: { value: true, message: "Usuario requerido" },
                            minLength: {
                              value: 5,
                              message: "Requiere al menos 6 caracteres",
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
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold whitespace-nowrap flex items-center gap-2">
                        <span>Email:</span>
                        <Tooltip title="Este campo no se puede modificar" placement="right-end" arrow>
                          <div>
                            <FaQuestionCircle />
                          </div>
                        </Tooltip>
                      </div>
                      <div className={`relative flex flex-wrap text-sm text-gray-600 border-gray-400 dark:text-gray-400 container-fluid`}
                      >
                        <input
                          disabled={true}
                          autoComplete="email"
                          className="w-full flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                          type="email"
                          defaultValue={user.data.email}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex columns-2 gap-4">
                    <div className="flex flex-col">
                      <div className="font-semibold whitespace-nowrap flex items-center gap-2">
                        <span>Modificar:</span>
                        <Tooltip title="Modificar contraseña" placement="right-end" arrow>
                          <div>
                            <FaQuestionCircle />
                          </div>
                        </Tooltip>
                      </div>
                      <div className={`relative flex flex-wrap text-sm container-fluid justify-center`}>
                        <input
                          className="focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 h-11 w-11 dark:text-gray-200"
                          type="checkbox" required={false} onChange={(e) => setIsChecked(e.target.checked)} />
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-semibold">
                        Contraseña actual:
                      </label>
                      <div className={`relative flex flex-wrap text-sm ${errors.currentPassword
                        ? "text-red-600 border-red-400"
                        : "text-gray-600 border-gray-400 dark:text-gray-400"
                        } container-fluid`}
                      >
                        <input
                          className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                          type="password"
                          {...register("currentPassword", {
                            required: {
                              value: true,
                              message: "Contraseña requerida",
                            },
                            minLength: {
                              value: 8,
                              message: "Requiere al menos 8 caracteres",
                            },
                            pattern: {
                              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                              message: "La contraseña debe contener al menos una letra y un número"
                            },
                          })}
                        />
                        {errors.currentPassword && (
                          <TooltipMessage message={errors.currentPassword.message!} />
                        )}
                      </div>
                    </div>
                  </div>
                  {isChecked && (
                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="font-semibold">
                          Nueva contraseña:
                        </label>
                        <div className={`relative flex flex-wrap text-sm ${errors.password
                          ? "text-red-600 border-red-400"
                          : "text-gray-600 border-gray-400 dark:text-gray-400"
                          } container-fluid`}
                        >
                          <input
                            className="w-full flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                            type="password"
                            {...register("password", {
                              required: {
                                value: true,
                                message: "Nueva contraseña requerida",
                              },
                              minLength: {
                                value: 8,
                                message: "Requiere al menos 8 caracteres",
                              },
                              pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: "La contraseña debe contener al menos una letra y un número"
                              },
                            })}
                          />
                          {errors.password && (
                            <TooltipMessage message={errors.password.message!} />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="font-semibold">
                          Confirmar contraseña:
                        </label>
                        <div className={`relative flex flex-wrap text-sm ${errors.repass
                          ? "text-red-600 border-red-400"
                          : "text-gray-600 border-gray-400 dark:text-gray-400"
                          } container-fluid`}
                        >
                          <input
                            className="w-full flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                            type="password"
                            {...register("repass", {
                              required: {
                                value: true,
                                message: "Confirmación requerida",
                              },
                              minLength: {
                                value: 6,
                                message: "Requiere al menos 6 caracteres",
                              },
                              pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                message: "La contraseña debe contener al menos una letra y un número"
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
                      </div>
                    </div>
                  )
                  }
                  <input
                    type="hidden"
                    {...register("image", {
                      required: {
                        value: true,
                        message: "Confirmación requerida",
                      },
                    })}
                  />
                </div>
              )}
            </div>
            <div className="flex-auto w-full">
              <button disabled={isLoading} type="submit" className="mt-4 py-3 px-4 w-full font-bold text-white bg-gray-900 btn hover:bg-gray-950 dark:bg-purple-500 dark:hover:purple-600">
                {fetching ? <IconLoading height={20} className="text-white" /> : 'Actualizar'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ModalMUI width={{ xs: '100%', lg: '80%', xl: 'auto' }} open={modalOpen} handleClose={handleClose}>
        <div className="relative bg-white p-10 rounded-xl">
          <div className="text-gray-800">
            <h1 className="font-bold text-xl md:text-3xl xl:text-4xl mb-4 text-center">Selecciona el avatar que quieras</h1>
            <button className="absolute top-0 right-0 p-10" onClick={handleClose}><HiX size={25} /></button>
          </div>
          <div className="max-h-[calc(100vh-10rem)] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {!avatars ? (
              <div className="h-40 w-full grid place-content-center">
                <CircularProgress />
              </div>
            ) : (
              Array.isArray(avatars) ? avatars.map((avatar, index) => {
                return (
                  <div className="grid rounded-lg overflow-hidden" key={index}>
                    <Image src={avatar.src} className="h-auto w-full" width={125} height={125} alt={avatar.label} />
                    <button type="button" title="Seleccionar avatar" className="text-base bg-purple-600 text-white font-bold p-2" disabled={avatar.label === selectedAvatar?.id} onClick={() => handleImageClick(avatar.label)}>{avatar.label === selectedAvatar?.id ? "Actual" : "Seleccionar"}</button>
                  </div>
                );
              }) : <div>Error: avatars no es un array</div>
            )}
          </div>
        </div>
      </ModalMUI>
    </div>
  );
}