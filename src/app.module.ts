import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../config.env' });
import express from 'express';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
