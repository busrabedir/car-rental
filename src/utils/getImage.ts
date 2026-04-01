import type { Car } from "../types";

const getImage = (
  car: Car,
  angle?: string,
  background?: boolean,
  noPaint?: boolean,
) => {
  const url = new URL("https://cdn.imagin.studio/getImage");

  url.searchParams.set("customer", "hrjavascript-mastery");
  url.searchParams.set("make", car.make);
  url.searchParams.set("modelFamily", car.model);
  url.searchParams.set("zoomType", "fullscreen");
  url.searchParams.set("randomPaint", "true");

  if (angle) {
    url.searchParams.set("angle", angle);
  }

  if (background) {
    url.searchParams.set("surrounding", "sur34");
  }

  if (noPaint) {
    url.searchParams.set("randomPaint", "false");
  }

  return url.href;
};

export default getImage;
