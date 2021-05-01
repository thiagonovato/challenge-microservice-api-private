import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class LoginValidator {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public email: string;
}
