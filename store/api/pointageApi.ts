import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { baseApi } from "../baseApi";

// Définition des types pour les pointages
interface Pointage {
  userId: number;
  date: string;
  heure_arrivee: string | "";
  heure_depart: string | "";
  statut: string;
}

export interface UpdatePointage {
  id: number;
  date: string;
  heure_arrivee: string | "";
  heure_depart: string | "";
  statut: string;
}

export interface PointageResponse {
  id: number;
  date: string;
  statut: string;
  heure_arrivee: string | "";
  heure_depart: string | "";
  user: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    gender: string;
    role: string;
    createdAt: string;
  };
}

export const pointageApiSlice = baseApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getPointage: builder.query<PointageResponse[], void>({
      query: () => ({
        url: `/pointages`,
        method: "GET",
      }),
    }),
    getPointageById: builder.query<PointageResponse, string>({
      query: (id: string) => ({
        url: `/pointages/${id}`,
        method: "GET",
      }),
    }),
    addPointage: builder.mutation<Pointage, Partial<Pointage>>({
      query: (pointage: Partial<Pointage>) => ({
        url: `/pointages`,
        method: "POST",
        body: pointage,
      }),
    }),
    updatePointage: builder.mutation<Pointage, UpdatePointage>({
      query: (pointage: UpdatePointage) => ({
        url: `/pointages/${pointage.id}`,
        method: "PUT",
        body: pointage,
      }),
    }),
    deletePointage: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/pointages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export des hooks générés par RTK Query
export const {
  useGetPointageQuery,
  useGetPointageByIdQuery,
  useAddPointageMutation,
  useUpdatePointageMutation,
  useDeletePointageMutation,
} = pointageApiSlice;
