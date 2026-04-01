type DriveType =
  | "Front-Wheel Drive"
  | "Rear-Wheel Drive"
  | "4-Wheel or All-Wheel Drive"
  | "All-Wheel Drive"
  | "4-Wheel Drive"
  | "Part-time 4-Wheel Drive"
  | "2-Wheel Drive";

type CarInfo = {
  make?: string;
  model?: string;
  basemodel?: string;
  vclass?: string;
  year?: string | number;
  displ?: number; // litre
  cylinders?: number;
  trany?: string;
  drive?: DriveType | string;
  fueltype?: string;
  fueltype1?: string;
  co2?: number; // g/mi (EPA datası)
};

type DailyRentalPriceTR = {
  currency: "TRY";
  dailyPrice: number; // yuvarlanmış
  breakdown: {
    segment: string;
    base: number;
    multipliers: Record<string, number>;
    notes: string[];
  };
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function roundTo(n: number, step = 50) {
  return Math.round(n / step) * step;
}

function toYear(year?: string | number): number | null {
  if (year === undefined || year === null) return null;
  const y = typeof year === "string" ? parseInt(year, 10) : year;
  return Number.isFinite(y) ? y : null;
}

function normalizeDrive(input?: string): DriveType | null {
  if (!input) return null;
  const cleaned = input.trim();
  const allowed: DriveType[] = [
    "Front-Wheel Drive",
    "Rear-Wheel Drive",
    "4-Wheel or All-Wheel Drive",
    "All-Wheel Drive",
    "4-Wheel Drive",
    "Part-time 4-Wheel Drive",
    "2-Wheel Drive",
  ];
  return allowed.includes(cleaned as DriveType) ? (cleaned as DriveType) : null;
}

const DRIVE_MULT: Record<DriveType, number> = {
  "2-Wheel Drive": 1.0,
  "Front-Wheel Drive": 1.02,
  "Rear-Wheel Drive": 1.03,
  "Part-time 4-Wheel Drive": 1.05,
  "4-Wheel or All-Wheel Drive": 1.06,
  "All-Wheel Drive": 1.07,
  "4-Wheel Drive": 1.07,
};

function segmentFromCar(car: CarInfo): { segment: string; base: number } {
  const make = (car.make ?? "").toLowerCase();
  const model = (car.model ?? "").toLowerCase();
  const basemodel = (car.basemodel ?? "").toLowerCase();
  const vclass = (car.vclass ?? "").toLowerCase();
  const displ = car.displ ?? 1.6;
  const cylinders = car.cylinders ?? 4;

  const luxuryBrands = [
    "bmw",
    "mercedes",
    "audi",
    "porsche",
    "lexus",
    "jaguar",
    "land rover",
    "range rover",
  ];
  const isLuxuryBrand = luxuryBrands.some((b) => make.includes(b));

  const isFlagship =
    (make.includes("bmw") &&
      (model.includes("750") || basemodel.includes("7 series"))) ||
    (make.includes("mercedes") &&
      (basemodel.includes("s") || model.includes("s"))) ||
    (make.includes("audi") &&
      (basemodel.includes("a8") || model.includes("a8")));

  const isSUV =
    vclass.includes("suv") ||
    basemodel.includes("x") ||
    basemodel.includes("gle") ||
    basemodel.includes("q");
  const isLarge = vclass.includes("large");
  const isPowerful = displ >= 3.0 || cylinders >= 6;

  if (isFlagship) return { segment: "luxury_flagship", base: 7000 };
  if (isLuxuryBrand && (isLarge || isPowerful))
    return { segment: "luxury", base: 5600 };
  if (isLuxuryBrand) return { segment: "premium", base: 4000 };
  if (isSUV && isPowerful) return { segment: "suv_upper", base: 3600 };
  if (vclass.includes("midsize")) return { segment: "midsize", base: 2300 };
  return { segment: "economy", base: 1600 };
}

/**
 * Türkiye için kural-tabanlı günlük kiralama fiyatı (TRY) hesaplar.
 * Not: Bu tahmindir; şehir/sezon/arz-talep eklenirse daha gerçekçi olur.
 */
export function getRentalPrice(
  car: CarInfo,
  opts?: { currentYear?: number },
): DailyRentalPriceTR {
  const notes: string[] = [];
  const currentYear = opts?.currentYear ?? new Date().getFullYear();

  const { segment, base } = segmentFromCar(car);

  // 1) Yaş (model yılı)
  const year = toYear(car.year);
  const age = year ? clamp(currentYear - year, 0, 25) : 10;
  const ageMult = clamp(1.12 - age * 0.02, 0.72, 1.12);
  if (!year) notes.push("Yıl yoktu: varsayılan yaş=10 alındı.");

  // 2) Motor hacmi (L)
  const displ = car.displ ?? 1.6;
  // 1.6L referans; her +1.0L yaklaşık +%12 (üst sınır var)
  const displMult = clamp(1 + (displ - 1.6) * 0.12, 0.85, 1.85);
  if (car.displ == null) notes.push("Motor hacmi yoktu: 1.6L varsayıldı.");

  // 3) Silindir
  const cylinders = car.cylinders ?? 4;
  const cylMult = clamp(1 + (cylinders - 4) * 0.06, 0.9, 1.55);

  // 4) CO2 (EPA g/mi). Yüksek CO2 -> daha çok yakıt, daha pahalı segment etkisi
  const co2 = car.co2 ?? 250;
  const co2Mult = clamp(1 + (co2 - 250) / 1000, 0.9, 1.45);

  // 5) Yakıt tipi
  const fuel = `${car.fueltype ?? ""} ${car.fueltype1 ?? ""}`.toLowerCase();
  const fuelMult = fuel.includes("premium")
    ? 1.08
    : fuel.includes("diesel")
      ? 1.03
      : fuel.includes("electric")
        ? 1.12
        : 1.0;

  // 6) Şanzıman
  const trany = (car.trany ?? "").toLowerCase();
  const tranyMult = trany.includes("automatic") ? 1.05 : 1.0;

  // 7) Çekiş (drive)
  const driveType = normalizeDrive(
    typeof car.drive === "string"
      ? car.drive
      : (car.drive as string | undefined),
  );
  const driveMult = driveType ? DRIVE_MULT[driveType] : 1.0;
  if (!driveType && car.drive)
    notes.push(`Bilinmeyen drive değeri: "${car.drive}" -> 1.00 uygulandı.`);

  // 8) Türkiye piyasa katsayısı (segment bazlı)
  const marketMult = segment.startsWith("luxury")
    ? 1.18
    : segment.startsWith("premium")
      ? 1.12
      : segment.includes("suv")
        ? 1.1
        : 1.06;

  const multipliers = {
    age: ageMult,
    engineDisplacement: displMult,
    cylinders: cylMult,
    co2: co2Mult,
    fuel: fuelMult,
    transmission: tranyMult,
    drive: driveMult,
    market: marketMult,
  };

  // fiyat
  let price =
    base *
    ageMult *
    displMult *
    cylMult *
    co2Mult *
    fuelMult *
    tranyMult *
    driveMult *
    marketMult;

  // Segment bazlı mantık sınırları
  const min = segment.startsWith("luxury")
    ? 3500
    : segment.startsWith("premium")
      ? 2200
      : 1200;

  const max = segment.startsWith("luxury")
    ? 30000
    : segment.startsWith("premium")
      ? 15000
      : 9000;

  price = clamp(price, min, max);

  return {
    currency: "TRY",
    dailyPrice: roundTo(price, 50),
    breakdown: { segment, base, multipliers, notes },
  };
}
