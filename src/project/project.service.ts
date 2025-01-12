import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Form } from '../forms/schemas/form.schema';
import { Submission } from '../submissions/schemas/submission.schema';

@Injectable()
export class ProjectService {
  
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Form.name) private formModel: Model<Form>,
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}

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

  async getDashboardProjects() {
    const projects = await this.projectModel
      .find()
      .populate('responsable', 'name')
      .lean();

    const projectsWithStats = await Promise.all(
      projects.map(async (project: any) => {
        const forms = await this.formModel.find({ project: project._id });
        const formIds = forms.map(form => form._id);
        const submissions = await this.submissionModel.countDocuments({
          form: { $in: formIds },
          status: 'Submitted'
        });

        return {
          title: project.name,
          description: project.description,
          formCount: forms.length.toString().padStart(2, '0'),
          responses: `${submissions}/100`,
          lastUpdate: project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('fr-FR') : 'N/A',
          responsible: project.responsable?.name || 'Non assigné',
          status: project.status
        };
      })
    );

    return projectsWithStats;
  }

  async getMobileDashboardProjects() {
    const projects = await this.projectModel
      .find()
      .populate('responsable', 'name')
      .sort({ updatedAt: -1 })
      .lean();

    const projectsWithStats = await Promise.all(
      projects.map(async (project: any) => {
        const forms = await this.formModel.find({ project: project._id });
        const formIds = forms.map(form => form._id);
        const submissions = await this.submissionModel.countDocuments({
          formId: { $in: formIds.map(id => id.toString()) },
          status: 'Submitted'
        });

        const totalExpectedSubmissions = forms.length * 100; // Assuming 100 submissions per form

        return {
          _id: project._id,
          title: project.name,
          description: project.description,
          formCount: forms.length.toString().padStart(2, '0'),
          responses: `${submissions}/${totalExpectedSubmissions}`,
          lastUpdate: project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('fr-FR') : 'N/A',
          responsible: project.responsable?.name || 'Non assigné',
          status: project.status || 'En cours'
        };
      })
    );

    return projectsWithStats;
  }

  async getProjectForms(projectId: string) {
    console.log("Fetching forms from API Ps", projectId);
    const forms = await this.formModel
      .find({ project: new Types.ObjectId(projectId) })
      .sort({ updatedAt: -1 })
      .lean();

    console.log("Forms fetched from API", forms);

    return forms.map(form => ({
      _id: form._id,
      title: form.name,
      version: form.version,
      description: form.description,
      project: form.project,
      fields: form.fields,
      status: form.status,
      updatedAt: form.updatedAt
    }));
  }
}
