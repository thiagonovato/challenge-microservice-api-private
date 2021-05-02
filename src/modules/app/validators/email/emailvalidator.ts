import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class EmailValidator {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public recipient: [string];

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public subject: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  public content: string;
}
