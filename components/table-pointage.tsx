"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Ellipsis, SquarePen, Trash } from "lucide-react";
import {
  useDeletePointageMutation,
  useGetPointageQuery,
  useUpdatePointageMutation,
} from "@/store/api/pointageApi";
import { PointageResponse, UpdatePointage } from "@/store/api/pointageApi";
import { Input } from "./ui/input";
import { toast } from "sonner";

const TABLE_HEADERS = [
  "Nom complet",
  "Numero",
  "Date",
  "Heure d'arriver",
  "Heure de départ",
  "status",
  "action",
] as const;

interface PersonnelRowProps {
  pointage: PointageResponse;
  refetch: () => void;
}

interface PaginationProps {
  nombreElements?: number; // Rendu optionnel avec une valeur par défaut
}

function PersonnelRow({
  pointage,
  onEdit,
  refetch,
}: PersonnelRowProps & { onEdit: (pointage: PointageResponse) => void }) {
  const [deletePointage, { isLoading: isDeleting }] =
    useDeletePointageMutation();

  const handleDelete = async (id: number) => {
    try {
      await deletePointage(id.toString()).unwrap();
      await refetch();
      toast.success("Pointage supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusColor = (statut: string | undefined) => {
    if (!statut) return "bg-gray-300 text-black";

    switch (statut.toLowerCase()) {
      case "present":
        return "bg-green-500 text-white";
      case "absent":
        return "bg-red-500 text-white";
      case "retard":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <TableRow className="border-b hover:bg-gray-50 transition-colors">
      <TableCell className="flex items-center gap-3">
        <Avatar className="h-10 w-10 bg-[#F1E7DD]">
          <AvatarImage
            src="/placeholder.svg"
            alt={`Avatar de ${pointage?.user?.firstName}`}
            loading="lazy"
          />
          <AvatarFallback
            aria-label={`Initiales de ${pointage?.user?.firstName}`}
          >
            {getInitials(pointage?.user?.firstName || "")}{" "}
            {getInitials(pointage?.user?.lastName || "")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{pointage?.user?.firstName}</div>
          <div className="text-sm text-gray-500">{pointage?.user?.email}</div>
        </div>
      </TableCell>
      <TableCell>{pointage?.user?.phone}</TableCell>
      <TableCell>{new Date(pointage?.date).toLocaleDateString()}</TableCell>
      <TableCell>{pointage?.heure_arrivee}</TableCell>
      <TableCell>{pointage?.heure_depart}</TableCell>
      <TableCell>
        <Badge className={`capitalize ${getStatusColor(pointage.statut)}`}>
          {pointage.statut || "Non défini"}
        </Badge>
      </TableCell>
      <TableCell className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => onEdit(pointage)}
            >
              <SquarePen className="mr-1" /> Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleDelete(pointage.id)}
            >
              <Trash className="mr-1" /> Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default function TablePointage({ nombreElements = 5 }: PaginationProps) {
  const { data: pointages, isLoading, error, refetch } = useGetPointageQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPointage, setSelectedPointage] =
    useState<PointageResponse | null>(null);
  const [updatePointage] = useUpdatePointageMutation();
  const [currentPage, setCurrentPage] = useState(1);

  // Calcul des données paginées
  const totalItems = pointages?.length || 0;
  const totalPages = Math.ceil(totalItems / nombreElements);
  const startIndex = (currentPage - 1) * nombreElements;
  const endIndex = startIndex + nombreElements;
  const currentPointages = pointages?.slice(startIndex, endIndex) || [];

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000); // Rafraîchir toutes les 5 secondes

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [refetch]);

  const handleEdit = (pointage: PointageResponse) => {
    setSelectedPointage(pointage);
    setIsDialogOpen(true);
  };

  const handleUpdatePointage = async () => {
    if (selectedPointage) {
      try {
        const pointageData: UpdatePointage = {
          id: selectedPointage.id,
          date: selectedPointage.date,
          heure_arrivee: selectedPointage.heure_arrivee || "",
          heure_depart: selectedPointage.heure_depart || "",
          statut: selectedPointage.statut || "",
        };

        await updatePointage(pointageData).unwrap();

        setIsDialogOpen(false);
        setSelectedPointage(null);
        refetch();
        toast.success("Pointage modifié avec succès");
      } catch (error: unknown) {
        toast.error("Erreur lors de la mise à jour");
        console.error(
          "Erreur lors de la mise à jour:",
          error instanceof Error ? error.message : "Une erreur est survenue"
        );
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        Erreur lors du chargement des données: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader className="bg-pink-500">
          <TableRow>
            {TABLE_HEADERS.map((header, index) => (
              <TableHead
                key={header}
                className={`font-medium uppercase text-white ${
                  index === 0 ? "w-[250px]" : ""
                }`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!currentPointages || currentPointages.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={TABLE_HEADERS.length}
                className="text-center py-8"
              >
                <p className="text-gray-500">Aucun résultat trouvé</p>
              </TableCell>
            </TableRow>
          ) : (
            currentPointages.map((pointage: PointageResponse) => (
              <PersonnelRow
                key={pointage.id}
                pointage={pointage}
                onEdit={handleEdit}
                refetch={refetch}
              />
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>
              Affichage de {startIndex + 1} à {Math.min(endIndex, totalItems)} sur {totalItems} entrées
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? "bg-pink-500 hover:bg-pink-600" : ""}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedPointage(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier le pointage</DialogTitle>
            <DialogDescription>
              Modifiez les détails du pointage
            </DialogDescription>
          </DialogHeader>
          {selectedPointage && (
            <div className="space-y-5">
              <div className="space-y-2">

                <Input
                  label="Date"
                  id="date"
                  type="date"
                  value={selectedPointage.date}
                  onChange={(e) =>
                    setSelectedPointage({
                      ...selectedPointage,
                      date: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
               
                <Input
                  label="Heure d&apos;arrivée"
                  id="heure_arrivee"
                  type="time"
                  value={selectedPointage.heure_arrivee || ""}
                  onChange={(e) =>
                    setSelectedPointage({
                      ...selectedPointage,
                      heure_arrivee: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Input
                  label="Heure de départ"
                  id="heure_depart"
                  type="time"
                  value={selectedPointage.heure_depart || ""}
                  onChange={(e) =>
                    setSelectedPointage({
                      ...selectedPointage,
                      heure_depart: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="statut" className="text-sm font-medium">
                  Statut
                </label>
                <select
                  id="statut"
                  value={selectedPointage.statut || ""}
                  onChange={(e) =>
                    setSelectedPointage({
                      ...selectedPointage,
                      statut: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Sélectionner un statut</option>
                  <option value="present">Présent</option>
                  <option value="absent">Absent</option>
                  <option value="retard">Retard</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              onClick={handleUpdatePointage}
              className="bg-pink-500 hover:bg-pink-600"
            >
              Enregistrer les modifications
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
