import { Injectable } from '@nestjs/common';
import { IUser } from 'modules/common/interfaces/iuser';
import { enRoles } from 'modules/common/interfaces/roles';
import { TokenService } from 'modules/common/services/token';

@Injectable()
export class AuthService {
  constructor(private tokenService: TokenService) { }

  public async generateKey(email: string) {
    console.log(`Gerando Key para o email ${email}.`);

    const user: IUser = {
      email,
      roles: [enRoles.sysAdmin]
    };

    return this.tokenService.generateAccessToken(user);
  }
}
