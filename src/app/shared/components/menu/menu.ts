import { Component, inject, computed } from '@angular/core';
import { AuthService } from '../../../core/services/authService.service';
import { MenuService } from '../../../core/services/menu.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModules } from '../../material/material.modules';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, MaterialModules, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  readonly authService = inject(AuthService);
  readonly menuService = inject(MenuService);
  readonly router = inject(Router);

  currentUser = this.authService.getCurrentUser();
  
  // Usando computed para criar getters reativos
  isExpanded = computed(() => this.menuService.isExpanded());
  isMobileMenuOpen = computed(() => this.menuService.isMobileMenuOpen());

  menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/profile', icon: 'person', label: 'Perfil' }
  ];

  toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  toggleMobileMenu() {
    this.menuService.toggleMobileMenu();
  }

  closeMobileMenu() {
    this.menuService.closeMobileMenu();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
