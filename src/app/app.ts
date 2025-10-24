import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MenuComponent } from './shared/components/menu/menu';
import { MenuService } from './core/services/menu.service';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('auth-manager');
  readonly menuService = inject(MenuService);
  readonly router = inject(Router);

  // Lista de rotas públicas onde o menu não deve aparecer
  private readonly publicRoutes = ['/login', '/register', '/'];

  // Signal que indica se deve mostrar o menu
  showMenu = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: any) => !this.publicRoutes.includes(event.url))
    ),
    { initialValue: !this.publicRoutes.includes(this.router.url) }
  );
}
