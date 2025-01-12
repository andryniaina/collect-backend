import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from '../project/schemas/project.schema';
import { Form } from '../forms/schemas/form.schema';
import { User } from '../users/schemas/user.schema';
import { Submission } from '../submissions/schemas/submission.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Form.name) private formModel: Model<Form>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}

  async seed() {
    const projectCount = await this.projectModel.countDocuments();
    if (projectCount > 0) {
      console.log('Database already seeded');
      return;
    }

    console.log('Starting database seeding...');
    const users = await this.seedUsers();
    await this.seedProjects(users);
    console.log('Database seeding completed');
  }

  private async seedUsers() {
    const users = [];
    const names = ['Christian', 'Julien', 'Marie', 'Sophie', 'Pierre'];

    for (let i = 0; i < names.length; i++) {
      const user = new this.userModel({
        name: names[i].toLowerCase(),
        email: `${names[i].toLowerCase()}@example.com`,
        password: 'password123',
        role: 'Agent',
      });

      const savedUser = await user.save();
      users.push(savedUser);
    }

    return users;
  }

  private async seedProjects(users: User[]) {
    const projects = [];
    const regions = ['Nord', 'Sud', 'Est', 'Ouest', 'Centre'];
    const priorities = ['Haute', 'Moyenne', 'Basse'];
    const sections = ['Agriculture', 'Santé', 'Education', 'Infrastructure', 'Environnement'];
    const statuses = ['Nouveau', 'En cours', 'Terminé'];

    for (let i = 1; i <= 10; i++) {
      const responsable = users[Math.floor(Math.random() * users.length)];
      const agents = users.filter(u => u._id !== responsable._id).slice(0, 2);
      
      const project = new this.projectModel({
        name: `Projet ${i}`,
        description: `Description détaillée du projet ${i}`,
        endDate: new Date(Date.now() + Math.random() * 10000000000),
        region: regions[Math.floor(Math.random() * regions.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        section: sections[Math.floor(Math.random() * sections.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        responsable: responsable._id,
        agents: agents.map(a => a._id),
      });

      const savedProject = await project.save();
      projects.push(savedProject);
      await this.seedFormsForProject(savedProject, users);
    }
  }

  private async seedFormsForProject(project: Project, users: User[]) {
    const formTypes = ['Enquête', 'Rapport', 'Evaluation', 'Inspection'];
    const countries = ['Madagascar', 'Comores', 'Maurice', 'Seychelles'];

    for (let i = 1; i <= 10; i++) {
      const form = new this.formModel({
        version: '1.0',
        name: `Formulaire ${i} - ${project.name}`,
        description: `Description du formulaire ${i} pour ${project.name}`,
        section: project.section,
        type: formTypes[Math.floor(Math.random() * formTypes.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        header: `En-tête du formulaire ${i}`,
        status: 'Deployed',
        project: project._id,
        fields: [
          {
            type: 'text',
            title: 'Nom',
            name: 'name',
            required: true,
            guidance: 'Entrez votre nom complet',
          },
          {
            type: 'select',
            title: 'Type',
            name: 'type',
            required: true,
            options: ['Option 1', 'Option 2', 'Option 3'],
          },
          {
            type: 'number',
            title: 'Quantité',
            name: 'quantity',
            required: true,
            validations: [
              {
                message: 'La valeur doit être supérieure à 0',
                comparator: 'gt',
                value: '0',
              },
            ],
          },
          {
            type: 'textarea',
            title: 'Commentaires',
            name: 'comments',
            required: false,
            guidance: 'Ajoutez vos commentaires ici',
          },
        ],
        groups: ['Groupe 1', 'Groupe 2'],
      });

      const savedForm = await form.save();
      await this.seedSubmissionsForForm(savedForm, users);
    }
  }

  private async seedSubmissionsForForm(form: Form, users: User[]) {
    const submissionCount = Math.floor(Math.random() * 100);
    
    for (let i = 0; i < submissionCount; i++) {
      const submission = new this.submissionModel({
        _id: new Types.ObjectId(),
        formId: form._id.toString(),
        submittedBy: users[Math.floor(Math.random() * users.length)]._id,
        data: {
          name: `Réponse ${i + 1}`,
          type: 'Option ' + Math.floor(Math.random() * 3 + 1),
          quantity: Math.floor(Math.random() * 100),
          comments: `Commentaire pour la réponse ${i + 1}`,
        },
        status: Math.random() > 0.5 ? 'Submitted' : 'Draft',
      });

      await submission.save();
    }
  }
} 