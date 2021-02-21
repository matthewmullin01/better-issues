import axios from "axios";
import firebase from "firebase";

export class GitHubAPI {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getRepos(page: number, limit: number): Promise<GitHubRepo[]> {
    try {
      return (await axios.get<GitHubRepo[]>(`https://api.github.com/user/repos?page=${page}&per_page=${limit}`, this.headers())).data;
    } catch (error) {
      if (error.code === 401) firebase.auth().signOut();
      throw new Error("Error getting repos " + error);
    }
  }

  async getIssues(ownerId: string, repoId: string, page: number, limit: number): Promise<GitHubIssue[]> {
    try {
      return (
        await axios.get<GitHubIssue[]>(
          `https://api.github.com/repos/${ownerId}/${repoId}/issues?page=${page}&per_page=${limit}`,
          this.headers()
        )
      ).data;
    } catch (error) {
      if (error.code === 401) firebase.auth().signOut();
      throw new Error("Error getting issues " + error);
    }
  }

  async getIssue(ownerId: string, repoId: string, issueId: string): Promise<GitHubIssue> {
    try {
      return (await axios.get<GitHubIssue>(`https://api.github.com/repos/${ownerId}/${repoId}/issues/${issueId}`, this.headers())).data;
    } catch (error) {
      if (error.code === 401) firebase.auth().signOut();
      throw new Error("Error getting issue " + error);
    }
  }

  private headers = () => ({ headers: { Authorization: `token ${this.token}` } });
}

export interface GitHubRepo {
  id: string;
  name: string;
  full_name: string;
  language: string;
  private: boolean;
  description?: string;
  created_at: Date;
  updated_at: Date;
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
  user: {
    id: string;
    login: string;
  };
}
