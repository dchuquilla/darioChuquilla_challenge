import { define } from "typeorm-seeding";
import * as Faker from '@ngneat/falso';
import { Organization } from './../../../../src/organization/entities/organization.entity';
import { randCompanyName, randNumber } from "@ngneat/falso";

define(Organization, (faker: typeof Faker) => {
  const organization = new Organization();
  organization.name = randCompanyName();
  organization.status = randNumber({ min: 604, max: 606 });
  return organization;
});
