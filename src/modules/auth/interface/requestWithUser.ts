import { User, Company, Project, Property, Broker } from '@prisma/client';
import { Request } from 'express';

export interface ProjectInterface extends Project {
  properties: Property[];
}

export interface CompanyInterface extends Company {
  projects: ProjectInterface[];
}
export interface UserInterface extends User {
  companies?: CompanyInterface[];
  broker?: Broker;
}

export interface RequestWithUser extends Request {
  user: UserInterface;
}
