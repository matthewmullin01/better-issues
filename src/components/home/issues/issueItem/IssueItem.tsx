import { FunctionComponent } from "react";
import { GitHubIssue } from "../../../../api/github";

export interface IssueItemProps {
  issue: GitHubIssue;
  onClick: (issue: GitHubIssue) => void;
}

export const IssueItem: FunctionComponent<IssueItemProps> = (props: IssueItemProps) => {
  const { issue, onClick } = props;

  return (
    <div onClick={() => onClick(issue)}>
      <h1>{issue.title}</h1>
      <small>{issue.state}</small>
      <small>{issue.description}</small>
    </div>
  );
};
