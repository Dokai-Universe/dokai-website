"use client";

import * as Styles from "./style.css";
import MediaHoverOverlay from "@components/ui/Media/HoverOverlay/HoverOverlay";
import Link from "next/link";
import PlusSVG from "@assets/icons/plus.svg";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchAppQuery, useAppQuery } from "@controllers/common";
import { useSearchParams } from "next/navigation";
import { useModalStackStore } from "@stores/modalStackStore";
import { useEffect } from "react";
import { ProjectListItem } from "@domain/careers";
import { authQueriesClient } from "@controllers/auth/query.client";
import { careersQueriesClient } from "@controllers/careers/query.client";

const CareerProjects = ({
  projects,
  email,
  isReadOnly,
}: {
  projects: ProjectListItem[];
  email: string;
  isReadOnly?: boolean;
}) => {
  const qc = useQueryClient();
  const searchParams = useSearchParams();
  const { replaceTop } = useModalStackStore();
  const { data: session } = useAppQuery(authQueriesClient.sessionStatus());
  const editable = session?.role === "admin" || session?.email === email;

  const handleClickProject = async (project: ProjectListItem) => {
    prefetchAppQuery(qc, careersQueriesClient.projectDetail(project.id));
  };

  useEffect(() => {
    if (searchParams.get("project")) {
      setTimeout(() => {
        replaceTop("PROJECT", { ownerEmail: email });
      }, 100);
    }
  }, [searchParams]);

  return (
    <div className={Styles.ProjectContainer({ isReadOnly })}>
      <p className={Styles.ProjectTitle}>work</p>
      <div className={Styles.ProjectContent}>
        {projects.map((project, idx) => (
          <MediaHoverOverlay
            key={`PROJECT_${project.id}`}
            media={project.thumbnail}
            className={Styles.ProjectMedia}
            priority={idx === 0}
          >
            <Link
              href={`?project=${project.id}`}
              scroll={false}
              className={Styles.ProjectOverlay}
              onClick={() => handleClickProject(project)}
            >
              <p className={Styles.ProjectOverlayTitle}>{project.title}</p>
            </Link>
          </MediaHoverOverlay>
        ))}

        {editable && (
          <Link
            href="?project=new"
            scroll={false}
            className={Styles.ProjectAddButton}
          >
            <PlusSVG className={Styles.ProjectAddButtonIcon} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CareerProjects;
