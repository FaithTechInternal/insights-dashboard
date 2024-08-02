/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';
import { GithubService } from '../github/github.service';

interface RepoInsight {
  name: string;
  description?: string;
  stars?: number;
  forks?: number;
  openIssues?: number;
  latestVersion?: string;
  primaryLanguage?: string;
  license?: string;
  createdAt?: string;
  updatedAt?: string;
  size?: number;
  totalContributors?: number;
  error?: string;
}

@Injectable()
export class InsightsService {
  private readonly logger = new Logger(InsightsService.name);
  private octokit: Octokit;

  constructor(
    private githubService: GithubService,
    private configService: ConfigService,
  ) {
    this.octokit = new Octokit({
      auth: this.configService.get('GITHUB_TOKEN'),
    });
  }

  async getOrganizationInsights(orgName: string) {
    const githubData = await this.githubService.getOrganizationData(orgName);

    // this.logger.debug(
    //   `Raw GitHub data for ${orgName}: ${JSON.stringify(githubData.data)}`,
    // );

    // Process the data to generate insights
    const repoCount = githubData.data.repos.length;

    let totalCommits = 0;
    if (Array.isArray(githubData.data.commitActivity)) {
      githubData.data.commitActivity.forEach((activity: any) => {
        if (activity && Array.isArray(activity.data)) {
          activity.data.forEach((week: any) => {
            if (week && typeof week.total === 'number') {
              totalCommits += week.total;
            }
          });
        }
      });
    } else {
      this.logger.warn(
        `Unexpected commitActivity data structure for ${orgName}`,
      );
    }

    const insights = {
      repoCount,
      totalCommits,
      // Add more processed insights here
    };

    this.logger.debug(
      `Processed insights for ${orgName}: ${JSON.stringify(insights)}`,
    );

    return insights;
  }

  async getOrgRepoInsights(orgName: string): Promise<RepoInsight[]> {
    this.logger.log(
      `Fetching repository insights for organization: ${orgName}`,
    );

    try {
      const repos = await this.octokit.paginate(this.octokit.repos.listForOrg, {
        org: orgName,
        per_page: 100,
      });

      const repoInsights = await Promise.all(
        repos.map((repo) =>
          this.getRepoInsights(orgName, repo.name).catch((error) => ({
            name: repo.name,
            error: error.message,
          })),
        ),
      );

      return repoInsights;
    } catch (error) {
      this.logger.error(
        `Error fetching insights for ${orgName}: ${error.message}`,
      );
      throw error;
    }
  }

  async getRepoInsights(
    orgName: string,
    repoName: string,
  ): Promise<RepoInsight> {
    this.logger.log(`Fetching insights for repo: ${orgName}/${repoName}`);

    try {
      const [repoInfo, latestRelease, languages, contributors] =
        await Promise.all([
          this.octokit.repos
            .get({ owner: orgName, repo: repoName })
            .catch((error) => {
              this.logger.warn(`Error fetching repo info: ${error.message}`);
              return null;
            }),
          this.octokit.repos
            .getLatestRelease({ owner: orgName, repo: repoName })
            .catch(() => null),
          this.octokit.repos
            .listLanguages({ owner: orgName, repo: repoName })
            .catch((error) => {
              this.logger.warn(`Error fetching languages: ${error.message}`);
              return { data: {} };
            }),
          this.octokit.repos
            .listContributors({ owner: orgName, repo: repoName })
            .catch((error) => {
              this.logger.warn(`Error fetching contributors: ${error.message}`);
              return { data: [] };
            }),
        ]);

      if (!repoInfo) {
        throw new Error(
          `Repository ${orgName}/${repoName} not found or not accessible`,
        );
      }

      const totalContributors = contributors.data
        ? contributors.data.length
        : 0;

      return {
        name: repoName,
        description: repoInfo.data.description,
        stars: repoInfo.data.stargazers_count,
        forks: repoInfo.data.forks_count,
        openIssues: repoInfo.data.open_issues_count,
        latestVersion: latestRelease
          ? latestRelease.data.tag_name
          : 'No releases',
        primaryLanguage: Object.keys(languages.data)[0] || 'Not specified',
        license: repoInfo.data.license
          ? repoInfo.data.license.spdx_id
          : 'Not specified',
        createdAt: repoInfo.data.created_at,
        updatedAt: repoInfo.data.updated_at,
        size: repoInfo.data.size,
        totalContributors: totalContributors,
      };
    } catch (error) {
      this.logger.error(
        `Error fetching insights for ${orgName}/${repoName}: ${error.message}`,
      );
      return { name: repoName, error: error.message };
    }
  }
}
