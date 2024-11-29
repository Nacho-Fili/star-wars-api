import { UserRoles } from '../../enums/userRoles.enum';
import { IsEnum, IsString } from 'class-validator';

export class SignUpDTO {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsEnum(UserRoles)
  role: UserRoles;
}
