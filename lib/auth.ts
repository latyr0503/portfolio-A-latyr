export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    // Côté client
    return localStorage.getItem("token");
  }
  // Côté serveur
  try {
    const { cookies } = require("next/headers");
    const cookieStore = cookies();
    return cookieStore.get("token")?.value || null;
  } catch (error) {
    console.error("Erreur lors de la récupération du token côté serveur:", error);
    return null;
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const logout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Suppression du cookie côté client
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  
  // Redirection vers la page de login
  window.location.href = "/auth/login";
};
