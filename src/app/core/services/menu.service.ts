import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Signal para controlar se o menu está expandido
  isExpanded = signal(true);
  
  // Signal para controlar o menu mobile
  isMobileMenuOpen = signal(false);

  toggleSidebar() {
    this.isExpanded.update(value => !value);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  expandSidebar() {
    this.isExpanded.set(true);
  }

  collapseSidebar() {
    this.isExpanded.set(false);
  }
}

