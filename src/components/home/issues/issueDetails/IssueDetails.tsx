import { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { GitHubIssue } from "../../../../api/github";

export interface IssueDetailsProps {
  issue: GitHubIssue;
}

export const IssueDetails: FunctionComponent<IssueDetailsProps> = (props: IssueDetailsProps) => {
  const { issue } = props;

  return (
    <div>
      <h1>{issue.title}</h1>
      <small>{issue.description}</small>
      <small>{issue.state}</small>
      {/* These are arrays */}
      {/* <small>{issue.assignees}</small>
      <small>{issue.labels}</small> */}
      <div>
        <ReactMarkdown>{issue.body}</ReactMarkdown>
      </div>
    </div>
  );
};
