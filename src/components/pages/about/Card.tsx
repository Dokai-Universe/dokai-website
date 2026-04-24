import { AboutContentCard } from "@domain/about";
import * as Styles from "./style.css";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";

type AboutPageCardProps = {
  content: AboutContentCard;
};

const AboutPageCard = ({ content }: AboutPageCardProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentName()}>{content.name}</p>
      <div
        className={`${Styles.ContentText} rich-text`}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
      <div className={Styles.CardContainer}>
        {content.content.map((item, i) => (
          <div key={`ABOUT_CARD_${i}`} className={Styles.CardContent}>
            <div className={Styles.CardIconContainer}>
              <Image
                src={item.icon}
                alt={item.title}
                fill
                sizes={IMAGE_SIZES}
                className={Styles.CardIcon}
              />
            </div>
            <div className={Styles.CardTextContainer}>
              <p className={Styles.CardTitle}>{item.title}</p>
              <p className={Styles.CardText}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPageCard;
