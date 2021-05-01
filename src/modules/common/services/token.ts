import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { cloneDeep } from 'lodash';
import { AUTH } from 'settings';
import { ICurrentUser } from '../interfaces/icurrentuser';
import { IUser } from '../interfaces/iuser';

export enum enTokenType {
  accessToken = 0,
  resetPassword = 1,
  refreshToken = 2
}

@Injectable()
export class TokenService {
  public async generateAccessToken(user: IUser, forApp = false, timeout?: number): Promise<string> {
    const tokenData: ICurrentUser = {
      email: user.email,
      roles: ['admin']
    };

    return this.sign(tokenData, enTokenType.accessToken, timeout || (forApp ? AUTH.appTimeout : AUTH.timeout));
  }

  public async verify(token: string, type: enTokenType.accessToken): Promise<ICurrentUser>;
  public async verify(token: string, type: enTokenType): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, AUTH.secret, (err: any, decoded: any) => {
        if (err || !decoded || decoded.type !== type) {
          return reject(this.resolveVerifyError(err));
        }

        resolve(decoded);
      });
    });
  }

  public async renewAccessToken(userToken: ICurrentUser): Promise<string> {
    userToken = cloneDeep(userToken);
    return this.sign(userToken, enTokenType.accessToken, AUTH.timeout);
  }
  private async sign(tokenData: any, type: enTokenType, expiration: number = null): Promise<string> {
    return new Promise<string>(resolve => {
      (<any>tokenData).type = type;

      if (expiration) {
        (<any>tokenData).exp = this.expirationDate(expiration);
      }

      resolve(jwt.sign(tokenData, AUTH.secret));
    });
  }

  private expirationDate(minutes: number): number {
    return Math.floor(Date.now() / 1000) + minutes * 60;
  }

  private resolveVerifyError(err: Error): Error {
    if (!err) {
      return new BadRequestException('token-type-not-match');
    }

    switch (err.name) {
      case 'TokenExpiredError':
        return new BadRequestException('token-expired');
      default:
        return new BadRequestException('token-invalid');
    }
  }
}
