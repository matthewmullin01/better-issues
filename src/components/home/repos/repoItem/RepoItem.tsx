import { FunctionComponent } from "react";
import { GitHubRepo } from "../../../../api/github";

export interface RepoItemProps {
  repo: GitHubRepo;
  onClick: (repo: GitHubRepo) => void;
}

export const RepoItem: FunctionComponent<RepoItemProps> = (props: RepoItemProps) => {
  const { repo, onClick } = props;

  return (
    <div onClick={() => onClick(repo)}>
      <h1>{repo.full_name}</h1>
      <small>{repo.private ? "Private" : "Public"}</small>
    </div>
  );
};
