import { MockMainItems } from "@ts/mock";
import Image from "next/image";
import * as Styles from "./style.css";
import { toTitleCase } from "@utils/Text";
import Link from "next/link";

export default function Home() {
  return (
    <div className={Styles.Container}>
      <p className={Styles.Title}>
        DOKAI was founded by professionals from the commercial film industry as
        an AI-driven creative group.
      </p>
      {MockMainItems.map((item, idx) => {
        const isEvenColumn = idx % 4 >= 2;
        const isOdd = idx % 2 === 0;
        const isWide = (isOdd && isEvenColumn) || (!isOdd && !isEvenColumn);

        return (
          <Link
            key={item.id}
            className={Styles.ItemContainer}
            data-first-row={idx % 2 === 0}
            data-is-wide={isWide}
            href={item.url}
          >
            <div className={Styles.ItemImageContainer}>
              <Image
                className={Styles.ItemImage}
                src={item.image}
                alt={item.title}
                fill
              />
            </div>
            <div className={Styles.ItemTextContainer} data-is-wide={isWide}>
              <p>{toTitleCase(item.type)}</p>
              <div className={Styles.ItemTextContent}>
                <p>{item.title}</p>
                <p className={Styles.ItemTextSummary}>{item.summary}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
