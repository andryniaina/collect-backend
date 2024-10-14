import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

   // Méthode pour ajouter des agents (users) à un projet
   async addAgentToProject(projectId: string, agentId: string): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { agents: agentId } }, // $addToSet évite les doublons
      { new: true },
    ).populate('agents').exec(); // Utilise populate pour récupérer les infos des agents
  }

  // Méthode pour supprimer des agents (users) d'un projet
  async removeAgentFromProject(projectId: string, agentId: string): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(
      projectId,
      { $pull: { agents: agentId } }, // $pull enlève l'agent du tableau
      { new: true },
    ).populate('agents').exec();
  }

  async addFormToProject(projectId: string, formId: string): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(
      projectId,
      { $addToSet: { forms: formId } },
      { new: true },
    ).populate('forms').exec();
  }

  async removeFormFromProject(projectId: string, formId: string): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(
      projectId,
      { $pull: { forms: formId } },
      { new: true },
    ).populate('forms').exec();
  }


  create(createProjectDto: CreateProjectDto) {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  findAll() {
    return this.projectModel.find().exec();
  }

  findOne(id: string) {
    return this.projectModel.findById(id).exec();
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
  
}
