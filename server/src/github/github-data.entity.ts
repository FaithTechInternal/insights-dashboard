/**
 * Copyright (c) FaithTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GithubData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organization: string;

  @Column('jsonb')
  data: any;

  @Column()
  lastUpdated: Date;
}
