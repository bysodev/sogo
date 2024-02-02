"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_API_BACKEND
const defaultImage = "/lesson/vocals/letra_A.jpg";

async function getDataProfile(token: string){
  // myHeaders.append("Authorization", `Bearer ${user?.user?.accessToken}`);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(`${url}/user/users/me`, {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
    });

    if (response.status === 200) {
      const user = await response.json()
      console.log(user)
      return user
    }else{
      return null
    }
     
    
  } catch (error) {
    console.log(error)
    return null;
  }
}

export default function ProfilePage() { 
  const { data: session } = useSession();
  const [user, setUser] = useState({'username': '', 'email': '', 'creation': ''});
  
  useEffect(() => {
    if( session?.user.accessToken !== undefined && user.username === '' ){
      (
        async () => {
          console.log(`Este es el token: ${session?.user.accessToken}`)
          const respuesta = await getDataProfile( session?.user.accessToken || '' )
          if (respuesta !== null)
            setUser(respuesta)
        }
      )()
    }

  }, [session?.user.accessToken, user])

  return (
    <div className='w-full p-12'>
      <div className="p-4 rounded-md border flex flex-row gap-6">
        <Image className="bg-slate-400 rounded-lg" src={defaultImage} alt='' height={200} width={200} />
        <div className="flex flex-col justify-around w-full">
          <div className="flex-auto w-full flex flex-col justify-evenly">
            <h1>{user.username}</h1>
            <h1>{user.email}</h1>
            <h1>{user.creation}</h1>
          </div>
          <div className="flex-auto w-full">

          </div>
        </div>
      </div>
      {/* <pre>{ JSON.stringify( user )}</pre> */}
    </div>
  );
}

