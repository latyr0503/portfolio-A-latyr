import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { baseApi } from "../baseApi";

// Définition des types pour les justifications
export interface Justification {
  id: string;
  userId: number;
  motif: string;
  date: string;
}

export interface JustificationResponse {
  id: number;
  date: string;
  motif: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    gender: string;
    role: string;
    createdAt: string;
  };
}

export const justificationApiSlice = baseApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getJustifications: builder.query<JustificationResponse[], void>({
      query: () => ({
        url: `/justifications-absence`,
        method: "GET",
      }),
    }),
    getJustificationsById: builder.query<JustificationResponse[], string>({
      query: (id: string) => ({
        url: `/justifications-absence/${id}`,
        method: "GET",
      }),
    }),
    addJustifications: builder.mutation<Justification, Partial<Justification>>({
      query: (justification: Partial<Justification>) => ({
        url: `/justifications-absence`,
        method: "POST",
        body: justification,
      }),
    }),
    updateJustifications: builder.mutation<Justification, Justification>({
      query: (justification: Justification) => ({
        url: `/justifications-absence/${justification.id}`,
        method: "PUT",
        body: justification,
      }),
    }),
    deleteJustifications: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/justifications-absence/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export des hooks générés par RTK Query
export const {
  useGetJustificationsQuery,
  useGetJustificationsByIdQuery,
  useAddJustificationsMutation,
  useUpdateJustificationsMutation,
  useDeleteJustificationsMutation,
} = justificationApiSlice;
