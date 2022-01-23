import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  readonly nick: string;

  @IsString()
  readonly password: string;
}
