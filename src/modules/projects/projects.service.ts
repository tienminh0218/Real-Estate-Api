
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {Project,Company,Prisma} from '@prisma/client';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    async info_comp(id:string): Promise<Company | null>{
        return this.prisma.company.findFirst({
            where: {id:id},
        });
    }
    // async createComp(data: Company): Promise<Company> {
    //     return this.prisma.company.create({
    //         data,
    //     })
    // }
    //   async createProj(data: Project): Promise<Project> {
    //     return this.prisma.project.create({
    //         data,
    //     })
    // }

    async list_project(id:string): Promise<Project[]>{
        return this.prisma.project.findMany({
            where:{
                companyId: id
            }
        })
    }

    async list_project_city(searchcity:string): Promise<Project[]>{
        return this.prisma.project.findMany({
            where:{
                OR:[
                    {
                        city:{contains: searchcity}
                    },
                    {
                        district:{contains: searchcity}
                    }
                
                ]
            }
        })
    }

    // async list_project_city(city:string): Promise<Project[]>{
    //     return this.prisma.project.findMany({
    //         where:{
    //             city: city
    //         }
    //     })
    // }

}
