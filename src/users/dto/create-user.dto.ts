import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly nick: string;

  @IsString()
  readonly password: string;
}
