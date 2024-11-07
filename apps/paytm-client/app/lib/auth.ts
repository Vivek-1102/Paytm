// @ts-ignore
import db from "@repo/db/client";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt";



export const authOptions = {
    providers :[
        CredentialsProvider({
           name: "Credentials",
           credentials: {
            phone: {label: "Phone Number", type:"text", placeholder:"123123123", required: true },
            password: {label:"Password", type:"password", required: true }
           },
           
           async authorize(credentials:any){
            console.log("hit the authorize function");
            // DO zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password,10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            console.log("2");
            
            if(existingUser){
                console.log("Before passwordValidation");
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if(passwordValidation){
                    console.log("Inside passwordValidation");
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                console.log("created mj success");
                const user = await db.user.create({
                    data:{
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
                console.log("created success");
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e){
                console.log("error detected");
                console.error(e);
            }
            console.log("Inside passwordValidation");

            return null

           },

        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({token,session}:any){
            session.user.id = token.sub
            return session
        }
    }
}