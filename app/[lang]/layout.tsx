import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary, hasLocale } from "@/lib/server/dictionaries";
import { Providers } from "./providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const messages = await getDictionary(lang);

  const supportedLocales = ["en", "ko"] as const;
  type SupportedLocale = (typeof supportedLocales)[number];
  const currentLang: SupportedLocale = supportedLocales.includes(
    lang as SupportedLocale,
  )
    ? (lang as SupportedLocale)
    : "en";

  return (
    <html lang={currentLang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <NextIntlClientProvider locale={lang} messages={messages}>
          {/* <UserProvider
            initialUser={initialUser}
            initialProfile={intialProfile}
            > */}

          <Providers lang={lang}>
            {children}
            <SiteFooter lang={lang} />
          </Providers>
          {/* </UserProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
