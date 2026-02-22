"use client";

import {
  useAboutQuery,
  useAboutUpdateMutation,
} from "@controllers/about/query";
import { useState } from "react";
import * as AboutStyles from "@app/(header)/(footer)/about/style.css";
import { AboutContent, IndexedAboutContent } from "@domain/about";
import SaveSVG from "@assets/icons/save.svg";
import PlusSVG from "@assets/icons/plus.svg";
import * as Styles from "./style.css";
import AddSectionModal from "@components/ui/Edit/Modal/AddSection/AddSectionModal";
import TrashSVG from "@assets/icons/trash.svg";
import CaretDownSVG from "@assets/icons/caret_down.svg";
import CaretUpSVG from "@assets/icons/caret_up.svg";
import AboutPageIntro from "@components/pages/about/Intro/Intro";
import AboutPageMedia from "@components/pages/about/Media/Media";
import AboutPageTextSection from "@components/pages/about/Text/Text";
import AboutPageGroupSection from "@components/pages/about/Group/Group";
import AboutPageCardSection from "@components/pages/about/Card/Card";
import AboutPageTeamSection from "@components/pages/about/Team/Team";
import { useRouter } from "nextjs-toploader/app";

const AboutPageClient = () => {
  const navigator = useRouter();
  const { data, isLoading } = useAboutQuery();
  const { mutate: updateAbout } = useAboutUpdateMutation();

  const [aboutIntro, setAboutIntro] = useState(data?.data.intro ?? "");
  const [aboutContents, setAboutContents] = useState<IndexedAboutContent[]>(
    data?.data.contents.map((e, i) => ({ id: i, content: e })) ?? [],
  );

  const updateIntro = (value: string) => {
    setAboutIntro(value);
  };

  const updateContent =
    (id: number) =>
    <T extends AboutContent>(updater: (curr: T) => T) => {
      setAboutContents((prev) =>
        prev.map((item) =>
          item.id !== id
            ? item
            : { ...item, content: updater(item.content as T) },
        ),
      );
    };

  const removeContent = (id: number) => () => {
    setAboutContents((prev) => prev.filter((item) => item.id !== id));
  };

  const moveContent = (index: number, direction: "UP" | "DOWN") => () => {
    setAboutContents((prev) => {
      const nextIndex = direction === "UP" ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= prev.length) return prev;

      const next = [...prev];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };

  const [openAddSectionModal, setOpenAddSectionModal] = useState(false);

  const closeAddSectionModal = () => {
    setOpenAddSectionModal(false);
  };

  const addAboutContent = (content: AboutContent) => {
    setAboutContents((prev) => [
      ...prev,
      {
        id: prev.reduce((acc, e) => (e.id > acc ? e.id : acc), 0) + 1,
        content,
      },
    ]);
    closeAddSectionModal();
  };

  if (isLoading || !data?.data) return null;

  return (
    <div className={`${AboutStyles.Container} page-wrapper layout-wrapper`}>
      <AboutPageIntro text={aboutIntro} editable onChange={updateIntro} />
      {aboutContents.map(({ id, content }, index) => (
        <div
          key={`ABOUT_CONTENT_${id}`}
          className={AboutStyles.Content({
            align:
              content.type === "MEDIAS" && content.align === "LEFT"
                ? "LEFT"
                : "RIGHT",
          })}
        >
          {content.type === "MEDIAS" ? (
            <AboutPageMedia
              content={content}
              editable
              updateContent={updateContent(id)}
            />
          ) : content.type === "TEXT" ? (
            <AboutPageTextSection
              content={content}
              editable
              updateContent={updateContent(index)}
            />
          ) : content.type === "GROUP" ? (
            <AboutPageGroupSection
              content={content}
              editable
              updateContent={updateContent(index)}
            />
          ) : content.type === "CARD" ? (
            <AboutPageCardSection
              content={content}
              index={index}
              editable
              updateContent={updateContent(index)}
            />
          ) : content.type === "TEAM" ? (
            <AboutPageTeamSection
              content={content}
              editable
              updateContent={updateContent(index)}
            />
          ) : null}
          <div
            className={Styles.SideButtonContainer({
              align:
                content.type === "MEDIAS" && content.align === "LEFT"
                  ? "LEFT"
                  : "RIGHT",
            })}
          >
            <button
              onClick={moveContent(index, "UP")}
              disabled={index === 0}
              className={Styles.SideButton}
            >
              <CaretUpSVG className={Styles.SideButtonIcon} />
            </button>
            <button onClick={removeContent(id)} className={Styles.SideButton}>
              <TrashSVG className={Styles.SideButtonIcon} />
            </button>
            <button
              onClick={moveContent(index, "DOWN")}
              disabled={index === aboutContents.length - 1}
              className={Styles.SideButton}
            >
              <CaretDownSVG className={Styles.SideButtonIcon} />
            </button>
          </div>
        </div>
      ))}
      <button
        className={Styles.Button}
        onClick={async () => {
          await updateAbout({
            intro: aboutIntro,
            contents: aboutContents.map((e) => e.content),
          });
          navigator.push("/about");
        }}
      >
        <SaveSVG className={Styles.ButtonIcon} />
      </button>
      <button
        className={Styles.AddButton}
        onClick={() => setOpenAddSectionModal(true)}
      >
        <PlusSVG className={Styles.AddButtonIcon} />
      </button>
      <AddSectionModal
        open={openAddSectionModal}
        onClose={closeAddSectionModal}
        addAboutContent={addAboutContent}
      />
    </div>
  );
};

export default AboutPageClient;
