import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
    console.log("api/user page");
    try {
        const session = await getServerSession(authOptions);
        if (session.user) {
        return NextResponse.json({
            user: session.user,
            password: session.password
        })
    }
        
    } catch (error) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 403
        })

    }
    
}