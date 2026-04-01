import type { CarResponse } from "../types";

export const fetchCars = async (
  make: string,
  model: string,
  year: string,
  page: string,
  limit: number,
): Promise<CarResponse> => {
  let url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=${limit}`;

  if (make) {
    url += `&refine=make:"${make}"`;
  }

  if (model) {
    url += `&refine=model:"${model}"`;
  }

  if (year) {
    url += `&refine=year:"${year}"`;
  }

  // limit=12
  // page:   1 2  3  4  5
  // offset: 0 12 24 36 48
  const offset = (Number(page) - 1) * limit;
  url += `&offset=${offset}`;

  const res = await fetch(url);

  return await res.json();
};
