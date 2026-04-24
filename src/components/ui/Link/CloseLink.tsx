"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useMemo, useRef } from "react";

type Props = {
  href: string;
  children: ReactNode;
  handleClose: () => void;
  className?: string;
};

const CloseLink = ({ href, children, handleClose, className }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sp = searchParams.toString();

  const currentUrl = useMemo(() => {
    return sp ? `${pathname}?${sp}` : pathname;
  }, [pathname, sp]);

  const onClickLink = () => {
    if (href === currentUrl) {
      handleClose();
      return;
    }
  };

  return (
    <Link href={href} onClick={onClickLink} className={className}>
      {children}
    </Link>
  );
};

export default CloseLink;
