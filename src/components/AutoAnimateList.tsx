"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function AutoAnimateList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [ref] = useAutoAnimate();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
