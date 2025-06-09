"use client";
import * as React from "react";
import { getUser } from "@/lib/auth";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Users2,
  Mail,
  Phone,
  Flame,
  BookUser,
  ShieldCheck,
} from "lucide-react";
import { useAddJustificationsMutation } from "@/store/api/justificationApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Utilisateur } from "@/lib/types";

const justificationSchema = z.object({
  date: z.string().min(1, "La date est requise"),
  motif: z.string().min(10, "Le motif doit contenir au moins 10 caractères"),
});

type JustificationFormData = z.infer<typeof justificationSchema>;

export default function AdminPage() {
  const user = getUser() as Utilisateur;
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [addJustification, { isLoading }] = useAddJustificationsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JustificationFormData>({
    resolver: zodResolver(justificationSchema),
  });

  const onSubmit = async (data: JustificationFormData) => {
    try {
      await addJustification({
        ...data,
        userId: user?.id,
      }).unwrap();
      toast.success("Justification envoyée avec succès");
      reset();
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la justification");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className=" space-y-5">
          <h1 className="text-5xl font-bold leading-tight">
            Bonjour {user?.firstName} {user?.lastName}👋,
            <br /> Bienvenue sur votre tableau de bord !
          </h1>
          <p className="text-lg">
            Vous êtes connecté en tant qu&apos;utilisateur. Vous pouvez
            soumettre et consulter vos justifications d&apos;absence.
          </p>
        </div>
        <div className="flex items-start   flex-col gap-2">
          <h2 className="text-2xl font-bold">Calendrier</h2>
          <p className="text-sm text-muted-foreground">
            Prévisionnel de votre absence
          </p>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
        </div>
      </div>
      <div className="flex items-start justify-between gap-5">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold">
            Nouvelle justification d&lsquo;absence
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-lg p-5 rounded-md mt-5 space-y-5"
          >
            <div className="space-y-2">
              <Input
                type="date"
                {...register("date")}
                className="w-full"
                placeholder="Date"
                label="Ajouter la date de l'absence"
                required
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Textarea
                required
                label="Ajouter le motif de l'absence"
                placeholder="Motif"
                {...register("motif")}
                className="w-full min-h-[150px]"
              />
              {errors.motif && (
                <p className="text-sm text-red-500">{errors.motif.message}</p>
              )}
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Envoi en cours..." : "Envoyer"}
            </Button>
          </form>
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-bold">Informations personnelles</h2>
          <div className="shadow-lg p-5 rounded-md mt-5 space-y-5 grid grid-cols-2 gap-5">
            <p className="flex items-center gap-2">
              <Users2 /> {user?.firstName} {user?.lastName}
            </p>
            <p className="flex items-center gap-2">
              <Phone /> {user?.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail /> {user?.email}
            </p>
            <p className="flex items-center gap-2">
              <Flame /> {user?.gender}
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck />
              {user?.role}
            </p>
            <p className="flex items-center gap-2">
              <BookUser />
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
