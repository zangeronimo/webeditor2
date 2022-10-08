import { LoginDto } from '@/Application/DTOs/System/LoginDto'

export interface IAuthService {
  Login(data: LoginDto): Promise<string>
}
