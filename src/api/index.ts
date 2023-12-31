import getAxiosInstance from "./axios";

export const searchNpmRegistry = async ({
  searchString,
  offset,
  size = 20,
}: {
  searchString: string;
  size?: number;
  offset: number;
}) => {
  const api = await getAxiosInstance();
  const response = await api.get(
    `/-/v1/search?text=${searchString}&size=${size}&from=${offset}`
  );
  return response.data;
};

export const listLastestPackage = async ({
  packageName,
}: {
  packageName: string;
}) => {
  const api = await getAxiosInstance();
  const response = await api.get(`/${packageName}/latest`);
  return response.data;
};

const api = { searchNpmRegistry, listLastestPackage };

export default api;
