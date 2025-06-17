import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAPI = async (path: string, locale = "es") => {
  try {
    const endpoint = `${API_URL}/api${path}`;
    const res = await axios.get(endpoint, {
        params: {
            populate: '*',
            locale,
        },
    });
    return res.data;
  } catch (err) {
    console.error("Error al conectar con Strapi", err);
    return null;
  }
};
