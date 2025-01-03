export class CreateProjectDto {
    name: string;
    description: string;
    endDate: Date;
    agents?: string[];
    forms?: string[];
    responsable?: string;
    region: string;
    priority?: string;
    section?: string;
}
