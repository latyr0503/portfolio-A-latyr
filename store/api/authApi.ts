import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { baseApi } from "../baseApi";
import { LoginCredentials, SignupCredentials, User } from "@/lib/types";

interface Users {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
}


export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: `/auth/signin`,
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
    signup: builder.mutation<User, SignupCredentials>({
      query: (credentials: SignupCredentials) => ({
        url: `/auth/signup`,
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      }),
    }),
    users: builder.query<Users[], void>({
      query: () => ({
        url: `/auth`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
    userById: builder.query<User, string>({
      query: (id: string) => ({
        url: `/auth/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUsersQuery,
  useUserByIdQuery,
} = authApiSlice;
