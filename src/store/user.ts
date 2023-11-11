import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { typeUser } from "@/types/user";
import { Category, category, typeLearn } from "@/types/learn";
import Cookies from "js-cookie";
import { showErrorMessage, showSuccessMessage } from "@/utilities";
// import { sendEmail } from "@/helpers/nodemailer";

const url = process.env.NEXT_PUBLIC_API_BACKEND + "";
const url_app = "http://localhost:3000";

interface State {
  user: typeUser | null;
  learn: typeLearn;
  token: string;
  validate: string;
  fetchLoginUser: (username: string, password: string) => Promise<boolean>;
  fetchRegisterUser: (name: string, password: string, email: string) => void;
  fetchVerifyUser: (token: string) => void;
}
// persist(
export const zustandStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      learn: {
        asiertos: 0,
        cantidad: 0,
        continue: false,
        porcentaje: 0,
        categoria: Category.null,
      },
      token: "",
      validate: "",

      fetchLoginUser: async (username: string, password: string) => {
        var myHeader = new Headers();
        myHeader.append("Accept", "application/json");
        myHeader.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("password", password);

        try {
          const response = await fetch(`${url}/user/token`, {
            method: "POST",
            body: urlencoded,
            headers: myHeader,
            credentials: "include",
            // credentials: 'same-origin',
            redirect: "follow",
          });
          if (response.status === 200) {
            const { access_token, respuesta, username, email } =
              await response.json();
            console.log({ access_token, respuesta });
            Cookies.set("token", access_token);
            set(() => ({ user: { username, email, token: access_token } }));
            showSuccessMessage(respuesta.respuesta);
            return true;
          } else {
            if (response.status === 401) {
              const respu = await response.json();
              showErrorMessage(respu.detail);
            }

            if (response.status === 500)
              showErrorMessage("Error en el servidor");

            console.log(response.status);
            return false;
          }
        } catch (error) {
          showErrorMessage("Problemas con la aplicación");
          console.error(error);
          return false;
        }
        // console.log(process.env.API_BACKEND)
        // const res = await fetch('http://localhost:3000/api/user/login');
      },
      fetchRegisterUser: async (
        username: string,
        password: string,
        email: string
      ) => {
        var myHeader = new Headers();
        myHeader.append("Accept", "application/json");
        myHeader.append("Content-Type", "application/json");

        console.log(
          JSON.stringify({
            username: username,
            password: password,
            email: email,
          })
        );

        try {
          const response = await fetch(`${url}/user/`, {
            method: "POST",
            body: JSON.stringify({
              username: username,
              password: password,
              email: email,
            }),
            headers: myHeader,
            redirect: "follow",
          });
          if (response.status === 201) {
            const respuesta = await response.json();
            showSuccessMessage("Usuario registrado correctamente");

            try {
              const response = await fetch(`${url_app}/api/emails/`, {
                method: "POST",
                body: JSON.stringify({
                  username,
                  email,
                  token: respuesta.token,
                }),
                headers: myHeader,
                redirect: "follow",
              });
              if (response.ok) {
                showSuccessMessage(
                  "El correo de verificación fue revisado exitosamente"
                );
              }
            } catch (e) {
              showErrorMessage(
                "El correo de verificación no pudo ser enviado!! Comuniquese con la administración"
              );
            }
          }
          if (response.status === 422) {
            showErrorMessage("Fallo al no enviar los datos conpletos");
          }
        } catch (error) {
          console.error(error);
          showErrorMessage(
            "Fallo al registrarse, comuniquese con la administración"
          );
        }
        // console.log(process.env.API_BACKEND)
        // const res = await fetch('http://localhost:3000/api/user/login');
      },
      fetchVerifyUser(token: string) {},
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
