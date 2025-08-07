import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminAuth } from "@/functions/firebase-admin";
import { adminAuthLMS, adminFirestoreLMS, FieldValue } from "@/functions/firebase-admin-lms";
import { serverTimestamp } from "firebase/firestore";

function generateRandomPassword(length: number = 12): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    
    const { email, displayName, LMSCreation } = body;

    if (!email || !displayName) {
      return NextResponse.json(
        { error: "Missing email or display name" },
        { status: 400 }
      );
    }

    const password = generateRandomPassword(12);

    const userRecordLMS = await adminAuthLMS.createUser({
      email,
      password,
      displayName,
      emailVerified: false,
      disabled: false,
    });

    await adminFirestoreLMS.collection("users").doc(userRecordLMS.uid).set({
      createdAt: FieldValue.serverTimestamp(),
      email: email,
      name: displayName,
      uid: userRecordLMS.uid,
      courses: []
    })
    
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "dilan@nanosatellitemissions.com",
        pass: "z$Y6C;xm:9E~",
      },
    });

    const mailOptionsLMS = {
      from: "dilan@nanosatellitemissions.com",
      to: email,
      subject: "Your Account for the courses has been Created",
      text: `Hello ${displayName},\n\nYour account on has been successfully created. Here are your credentials:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in for security reasons.\n\nBest regards,\nNMD ASSOCIATION`,
    };
    
    await transporter.sendMail(mailOptionsLMS);

    return NextResponse.json({
      message: "User created successfully",
      userId: userRecordLMS.uid,
      password: password
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}