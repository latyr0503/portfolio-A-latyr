"use client";
import React, { useState } from "react";
import { getUser } from "@/lib/auth";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import avatar from "@/public/media/time.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import TablePointage from "@/components/table-pointage";
import { useUsersQuery } from "@/store/api/authApi";
import { Utilisateur } from "@/lib/types";
import { useAddPointageMutation } from "@/store/api/pointageApi";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const pointageSchema = z.object({
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  date: z.string().min(1, "La date est requise"),
  heure_arrivee: z.string().min(1, "L'heure d'arrivée est requise"),
  statut: z.string().min(1, "Le statut est requis"),
});

type PointageFormData = z.infer<typeof pointageSchema>;

export default function AdminPage() {
  const user = getUser();
  const { data: users, isLoading, error } = useUsersQuery();

  const usersData = users?.filter(
    (user) => user.role === "USER"
  ) as Utilisateur[];
  const [addPointage, { isLoading: isAddingPointage }] =
    useAddPointageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PointageFormData>({
    resolver: zodResolver(pointageSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      statut: "present",
      heure_arrivee: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const onSubmit = async (data: PointageFormData) => {
    try {
      const selectedUser = usersData?.find((user) => user.phone === data.phone);
      if (!selectedUser) {
        toast.error("Utilisateur non trouvé");
        return;
      }

      const pointageData = {
        userId: selectedUser.id,
        date: data.date,
        heure_arrivee: data.heure_arrivee,
        statut: data.statut,
      };

      await addPointage(pointageData).unwrap();

      toast.success("Pointage enregistré avec succès");
      reset();
    } catch (error) {
      toast.error("Erreur lors de l&apos;enregistrement du pointage");
      console.error("Erreur de pointage:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 md:gap-6">
        <div className="w-2/3 ">
          <div className="flex items-center justify-between bg-pink-500 h-[175px] rounded-xl space-x-5 p-5 my-[100px]">
            <div className="space-y-4 text-white">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Bonjour {user?.firstName} {user?.lastName} 👋
              </h1>
              <p className="text-base">
                Ajouter les entrées et sorties de votre personnel et gérer les
                utilisateurs
              </p>
            </div>
            <Image width={400} height={400} src={avatar.src} alt="avatar" />
          </div>
        </div>
        <div className="w-1/3  bg-sky-500 rounded-xl p-5 text-white">
          <h2 className="text-xl md:text-4xl font-bold tracking-tighter mb-2">
            Pointage
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="phone"
              list="Employees"
              placeholder="Numéro de téléphone"
              className="w-full text-gray-800"
              {...register("phone")}
              required
              label="Numéro de téléphone"
              error={errors.phone?.message}
            />
            <datalist id="Employees">
              {usersData?.map((user) => (
                <option key={user.id} value={user.phone}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </datalist>

            <Input
              id="date"
              type="date"
              required
              label="Date du jour"
              error={errors.date?.message}
              className="w-full text-gray-800"
              {...register("date")}
            />

            <Input
              id="heure_arrivee"
              type="time"
              required
              label="Heure d'arrivée"
              error={errors.heure_arrivee?.message}
              className="w-full text-gray-800"
              {...register("heure_arrivee")}
            />

            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select
                onValueChange={(value) => setValue("statut", value)}
                defaultValue="present"
              >
                <SelectTrigger id="statut" className="text-gray-800">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="present">Présent</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="retard">Retard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.statut && (
                <p className="text-sm text-red-500">{errors.statut.message}</p>
              )}
            </div>

            <Button
              disabled={isAddingPointage}
              type="submit"
              className="w-full mt-4"
            >
              {isAddingPointage ? "Enregistrement en cours..." : "Enregistrer"}
            </Button>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <TablePointage />
        {/* <SectionCards /> */}
        <h2 className="text-2xl font-bold text-muted-foreground">
          Statistiques (à venir)
        </h2>
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
