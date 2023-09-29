import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';


connect();

export async function POST(request: NextRequest){
    const body = await request.json();
    const { email } = body;
    
    try {
        const user = await User.findOne({ email });
        
        if(!user){
            return NextResponse.json({
                status:false
            }, {status:400})
        };

        await sendEmail({email, emailType: "RESET", userID: user._id})
        
        return NextResponse.json({
            status:true
        }, {status:200})
    } catch (error) {
        return NextResponse.json({
            message:"Internal Server Error"
          },{status: 500})
    }
}