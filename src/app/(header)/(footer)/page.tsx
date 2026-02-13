"use client";

import * as Styles from "./style.css";
import MainWorks from "./MainWorks";
import { uploadImage } from "@utils/uploadImage";

export default function Home() {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { key, url, deduped } = await uploadImage(file);
    console.log(key, url, deduped);
  };

  return (
    <div className={`${Styles.Container} page-wrapper layout-wrapper`}>
      <p className={Styles.Title}>
        DOKAI was founded by professionals from the commercial film industry as
        an AI-driven creative group.
      </p>
      <input
        type="file"
        style={{
          position: "absolute",
          zIndex: "1000",
        }}
        onChange={handleFileChange}
      />

      <MainWorks />
    </div>
  );
}
