import { Module } from '@nestjs/common';

import { RouterModule } from 'nest-router';

import { AppModule } from './app/module';

@Module({
  imports: [RouterModule.forRoutes([{ path: '/app', module: AppModule }]), AppModule]
})
export class ApplicationModule { }
