/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Module } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';
import { GithubModule } from '../github/github.module';

@Module({
  imports: [GithubModule],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule {}
