/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { InsightsService } from './insights.service';

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

@Controller('insights')
export class InsightsController {
  constructor(private insightsService: InsightsService) {}

  @Get('org/:orgName')
  async getOrganizationInsights(@Param('orgName') orgName: string) {
    return this.insightsService.getOrganizationInsights(orgName);
  }

  @Get('org/:orgName/repos')
  async getOrgRepoInsights(
    @Param('orgName') orgName: string,
    @Query('sort') sort?: 'stars' | 'forks' | 'updated',
    @Query('order') order: 'asc' | 'desc' = 'desc',
  ): Promise<RepoInsight[]> {
    const insights = await this.insightsService.getOrgRepoInsights(orgName);

    const validInsights = insights.filter((insight) => !insight.error);

    if (sort) {
      validInsights.sort((a, b) => {
        if (a[sort] < b[sort]) return order === 'asc' ? -1 : 1;
        if (a[sort] > b[sort]) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return validInsights;
  }

  @Get('repo/:orgName/:repoName')
  async getRepoInsights(
    @Param('orgName') orgName: string,
    @Param('repoName') repoName: string,
  ): Promise<RepoInsight> {
    try {
      return await this.insightsService.getRepoInsights(orgName, repoName);
    } catch (error) {
      throw new NotFoundException(
        `Repository ${orgName}/${repoName} not found or not accessible`,
      );
    }
  }
}
