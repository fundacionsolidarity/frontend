import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAPI = async (path: string, queryParams: Record<string, any> = {}) => {
  try {
    const endpoint = `${API_URL}/api${path}`;
    const defaultParams = {
      populate: '*',
    };
    const allParams = { ...defaultParams, ...queryParams };

    const res = await axios.get(endpoint, {
      params: allParams,
    });

    return res.data;
  } catch (err) {
    console.error("Error al conectar con Strapi:", err);

    throw new Error("No se pudo conectar con el servidor de la API.");
  }
};