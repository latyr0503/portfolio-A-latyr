"use client";
import { CalendarOff, FileText } from "lucide-react";
import {
  useGetJustificationsQuery,
  JustificationResponse,
  useDeleteJustificationsMutation,
  useUpdateJustificationsMutation,
} from "@/store/api/justificationApi";
import { getUser } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Utilisateur } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Ellipsis, SquarePen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
export default function AbsencePage() {
  const user = getUser() as Utilisateur;
  const { data, isLoading, error, refetch } = useGetJustificationsQuery();
  const [deletePost, { isLoading: isDeleting }] =
    useDeleteJustificationsMutation();
  const [updatePost, { isLoading: isUpdating }] =
    useUpdateJustificationsMutation();
  const [editingJustification, setEditingJustification] =
    useState<JustificationResponse | null>(null);
  const [editMotif, setEditMotif] = useState<string>("");
  const [editDate, setEditDate] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="w-full h-32" />
          </div>
        ))}
      </div>
    );
  }
  if (isDeleting || isUpdating) {
    return <div>Chargement...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleEdit = (justification: JustificationResponse) => {
    setEditingJustification(justification);
    setEditMotif(justification.motif);
    setEditDate(justification.date);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingJustification) return;

    try {
      await updatePost({
        id: editingJustification.id.toString(),
        motif: editMotif,
        date: editDate,
        userId: editingJustification.user.id,
      }).unwrap();
      toast.success("Post modifié avec succès");
      setEditingJustification(null);
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la modification du post");
    }
  };

  const handleDelete = async (justificationId: number) => {
    try {
      await deletePost(justificationId.toString()).unwrap();
      toast.error("Post supprimé avec succès");
      console.log(justificationId);
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression du post");
    }
  };

  const justificationData = data?.filter(
    (justification) => justification.user.id === user?.id
  ) as JustificationResponse[];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">L&apos;historique de mes absences</h1>
      <div className="grid grid-cols-3 gap-5">
        {justificationData?.length === 0 ? (
          <p className="text-muted-foreground">Aucune absence enregistrée</p>
        ) : (
          justificationData?.map(
            (item: JustificationResponse, index: number) => (
              <div
                key={index}
                className="w-full min-h-[200px] bg-white shadow-lg rounded-md p-4 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <CalendarOff />
                    Absence du {new Date(item.date).toLocaleDateString("fr-FR")}
                  </h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleEdit(item)}
                      >
                        <SquarePen className="mr-1" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash className="mr-1" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-base text-muted-foreground flex items-center gap-2">
                  <FileText />
                  <span
                    className={`${
                      expandedIndex === index ? "" : "line-clamp-4"
                    }`}
                  >
                    {item.motif}
                  </span>
                </p>
                {item.motif.length > 100 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                  >
                    {expandedIndex === index ? "Voir moins" : "Voir plus"}
                  </Button>
                )}
              </div>
            )
          )
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier la justification</DialogTitle>
            <DialogDescription>
              Modifiez les détails de votre absence
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            <Input
              id="date"
              type="date"
              label="Date de l'absence"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="w-full"
            />

            <Textarea
              id="motif"
              label="Motif de l'absence"
              value={editMotif}
              onChange={(e) => setEditMotif(e.target.value)}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
