import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { FormsModule } from './forms/forms.module';
import { FilesModule } from './files/files.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    ProjectModule,
    FormsModule,
    FilesModule,
    SubmissionsModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    await this.seederService.seed();
  }
}
