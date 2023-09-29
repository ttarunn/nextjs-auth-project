import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs"

connect();

export async function PUT(request: NextRequest){
    const body = await request.json();
    const { token, password } = body;
    const hashedPwd = await bcrypt.hash(password.password.toString(), 10);
    try {
        
        const user = await User.findOne({ forgotPasswordToken: token });
        console.log("old",user)
        if(!user){
            return NextResponse.json({
                status:false
            }, {status:400})
        };

        user.password = hashedPwd
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        console.log("new",user)
        return NextResponse.json({
            status:true
        }, {status:201})
    } catch (error) {
        return NextResponse.json({
            message:"Internal Server Error"
          },{status: 500})
    }
}