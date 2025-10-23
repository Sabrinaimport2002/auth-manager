import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly users: User[] = [];
  private currentUser: User | null = null;

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) 
      this.users = JSON.parse(savedUsers);

    const saveUser = localStorage.getItem('currentUser');
    if (saveUser)
      this.currentUser = JSON.parse(saveUser);
  }

  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email);
    if(!user)
      return null

    const comparePassword = bcrypt.compareSync(password, user.password);
    if(comparePassword) {      
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }

    return null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  register(user: User): User | null {
    const emailExists = this.users.find(u => u.email === user.email);
    if (emailExists)
      return null;

    const passwordHash = bcrypt.hashSync(user.password, 10);

    const newUser: User = {
      id: (this.users.length + 1).toString(),
      email: user.email,
      password: passwordHash,
      name: user.name
    }

    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return newUser;
  }

  updateProfile(name: string, email: string): { success: boolean; message: string } {
    if (!this.currentUser)
      return { success: false, message: 'Usuário não está logado' };

    const emailExists = this.users.find(
      u => u.email === email && u.id !== this.currentUser?.id
    );
    if (emailExists)
      return { success: false, message: 'Email já está em uso por outro usuário' };

    const userIndex = this.users.findIndex(u => u.id === this.currentUser?.id);

    if (userIndex !== -1) {
      this.users[userIndex].name = name;
      this.users[userIndex].email = email;

      this.currentUser.name = name;
      this.currentUser.email = email;

      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      return { success: true, message: 'Perfil atualizado com sucesso!' };
    }

    return { success: false, message: 'Erro ao atualizar perfil' };
  }

  changePassword(currentPassword: string, newPassword: string): { success: boolean; message: string } {
    if (!this.currentUser)
      return { success: false, message: 'Usuário não está logado' };

    const compareCurrentPassword = bcrypt.compareSync(currentPassword, this.currentUser.password)
    if (!compareCurrentPassword)
      return { success: false, message: 'Senha atual incorreta' };

    const userIndex = this.users.findIndex(u => u.id === this.currentUser?.id);

    if (userIndex !== -1) {
      this.users[userIndex].password = bcrypt.hashSync(newPassword, 10);
      this.currentUser.password = bcrypt.hashSync(newPassword, 10);

      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      return { success: true, message: 'Senha alterada com sucesso!' };
    }

    return { success: false, message: 'Erro ao alterar senha' };
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
