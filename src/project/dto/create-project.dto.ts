export class CreateProjectDto {
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    agents?: string[];
    forms?: string[];
}
