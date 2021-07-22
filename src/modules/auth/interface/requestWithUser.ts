import { User, Company, Project, Property } from '@prisma/client';
import { Request } from 'express';

export interface ProjectInterface extends Project {
  properties: Property[];
}

export interface CompanyInterface extends Company {
  projects: ProjectInterface[];
}
export interface UserInterface extends User {
  companies: CompanyInterface[];
}

export interface RequestWithUser extends Request {
  user: UserInterface;
}
