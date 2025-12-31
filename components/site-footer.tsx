"use client";

import { Heart, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { siGithub } from "simple-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <span
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: siGithub.svg }}
    />
  );
}

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export function SiteFooter({ lang }: { lang: string }) {
  const t = useTranslations("footer");
  const router = useRouter();
  const year = new Date().getFullYear();

  const switchLanguage = (newLang: (typeof LANGUAGES)[0]) => {
    router.push(`/${newLang.code}${window.location.pathname.substring(3)}`);
  };

  const mainLinks = [
    { href: "/docs", label: t("docs") },
    { href: "/terms", label: t("terms") },
    { href: "/privacy", label: t("privacy") },
  ];

  const authLinks = [
    { href: "/login", label: t("login") },
    { href: "/signup", label: t("signup") },
  ];

  return (
    <footer className="bg-card text-card-foreground transition-colors pt-16 pb-16 md:pt-24 md:pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-18">
        {/* Logo + Description */}
        <div className="flex flex-col items-start md:items-start space-y-4 md:col-span-1">
          <div className="relative w-18">
            <Image
              src="/logo-light.svg"
              alt="Korea Ag Digest logo"
              width={150}
              height={50}
              style={{ objectFit: "contain" }}
              priority
              className="block dark:hidden"
            />
            <Image
              src="/logo-dark.svg"
              alt="Korea Ag Digest logo"
              width={150}
              height={50}
              style={{ objectFit: "contain" }}
              priority
              className="hidden dark:block"
            />
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {t("description")}
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2 md:space-y-4">
          <h4 className="font-semibold text-foreground">{t("navigation")}</h4>
          <nav className="flex flex-col space-y-2">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className="text-muted-foreground hover:text-primary transition-all duration-150 font-medium text-sm hover:underline hover:underline-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Account Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-semibold text-foreground">{t("account")}</h4>
          <div className="flex flex-col space-y-1">
            {authLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${lang}${link.href}`}
                className="text-muted-foreground hover:text-primary transition-all duration-150 font-medium text-sm hover:underline hover:underline-offset-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex flex-col items-start space-y-4">
          <h4 className="font-semibold text-foreground">{t("language")}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <span>
                  {LANGUAGES.find((l) => l.code === lang)?.flag}{" "}
                  {LANGUAGES.find((l) => l.code === lang)?.label}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-36">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => switchLanguage(l)}
                  className="flex items-center gap-2"
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* GitHub / CSL Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="https://github.com/shmaplex"
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-150 hover:underline hover:underline-offset-2 text-sm"
          >
            <GithubIcon />
            <span>{t("github")}</span>
          </Link>
          <Link
            href="https://github.com/shmaplex/csl"
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-150 hover:underline hover:underline-offset-2 text-sm"
          >
            <Scale className="w-4 h-4" />
            <span>{t("csl")}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Link
            href="https://github.com/shmaplex/korea-agdigest"
            target="_blank"
          >
            <Button
              variant="ghost"
              className="text-[#bf3989] hover:text-pink-500 hover:bg-transparent flex items-center gap-2 transition-all duration-150"
            >
              <Heart className="w-5 h-5 stroke-current" />
              <span>{t("contribute", { platform: "GitHub" })}</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-4 text-center text-muted-foreground text-sm">
        &copy; {year} Korea Ag Digest. All rights reserved.
      </div>
    </footer>
  );
}
