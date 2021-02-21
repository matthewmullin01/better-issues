import axios from "axios";

export class GitHubAPI {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  // List orgs for user
  // return (await axios.get<GitHubRepo[]>(`https://api.github.com/user/orgs?page=${page}&per_page=${limit}`, this.headers())).data;

  // Dooligans Repos
  // return (await axios.get<GitHubRepo[]>(`https://api.github.com/orgs/dooligans-inc/repos?page=${page}&per_page=${limit}`, this.headers()))
  //   .data;

  async getRepos(page: number, limit: number): Promise<GitHubRepo[]> {
    return (await axios.get<GitHubRepo[]>(`https://api.github.com/user/repos?page=${page}&per_page=${limit}`, this.headers())).data;
  }

  async getIssues(ownerId: string, repoId: string, page: number, limit: number): Promise<GitHubIssue[]> {
    return (
      await axios.get<GitHubIssue[]>(
        `https://api.github.com/repos/${ownerId}/${repoId}/issues?page=${page}&per_page=${limit}`,
        this.headers()
      )
    ).data;
  }

  async getIssue(ownerId: string, repoId: string, issueId: string): Promise<GitHubIssue> {
    return (await axios.get<GitHubIssue>(`https://api.github.com/repos/${ownerId}/${repoId}/issues/${issueId}`, this.headers())).data;
  }

  private headers = () => ({ headers: { Authorization: `token ${this.token}` } });
}

export interface GitHubRepo {
  id: string;
  name: string;
  full_name: string;
  private: boolean;
  description?: string;
  created_at: Date;
  default_branch: string;
  owner: {
    id: string;
    login: string;
  };
}

export interface GitHubIssue {
  id: string;
  title: string;
  assignee: string;
  assignees: string[];
  body: string;
  comments: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
  labels: string[];
  number: number;
  state: string;
  url: string;
}
