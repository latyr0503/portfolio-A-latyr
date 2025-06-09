"use client";
import React from "react";
import Link from "next/link";
import { SignupForm } from "./register-form";


export default function SignupPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute -z-30 left-0 top-0 w-[250px] h-[250px] blur-3xl rounded-full bg-sky-500 opacity-20"></div>
      <div className="absolute -z-30 w-[450px] bottom-0 right-0 h-[450px] blur-3xl rounded-full bg-pink-500 opacity-20"></div>
      <div className="max-w-md w-full space-y-6 z-0">
        <div>
          <h2 className="text-start text-3xl font-extrabold text-gray-900">
            Inscription
          </h2>
          <p className="text-start text-sm text-gray-500">
            Créez un compte pour accéder à votre espace
          </p>
        </div>
        <SignupForm />
        <div className="text-start text-sm text-gray-500">
          <Link href="/auth/login">Déjà inscrit ? Connectez-vous</Link>
        </div>
      </div>
    </div>
  );
}
