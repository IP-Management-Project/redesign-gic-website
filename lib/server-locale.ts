import { cookies } from "next/headers";

import { defaultLocale, isLocale } from "@/lib/i18n";

export const getLocale = async () => {
  const cookieStore = await cookies();
  const storedLocale = cookieStore.get("locale")?.value;

  if (storedLocale && isLocale(storedLocale)) {
    return storedLocale;
  }

  return defaultLocale;
};
