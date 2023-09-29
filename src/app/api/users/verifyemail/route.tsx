import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const { token } = body;
        console.log(token)
        let user = await User.findOne({
            verifiedToken: token ,
            verifiedTokenExpiry: {$gt:Date.now()} 
        });
        
        if(!user){
            user = await User.findOne({
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: {$gt:Date.now()}
            });
            console.log(user)
            if(!user){
                return NextResponse.json({error: "Invalid Token"}, {status: 400})
            }

            await user.save();

            return NextResponse.json({
                message: "Email verified successfully",
                success: true
            })
            
        }

        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verifiedTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}