import { getServerSession } from "next-auth/next";
import { NextResponse } from 'next/server';
import { config } from "./../[...nextauth]/route";

const url = process.env.NEXT_PUBLIC_API_BACKEND;

export async function GET() {
    const session = await getServerSession(config);
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    myHeaders.append('Authorization', `Bearer ${session?.user.accessToken}`);
    try {
        const response = await fetch(`${url}/challenge/search/me?category=PALABRAS`, {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow',
        });
        const dic_data = await response.json();
        if (response.status === 200) {
            return NextResponse.json(dic_data);
        }
        return NextResponse.error();
    } catch (error) {
        return NextResponse.error();
    }
}