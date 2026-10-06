import { DEFAULT_LOCALE, isLocale, type Locale } from "./locales";

/** Next 16 đưa `locale` dạng string thô — thu hẹp về union ở một chỗ duy nhất. */
export async function localeOf(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}
