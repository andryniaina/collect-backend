import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('mobile/dashboard')
  async getMobileDashboardProjects() {
    return this.projectService.getMobileDashboardProjects();
  }

  @Get('dashboard')
  async getDashboardProjects() {
    return this.projectService.getDashboardProjects();
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @Patch(':id/add-agent/:agentId')
  addAgent(@Param('id') projectId: string, @Param('agentId') agentId: string) {
    return this.projectService.addAgentToProject(projectId, agentId);
  }

  @Patch(':id/remove-agent/:agentId')
  removeAgent(@Param('id') projectId: string, @Param('agentId') agentId: string) {
    return this.projectService.removeAgentFromProject(projectId, agentId);
  }

  @Patch(':id/add-form/:formId')
  addForm(@Param('id') projectId: string, @Param('formId') formId: string) {
    return this.projectService.addFormToProject(projectId, formId);
  }

  @Patch(':id/remove-form/:formId')
  removeForm(@Param('id') projectId: string, @Param('formId') formId: string) {
    return this.projectService.removeFormFromProject(projectId, formId);
  }

  @Get(':id/forms')
  async getProjectForms(@Param('id') projectId: string) {
    return this.projectService.getProjectForms(projectId);
  }
}
