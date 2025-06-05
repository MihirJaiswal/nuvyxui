import { ReactNode } from "react";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

import { cn } from "../../lib/utils";
import { buttonVariants } from "../ui/button";

export default function TemplatePreview({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        "not-prose group relative w-full gap-2  border border-zinc-300 dark:border-zinc-600 rounded-sm",
      )}
      href={href}
      target="_blank"
    >
      {children}
      <ExternalLinkIcon className="size-4" />
    </Link>
  );
}
