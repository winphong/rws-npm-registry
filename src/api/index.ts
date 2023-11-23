import getAxiosInstance from "./axios";

export const searchNpmRegistry = async ({
  searchString,
  offset,
  size,
}: {
  searchString: string;
  size: number;
  offset: number;
}) => {
  const api = await getAxiosInstance();
  const response = await api.get(
    `/-/v1/search?text=${searchString}&size=${size}&from=${offset}`
  );
  return response.data;
};
