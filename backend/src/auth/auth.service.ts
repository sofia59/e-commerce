import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { Admin } from './admin.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'admin@example.com';
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD') || 'admin123';

    const adminExists = await this.adminRepo.findOne({ where: { email: adminEmail } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await this.adminRepo.save({
        email: adminEmail,
        password: hashedPassword,
      });
      console.log(`✅ Admin creado: ${adminEmail}`);
      console.log('⚠️  CAMBIAR LA CONTRASEÑA INMEDIATAMENTE DESPUÉS DEL PRIMER LOGIN');
    }
  }

  async login(email: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = this.jwtService.sign({
      id: admin.id,
      email: admin.email,
    });

    return { token, email: admin.email };
  }

  async validateAdmin(id: number) {
    return this.adminRepo.findOne({ where: { id } });
  }
}