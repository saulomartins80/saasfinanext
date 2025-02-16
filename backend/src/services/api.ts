const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchData = async (endpoint: string) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`);
    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
};
