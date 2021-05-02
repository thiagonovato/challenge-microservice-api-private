import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth';
import { LoginValidator } from '../validators/auth/login';

@ApiTags('Auth')
@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/generateKey')
  public async login(@Body() model: LoginValidator) {
    return this.authService.generateKey(model.email);
  }
}
