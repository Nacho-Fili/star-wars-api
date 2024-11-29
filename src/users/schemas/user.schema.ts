import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from '../../enums/userRoles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ required: true, enum: UserRoles })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
