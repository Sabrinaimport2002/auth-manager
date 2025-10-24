import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as bcrypt from 'bcryptjs';
import { BehaviorSubject, catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [];
  readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) 
      this.users.push(...JSON.parse(savedUsers));

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
    }
  }

  login(userLogin: User): Observable<User | null> {
    return of(null).pipe(
      delay(1500),
      map(() => {
        const user = this.users.find((u) => u.email === userLogin.email);
        if (!user)
          throw new Error('Usuário não encontrado');

        if(!userLogin.password)
          throw new Error('A senha é obrigatória');

        if(!user.password)
          throw new Error('Senha não disponível para verificação');

        const passwordMatch = bcrypt.compareSync(userLogin.password, user.password);
        if (!passwordMatch)
          throw new Error('Senha incorreta');
        
        return user;
      }),
      tap((user) => {
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<void> {
    return of(null).pipe(
      delay(1500),
      tap(() => {
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
      }),
      map(() => undefined)
    );
  }

  register(user: User): Observable<User | null> {
    return of(null).pipe(
      delay(1500),
      map(() => {
        const emailExists = this.users.find((u) => u.email === user.email);
        if (emailExists)
          throw new Error('O email já está em uso');

        if(!user.password)
          throw new Error('A senha é obrigatória');

        const passwordHash = bcrypt.hashSync(user.password, 10);

        const newUser: User = {
          id: (this.users.length + 1).toString(),
          email: user.email,
          password: passwordHash,
          name: user.name,
        };

        return newUser;
      }),
      tap((newUser) => {
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  updateProfile(user: User): Observable<User | null> {
    return of(null).pipe(
      delay(1500),
      map(() => {
        // Verifica se há usuário logado usando o getter
        if (!this.currentUser) {
          throw new Error('Usuário não está logado');
        }

        // Verifica se o email já está em uso por outro usuário
        const emailExists = this.users.find(
          (u) => u.email === user.email && u.id !== this.currentUser?.id
        );
        if (emailExists) {
          throw new Error('Email já está em uso por outro usuário');
        }

        // Encontra o índice do usuário
        const userIndex = this.users.findIndex(u => u.id === this.currentUser?.id);
        if (userIndex === -1) {
          throw new Error('Usuário não encontrado');
        }

        // Atualiza o usuário no array (mantém a senha)
        this.users[userIndex] = {
          ...this.users[userIndex],
          name: user.name,
          email: user.email
        };

        // Retorna o usuário atualizado
        return this.users[userIndex];
      }),
      tap((updatedUser) => {
        // Atualiza o BehaviorSubject
        this.currentUserSubject.next(updatedUser);
        // Atualiza o localStorage
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ success: boolean; message: string }> {
    return of(null).pipe(
      delay(1500),
      map(() => {
        if (!this.currentUser) {
          throw new Error('Usuário não está logado');
        }

        if (!this.currentUser.password) 
          throw new Error('Senha não disponível para verificação');
        
        const compareCurrentPassword = bcrypt.compareSync(
          currentPassword,
          this.currentUser.password
        );
        if (!compareCurrentPassword) {
          throw new Error('Senha atual incorreta');
        }

        const userIndex = this.users.findIndex((u) => u.id === this.currentUser?.id);
        if (userIndex === -1) {
          throw new Error('Usuário não encontrado');
        }

        // Atualiza a senha
        const newPasswordHash = bcrypt.hashSync(newPassword, 10);
        this.users[userIndex] = {
          ...this.users[userIndex],
          password: newPasswordHash
        };

        return this.users[userIndex];
      }),
      tap((updatedUser) => {
        this.currentUserSubject.next(updatedUser);

        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }),
      map(() => ({ success: true, message: 'Senha alterada com sucesso!' })),
      catchError((error) => {
        return of({ success: false, message: error.message });
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
