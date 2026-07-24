"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
const page = () => {
    const handleGoogleLogin = () => {
        console.log('....')
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
            Sign in to continue to your account
        </p>
        <button onClick={() => signIn("google")} className="flex items-center mb-10 cursor-pointer justify-center w-full px-4 py-2 border-2 border-gray-200 rounded-lg text-black">
           <Image src="/icons/google.png" alt="google" width='30' height='30' className="mr-2.5"/> 
           Continue with Google
        </button>
      </div>
    </div>
  );
};

export default page;
