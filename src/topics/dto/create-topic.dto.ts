import { IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  readonly name: string;
}
