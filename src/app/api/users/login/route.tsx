import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest){
  const reqBody = await request.json();
  const { email, password } = reqBody;
  
  try {
    
    const user = await User.findOne({ email });
    
    if(!user){
      return NextResponse.json({
        message:"Enter Valid Details"
      }, {status:400})
    };

    const authStatus = await bcryptjs.compare(password, user.password);
   
    if(!authStatus){
      return NextResponse.json({
        message:"User Login Failed",
        status: "Failed"
      },{status: 400})
      
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    
    const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1hr" });

    const response = NextResponse.json({
      message:"User Login Success",
      status: "Success",
      user:tokenData,
      jwtToken
    },{status: 200});

    response.cookies.set("token", jwtToken, {
      httpOnly: true
    })

    return response

  } catch (error : any) {
    return NextResponse.json({
      message:"Internal Server Error"
    },{status: 500})
  }

}