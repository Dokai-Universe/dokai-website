"use client";

import URLSVG from "@assets/icons/url.svg";
import { ContactIconMap, ContactType } from "./career";

type Props = {
  type: string;
  className?: string;
  onClick?: () => void;
};

const ContactIcon = ({ type, className, onClick }: Props) => {
  const Icon = ContactIconMap[type as ContactType] ?? URLSVG;

  return (
    <Icon
      role="img"
      focusable="false"
      onClick={onClick}
      className={className}
    />
  );
};

export default ContactIcon;
