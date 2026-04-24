"use client";

import Link from "next/link";
import * as Styles from "./style.css";
import UnknownPNG from "@assets/Unknown.png";
import ErrorPNG from "@assets/Error.png";
import { IMAGE_SIZES } from "@ts/image";
import Image from "next/image";
import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";

export default function StatusPage({
  code,
  title,
  description,
}: {
  code: number;
  title: string;
  description: string;
}) {
  return (
    <>
      <Header />
      <div className={Styles.Container}>
        <div className={Styles.CodeContainer}>
          <div className={Styles.CodeImageContainer}>
            <Image
              src={code === 404 ? UnknownPNG : ErrorPNG}
              alt="Error"
              fill
              sizes={IMAGE_SIZES}
              className={Styles.CodeImage}
              priority
            />
          </div>
          <p className={Styles.Code}>{code}</p>
        </div>
        <div className={Styles.TextContainer}>
          <p className={Styles.Title}>{title}</p>
          <p className={Styles.Description}>{description}</p>
        </div>
        <div className={Styles.ButtonContainer}>
          <Link href="/" className={Styles.Button}>
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
