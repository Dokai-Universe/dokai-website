import { Fragment } from "react/jsx-runtime";
import { Workflow } from "./fetch";
import * as Styles from "./style.css";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";

type AboutPageWorkflowProps = {
  workflow: Workflow;
};

const AboutPageWorkflow = ({ workflow }: AboutPageWorkflowProps) => {
  return (
    <div className={Styles.ContentContainer}>
      <p className={Styles.ContentTitle}>Creative workflow</p>
      <p className={Styles.ContentText}>{workflow.text}</p>
      {workflow.tools.map((tool) => (
        <Fragment key={`ABOUT_WORKFLOW_${tool.title}`}>
          <div className={Styles.WorkflowToolIconContainer}>
            <Image
              src={tool.icon}
              alt={tool.title}
              fill
              sizes={IMAGE_SIZES}
              className={Styles.WorkflowToolIcon}
            />
          </div>
          <div className={Styles.WorkflowToolTextContainer}>
            <p className={Styles.WorkflowToolTitle}>{tool.title}</p>
            <p className={Styles.WorkflowToolText}>{tool.text}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default AboutPageWorkflow;
