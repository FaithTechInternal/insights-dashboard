/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { GithubData } from './github-data.entity';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private octokit: Octokit;
  private readonly logger = new Logger(GithubService.name);

  constructor(
    @InjectRepository(GithubData)
    private githubDataRepository: Repository<GithubData>,
    private configService: ConfigService,
  ) {
    this.octokit = new Octokit({
      auth: this.configService.get('GITHUB_TOKEN'),
    });
  }

  async fetchAndCacheOrganizationData(orgName: string): Promise<void> {
    this.logger.debug(`Fetching data for organization: ${orgName}`);

    const repos = await this.octokit.repos.listForOrg({ org: orgName });

    const commitActivity = await Promise.all(
      repos.data.map(async (repo) => {
        try {
          const activity = await this.octokit.repos.getCommitActivityStats({
            owner: orgName,
            repo: repo.name,
          });
          return { repo: repo.name, data: activity.data };
        } catch (error) {
          this.logger.warn(
            `Failed to fetch commit activity for ${repo.name}: ${error.message}`,
          );
          return { repo: repo.name, data: null };
        }
      }),
    );

    const githubData = new GithubData();
    githubData.organization = orgName;
    githubData.data = { repos: repos.data, commitActivity };
    githubData.lastUpdated = new Date();

    await this.githubDataRepository.save(githubData);
    this.logger.debug(`Data for ${orgName} has been cached.`);
  }

  async getOrganizationData(orgName: string): Promise<GithubData> {
    const cachedData = await this.githubDataRepository.findOne({
      where: { organization: orgName },
    });

    if (!cachedData || this.isDataStale(cachedData.lastUpdated)) {
      this.logger.debug(`Fetching fresh data for ${orgName}`);
      await this.fetchAndCacheOrganizationData(orgName);
      return this.githubDataRepository.findOne({
        where: { organization: orgName },
      });
    }

    return cachedData;
  }

  private isDataStale(lastUpdated: Date): boolean {
    const staleThreshold = 60 * 60 * 1000; // 1 hour
    return Date.now() - lastUpdated.getTime() > staleThreshold;
  }
}
