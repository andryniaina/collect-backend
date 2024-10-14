import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Group, GroupSchema } from './schemas/group.schema';
import { GroupService } from './group.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, {name: Group.name, schema: GroupSchema}]),
  ],
  controllers: [UsersController],
  providers: [UsersService, GroupService],
  exports: [UsersService],
})
export class UsersModule {}
