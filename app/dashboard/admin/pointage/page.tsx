import TablePointage from "@/components/table-pointage";
import React from "react";

export default function absencesPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
        Liste des pointages
      </h1>
      <TablePointage nombreElements={15} />
    </div>
  );
}
