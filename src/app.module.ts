import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { AccessModule } from './access/access.module';
import { CommonModule } from './common/common.module';
import { OssService } from './oss/oss.service';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    RoleModule,
    AccessModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService, PrismaService, OssService],
})
export class AppModule {}
