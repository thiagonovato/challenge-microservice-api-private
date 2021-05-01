import { Injectable, NestMiddleware } from '@nestjs/common';

import { enTokenType, TokenService } from '../services/token';

@Injectable()
export class BindUserMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) { }

  public async use(req: any, res: any, next: Function) {
    const accessToken = req.get('Authorization');

    if (!accessToken) {
      return next();
    }

    try {
      (req as any).user = await this.tokenService.verify(accessToken.split(' ')[1], enTokenType.accessToken);
    } catch (err) { }

    next();
  }
}
