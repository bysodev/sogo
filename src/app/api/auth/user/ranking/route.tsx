
const url = process.env.NEXT_PUBLIC_API_BACKEND
import { getServerSession } from "next-auth";
import { config } from "../../[...nextauth]/route";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category')
    const myHeaders = new Headers();
    const session = await getServerSession(config);
    myHeaders.append('Authorization', `Bearer ${session?.user.accessToken}`);
    myHeaders.append("Content-Type", "application/json");
    try {

        const response = await fetch(`${url}/user/ranking?category=${category}`, {
            method: "GET",
            headers: myHeaders,
            credentials: "include",
            redirect: "follow",
        });
        const body = await response.json()
        if (response.status === 200) {
            return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }
        return new Response(body.detail, { status: response.status })
    } catch (error) {
        return new Response('No se logro la petición', {
            status: 501,
        })
    }
}