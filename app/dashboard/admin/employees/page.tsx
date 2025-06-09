"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUsersQuery } from "@/store/api/authApi";
import { Mail, Phone } from "lucide-react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Utilisateur } from "@/lib/types";


export default function EmployeesPage() {
  const { data: users, isLoading, error } = useUsersQuery();
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

  const usersData = users?.filter((user) => user.role === "USER") as Utilisateur[];
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
        Les membres de l&apos;équipe
      </h2>
      <div className="mt-14 sm:mt-20 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {usersData?.map((member: Utilisateur) => (
          <div key={member.id} className="shadow-lg p-4 rounded-xl">
            <Avatar className="rounded-full">
              <AvatarFallback className="rounded-full bg-sky-500 text-white uppercase">
                {member.firstName.charAt(0) + member.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-lg font-semibold">
              {member.firstName} {member.lastName}
            </h3>
            <p className="mt-3 flex flex-col gap-1 text-sm">
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-pink-500" />
                {member.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-pink-500" />
                {member.email}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
