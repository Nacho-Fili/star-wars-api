import { hash } from 'bcryptjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { SignUpDTO } from '../dto/signUp.dto';
import { Model } from 'mongoose';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UsersProvider {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return {
      username: user.username,
      role: user.role,
      password: user.password,
    };
  }

  async signUp(signUpDTO: SignUpDTO) {
    const existingUser = await this.userModel
      .findOne({
        username: signUpDTO.username,
      })
      .exec();

    if (existingUser) {
      throw new BadRequestException('Username is already in use');
    }

    const encryptedPassword = await hash(signUpDTO.password, 10);
    const user = new this.userModel({
      username: signUpDTO.username,
      password: encryptedPassword,
      role: signUpDTO.role,
    });

    const userDocument = await user.save();
    return UserDTO.fromDocument(userDocument);
  }
}
