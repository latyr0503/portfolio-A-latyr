"use client";
import React from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useLoginMutation } from "@/store/api/authApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@/lib/types";

interface ApiLoginResponse {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    gender: string;
    createdAt: string;
    role: UserRole;
  };
  token: string;
}

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = (await login({
        email: data.email,
        password: data.password,
      }).unwrap()) as unknown as ApiLoginResponse;

      if (response.token && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));

        Cookies.set("user", JSON.stringify(response.user), {
          expires: 7,
          path: "/",
          sameSite: "strict",
        });

        Cookies.set("token", response.token, {
          expires: 7,
          path: "/",
          sameSite: "strict",
        });

        toast.success(
          "Connexion réussie! Nous vous redirigeons vers votre tableau de bord."
        );

        if (response.user.role === "ADMIN") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/user");
        }
      } else {
        toast.error("Échec de la connexion. Veuillez réessayer.");
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err.data as { detail?: string };
        toast.error(`Erreur: ${errorData.detail || "Identifiants incorrects"}`);
      } else {
        console.error("Une erreur inattendue s'est produite:", err);
        toast.error(
          "Une erreur inattendue s'est produite. Veuillez réessayer."
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Input
          required
          type="email"
          {...register("email")}
          placeholder="exemple@email.com"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          aria-label="Adresse email"
          label="Votre email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          required
          type="password"
          {...register("password")}
          placeholder="••••••••"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          aria-label="Mot de passe"
          label="Mot de passe"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        aria-label={isLoading ? "Connexion en cours" : "Se connecter"}
      >
        {isLoading ? "Connexion en cours..." : "Se connecter"}
      </Button>

      {error && (
        <div className="text-red-600 text-sm">
          Une erreur est survenue lors de la connexion
        </div>
      )}
    </form>
  );
} 