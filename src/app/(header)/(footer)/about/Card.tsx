import { Fragment } from "react/jsx-runtime";
import * as Styles from "./style.css";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";
import { AboutCard } from "@domain/about";

type AboutPageCardSectionProps = {
  name: string;
  text: string;
  content: AboutCard[];
};

const AboutPageCardSection = ({
  name,
  text,
  content,
}: AboutPageCardSectionProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentTitle}>{name}</p>
      <p className={Styles.ContentText}>{text}</p>
      {content.map((card) => (
        <Fragment key={`ABOUT_CARD_${card.title}`}>
          <div className={Styles.WorkflowToolIconContainer}>
            <Image
              src={card.icon}
              alt={card.title}
              fill
              sizes={IMAGE_SIZES}
              className={Styles.WorkflowToolIcon}
            />
          </div>
          <div className={Styles.WorkflowToolTextContainer}>
            <p className={Styles.WorkflowToolTitle}>{card.title}</p>
            <p className={Styles.WorkflowToolText}>{card.text}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default AboutPageCardSection;
