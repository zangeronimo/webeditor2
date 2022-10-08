import { LoginDto } from '@/Application/DTOs/System/LoginDto'
import { IAuthService } from '@/Application/Interfaces/System/IAuthService'
import api from '@/Infra/Providers/Http/AxiosProvider'

export class AuthService implements IAuthService {
  async Login(data: LoginDto): Promise<string> {
    return await api
      .post('/auth', { Email: data.username, Password: data.password })
      .then(response => response.data.token ?? '')
  }
}
