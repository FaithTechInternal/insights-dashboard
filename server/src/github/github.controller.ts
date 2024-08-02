/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Controller, Get, Param, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('organizations')
  async getOrganizations() {
    // This is a placeholder. You'll need to implement a method to fetch all organizations
    // that your application is tracking.
    return [
      { id: '1', name: 'faithtechgloballabs' },
      { id: '2', name: 'faithtech-sao-paulo' },
      { id: '3', name: 'FaithTech-Orlando' },
      { id: '4', name: 'faithtech-nashville' },
      { id: '5', name: 'FaithTechInternal' },
    ];
  }

  @Get('org/:orgName')
  async getOrganizationData(@Param('orgName') orgName: string) {
    return this.githubService.getOrganizationData(orgName);
  }

  @Get('org/:orgName/repos')
  async getOrganizationRepos(
    @Param('orgName') orgName: string,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    const data = await this.githubService.getOrganizationData(orgName);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.data.repos.slice(startIndex, endIndex);
  }

  @Get('org/:orgName/commit-activity')
  async getOrganizationCommitActivity(@Param('orgName') orgName: string) {
    const data = await this.githubService.getOrganizationData(orgName);
    return data.data.commitActivity;
  }
}
