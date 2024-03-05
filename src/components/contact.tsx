import ModalMUI from '@/components/ModalMUI';
import WhatsAppLink from '@/components/WhatsAppLink';
import textFieldStyles from "@/utilities/stylesMUI";
import { showErrorToast, showSuccessToast } from '@/utilities/sweet-alert';
import { rgxEmail } from '@/validators/auth-validators';
import { Modal, TextareaAutosize } from '@mui/material';
import TextField from '@mui/material/TextField';
import Image from "next/image";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from "react-icons/fa";
import { HiX } from 'react-icons/hi';
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import IconLoading from './icons/IconLoading';
import { showErrorToast, showSuccessToast } from "@/utilities/sweet-alert";

const url_app = process.env.NEXT_PUBLIC_ROUTE_APP

async function fetchContact(username: string, email: string, topic: string, message: string) {
  const myHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
  try {
    const response = await fetch(`${url_app}/api/emails/contact`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        subject: topic,
        message,
      }),
      headers: myHeaders,
      redirect: 'follow',
    });
    if (!response.ok) {
      throw new Error('Error al enviar el mensaje');
    }
    return response;
  } catch (e) {
    throw new Error('Error al procesar la solicitud');
  }
}

export default function Contact() {

  const [open, setOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  interface UseFormInputs {
    username: string;
    email: string;
    topic: string;
    message: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UseFormInputs>({ mode: "onSubmit" });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContactFormOpen = () => {
    setContactFormOpen(true);
  };

  const handleContactFormClose = () => {
    setContactFormOpen(false);
  };

  const handleContactFormSubmit = async (data: UseFormInputs) => {
    setIsLoading(true);
    const response = await fetchContact(data.username, data.email, data.topic, data.message);
    if (!response?.ok)
      showErrorToast(await response?.text());
    if (response?.status === 200) {
      showSuccessToast('Correo enviado correctamente');
      reset();
    }
    setIsLoading(false);
    setContactFormOpen(false);
    setOpen(false);
  };

  const handleClick = () => {
    showErrorToast('Deshabilitado temporalmente hasta que integrar un número de télefono institucional');
    setOpen(false);
  };
  
  return (
    <section id='contact' className="bg-gray-900 text-white overflow-hidden">
      {/* Illustration behind hero content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative ">
        <Image className="absolute end-0 opacity-25 z-0" src={"/images/hand-3d-bg.png"} width={540} height={405} alt="Features 03" />
        <div className="py-12 md:py-20 z-10">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-purple-600 bg-purple-200 rounded-full mb-4">Contacto</div>
            <h1 className="h2 mb-4">¿Tienes alguna sugerencia?</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">Puedes escribirnos directamente para comentarnos cualquier duda o sugerencia.</p>
          </div>
          {/* Section contact */}
          <div className="text-center z-10 relative">
            <a onClick={handleOpen} className="btn bg-purple-500 cursor-pointer hover:bg-purple-600">Contactar  <FaArrowRight className="ms-2" /></a>
            <ModalMUI width={{ xs: '90%', sm: 'auto' }} open={open} handleClose={() => { handleClose() }}>
              <div className='bg-white rounded-lg p-6'>
                <div className="flex justify-between">
                  <h2 className='font-semibold'>Escoger método de contacto:</h2>
                  <button onClick={() => { setOpen(false) }} className="text-gray-400" type='button' title='Cerrar ventana'><HiX /></button>
                </div>
                <hr className='my-4' />
                <div className="grid grid-cols-2 gap-4">
{/*                   <WhatsAppLink >
                    <IoLogoWhatsapp />
                    <span>WhatsApp</span>
                  </WhatsAppLink> */}
                  <a
                    title="Enviar mensaje por WhatsApp"
                    className="btn text-white whitespace-nowrap flex gap-2 bg-green-500 hover:bg-green-600"
                    onClick={handleClick}
                  >
                    <IoLogoWhatsapp />
                    <span>WhatsApp</span>
                  </a>
                  <a onClick={handleContactFormOpen} className="cursor-pointer btn text-white whitespace-nowrap flex gap-2 bg-purple-500 hover:bg-purple-600">
                    <MdEmail />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </ModalMUI>
            <Modal
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowY: 'auto',
              }}
              open={contactFormOpen} onClose={() => handleContactFormClose()}>
              <div className='bg-white self-start md:self-center rounded-lg p-6 grid lg:grid-cols-2 place-items-center gap-8 relative overflow-y-auto'>
                <button onClick={() => { setContactFormOpen(false) }} className="absolute top-0 right-0 m-4 text-gray-400" type='button' title='Cerrar ventana'><HiX /></button>
                <Image className='hidden lg:block' alt='Imagen lateral para el formulario de contacto Sogo Sign' src="/src/email-contact.svg" height={300} width={300} priority />
                <form autoComplete="off" onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(handleContactFormSubmit)(e);
                }}>
                  <h1 className='text-purple-500 font-bold mb-4 text-2xl'>Contáctanos:</h1>
                  <div className="grid gap-4">
                    <div className="flex gap-4 flex-col md:flex-row md:columns-2">
                      <TextField
                        autoComplete="nombre"
                        sx={textFieldStyles}
                        disabled={isLoading}
                        className={`focus:outline-none btn w-full bg-transparent focus:bg-transparent border shadow-none border-gray-400  dark:text-gray-200`}
                        type="text"
                        label="Nombre"
                        size="small"
                        {...register("username", {
                          required: { value: true, message: "Nombre requerido" },
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
                        autoComplete="correo electrónico"
                        sx={textFieldStyles}
                        disabled={isLoading}
                        className={`focus:outline-none btn w-full bg-transparent focus:bg-transparent border shadow-none border-gray-400  dark:text-gray-200`}
                        type="email"
                        label="Correo electrónico"
                        size="small"
                        {...register("email", {
                          required: { value: true, message: "Correo requerido" },
                          pattern: {
                            value: rgxEmail,
                            message: "Correo electrónico no válido",
                          },
                        })}
                        error={Boolean(errors.email)}
                        helperText={errors.email && errors.email.message}
                      />
                    </div>
                    <TextField
                      autoComplete="asunto"
                      sx={textFieldStyles}
                      disabled={isLoading}
                      className={`focus:outline-none btn w-full bg-transparent focus:bg-transparent border shadow-none border-gray-400  dark:text-gray-200`}
                      type="text"
                      label="Asunto"
                      size="small"
                      {...register("topic", {
                        required: { value: true, message: "Asunto requerido" },
                        minLength: {
                          value: 4,
                          message: "Requiere al menos 4 caracteres",
                        },
                        maxLength: {
                          value: 50,
                          message: "Máximo 50 caracteres",
                        },
                      })}
                      error={Boolean(errors.topic)}
                      helperText={errors.topic && errors.topic.message}
                    />
                    <div>

                      <TextareaAutosize
                        autoComplete="mensaje"
                        placeholder='Mensaje...'
                        disabled={isLoading}
                        className={`${errors.message && "border-red-500"} focus:outline-none ps-4 btn w-full bg-transparent focus:bg-transparent border shadow-none border-gray-400  dark:text-gray-200`}
                        minRows={3}
                        {...register("message", {
                          required: { value: true, message: "Mensaje requerido" },
                          minLength: {
                            value: 4,
                            message: "Requiere al menos 4 caracteres",
                          },
                          maxLength: {
                            value: 255,
                            message: "Máximo 255 caracteres",
                          },
                        })}
                      />
                      {errors.message && <p className="ps-1 text-xs text-red-500">{errors.message.message}</p>}
                    </div>
                  </div>
                  <button
                    title="Iniciar Sesión"
                    disabled={isLoading}
                    className="mt-6 py-3 px-4 w-full font-bold text-white bg-gray-900 btn hover:bg-gray-950 dark:bg-purple-500 dark:hover:bg-purple-600"
                    type="submit"
                    id="submit-login"
                  >
                    {isLoading ? <IconLoading height={20} width={20} className="text-white" /> : 'Enviar'}
                  </button>
                </form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </section >
  )
}
