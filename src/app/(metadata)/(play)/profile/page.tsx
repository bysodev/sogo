"use client"
import ModalMUI from "@/components/ModalMUI";
import { showErrorToast, showSuccessToast } from "@/utilities/sweet-alert";
import CircularProgress from '@mui/material/CircularProgress';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiX } from 'react-icons/hi';
import useSWR from 'swr';


const url = process.env.NEXT_PUBLIC_ROUTE_APP;
const IMAGE_PROVIDER = "https://api.dicebear.com/7.x/fun-emoji/jpg";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProfilePage() {
  const { data: user, error, mutate } = useSWR(`${url}/api/auth/user/profile`, fetcher, { revalidateOnFocus: false });
  const { data: session, update } = useSession();
  const [modalOpen, setModalOpen] = useState(false); // state to control the modal

  const { data: avatars, error: avatarsError } = useSWR(session?.user?.image, async (image) => {
    const avatars = [];
    for (let i = 1; i <= 18; i++) {
      let randomString;
      if (i === 1) {
        // validate if session user image begins with https or not
        if (image.startsWith('https')) {
          avatars.push({
            src: image,
            label: image,
            id: i
          });
        } else {
          randomString = image || Math.random().toString(36).substring(2, 15);
        }
      } else {
        randomString = Math.random().toString(36).substring(2, 15);
      }
      const avatarUrl = await fetch(`${IMAGE_PROVIDER}?seed=${randomString}`).then(res => res.url);
      const label = avatarUrl.split('jpg?seed=')[1];
      avatars.push({
        src: avatarUrl,
        label: label,
        id: i
      });
    }
    return avatars;
  }, { revalidateOnFocus: false });

  const handleOpen = () => setModalOpen(true); // function to open the modal
  const handleClose = () => setModalOpen(false); // function to close the modal

  async function handleUpdate(e: any) {
    e.preventDefault();
    const { username, image } = e.target
    if (!username.value || !image.value) {
      showErrorToast('Campos vacíos')
      return;
    }
    const updatedUser = {
      username: username.value,
      image: image.value,
    };
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
    } catch (error) {
      throw new Error('La actualización de datos de perfil falló');
    }
  }
  const [selectedAvatar, setSelectedAvatar] = useState<{ url: string, id: string } | null>(null);

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

  if (error) return <div>Error al cargar los datos del usuario</div>
  if (!user) return <div>Cargando...</div>

  return (
    <div className="w-full p-12">
      <div className="p-4 rounded-md border flex flex-row gap-6">
        {!selectedAvatar ? <CircularProgress />
          : (
            <Image
              onClick={handleOpen}
              className="bg-slate-400 rounded-lg"
              src={selectedAvatar?.url}
              alt=""
              height={200}
              width={200}
            />
          )}
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
                avatars.map((avatar, index) => {
                  return (
                    <div className="grid rounded-lg overflow-hidden" key={index}>
                      <Image src={avatar.src} className="h-auto w-full" width={125} height={125} alt={avatar.label} />
                      <button type="button" title="Seleccionar avatar" className="text-base bg-purple-600 text-white font-bold p-2" disabled={avatar.label === selectedAvatar?.id} onClick={() => handleImageClick(avatar.label)}>{avatar.label === selectedAvatar?.id ? "Actual" : "Seleccionar"}</button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </ModalMUI>
        <form className="flex flex-col justify-around w-full" onSubmit={handleUpdate}>
          <div className="flex-auto w-full flex flex-col justify-evenly">
            <label>
              Nombre de usuario:
              <input type="text" name="username" defaultValue={user.data.username} />
            </label>
            <label>
              Email:
              <input type="email" name="email" defaultValue={user.data.email} />
            </label>
            <label>
              Creación:
              <input disabled={true} type="text" name="creation" defaultValue={user.data.creation} />
            </label>
            <label>
              Avatar:
              <input type="hidden" name="image" value={selectedAvatar?.id} />
            </label>
          </div>
          <div className="flex-auto w-full">
            <button type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}