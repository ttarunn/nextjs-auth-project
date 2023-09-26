import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'


connect();

export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {username, email, password} = reqBody;

    const user = await User.findOne({ email });

    if(user){
      return NextResponse.json({message: "User Already Exists"}, {status:400});
    }

    const genSalt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(password, genSalt)

    const userToBeSave = new User({
      email: email,
      username: username,
      password: encryptedPassword
    });

    const savedUser = await userToBeSave.save()

    console.log(savedUser);
    return NextResponse.json({
      message:"User Created Successfully",
      success: true,
      savedUser
    })
}catch(error:any){
  return NextResponse.json({message:"error in signupp route", error:error.message},{status:500})
}
}