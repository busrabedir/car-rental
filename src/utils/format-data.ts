import type { Car } from "../types";

const formatData = (car: Car) => {
  // nesne içindeki filtrelemek istediğim alanlar
  const accpeted = [
    "make",
    "model",
    "year",
    "fueltype",
    "cylinders",
    "drive",
    "trany",
    "vclass",
    "tcharger",
    "startstop",
    "co2",
    "displ",
    "atvtype",
  ];
  return Object.entries(car).filter(([key]) => accpeted.includes(key));
};

export default formatData;
