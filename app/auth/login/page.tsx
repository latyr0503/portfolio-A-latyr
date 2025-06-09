"use client";
import React from "react";
import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute -z-30 left-0 top-0 w-[250px] h-[250px] blur-3xl rounded-full bg-sky-500 opacity-20"></div>
      <div className="absolute -z-30 w-[450px] bottom-0 right-0 h-[450px] blur-3xl rounded-full bg-pink-500 opacity-20"></div>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-start text-3xl font-extrabold text-gray-900">
            Connexion
          </h2>
          <p className="text-start text-sm text-gray-500">
            Connectez-vous pour accéder à votre espace
          </p>
        </div>
        <LoginForm />
        <div className="text-start text-sm text-gray-500">
          <Link href="/auth/register">Pas encore inscrit ? Inscrivez-vous</Link>
        </div>
      </div>
    </div>
  );
}
