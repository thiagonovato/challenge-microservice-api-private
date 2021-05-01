import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { AuthService } from '../services/auth';
import { LoginValidator } from '../validators/auth/login';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/generateKey')
  public async login(@Body() model: LoginValidator) {
    return this.authService.generateKey(model.email);
  }

  @Get()
  @AuthRequired()
  public async teste() {
    console.log('Autenticado!');
  }
}
