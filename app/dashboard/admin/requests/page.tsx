"use client";
import { useState } from "react";
import { CalendarOff, Mail, Phone, User2 } from "lucide-react";
import {
  useGetJustificationsQuery,
  JustificationResponse,
} from "@/store/api/justificationApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function RequestsPage() {
  const { data, isLoading, error } = useGetJustificationsQuery();
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
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const justificationData = data as JustificationResponse[];

  const sortedJustifications = [...justificationData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">L&apos;historique des demandes d&apos;absences</h1>
      <div className="grid grid-cols-3 gap-5">
        {sortedJustifications?.length === 0 ? (
          <p className="text-muted-foreground">Aucune absence enregistrée</p>
        ) : (
          sortedJustifications?.map(
            (item: JustificationResponse, index: number) => (
              <div
                key={index}
                className="w-full min-h-[200px] shadow-lg rounded-xl p-4 space-y-3"
              >
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <CalendarOff />
                  Absence du {new Date(item.date).toLocaleDateString("fr-FR")}
                </h3>
                <div className="space-y-1.5">
                  <p className="capitalize text-muted-foreground flex items-center gap-2">
                    <User2 className="w-4 h-4" />
                    {item.user.firstName} {item.user.lastName}
                  </p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {item.user.phone} - <Mail className="w-4 h-4" />{" "}
                    {item.user.email}
                  </p>
                </div>
                <p className="text-base text-muted-foreground ">
                  <span className="font-bold underline">Motif :</span>
                  <br />
                  <span
                    className={`${
                      expandedIndex === index ? "" : "line-clamp-3"
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
    </div>
  );
}
