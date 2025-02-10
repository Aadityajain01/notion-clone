"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export default function Breadcrumbs() {
  const path = usePathname();
  const segments = path.split("/");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {segments.map((segment, index) => {
          if (!segment) return null;

          const href = `/${segments.slice(0, index + 1).join("/")}`;
            const isLast = index === segments.length - 1;
          return (
            <Fragment key={segment}>
              <BreadcrumbItem>
                {
                    isLast ? (
                        <BreadcrumbPage>{segment}</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>  
                    )
                }
                <BreadcrumbSeparator/>

              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
