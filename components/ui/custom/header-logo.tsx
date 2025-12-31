"use client";

import Image from "next/image";
import Link from "next/link";

export function HeaderLogo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center">
      <div className="flex items-center gap-2">
        <div className="flex w-12">
          <Image
            src="/logo-light.svg"
            alt="Korea Ag Digest logo"
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
            priority
            className="block dark:hidden"
          />
          <Image
            src="/logo-dark.svg"
            alt="Korea Ag Digest logo"
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
            priority
            className="hidden dark:block"
          />
          {/* Optional text if you want: */}
          {/* <span className="ml-2 font-bold text-lg sm:text-xl tracking-tight hover:text-primary transition-colors">
          Seedlot
        </span> */}
        </div>
        <div className="flex flex-col leading-tight">
          <p className="text-xl font-semibold tracking-tight">
            Korea Ag Digest
          </p>
          <span className="text-xs text-muted-foreground">
            Curated Korean Agriculture News
          </span>
        </div>
      </div>
    </Link>
  );
}
