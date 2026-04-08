import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  
  // Signal to hold the current theme state
  isDarkMode = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Check if user has explicitly saved a preference, or use system preference
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
      this.applyTheme(true);
    } else if (savedTheme === 'light') {
      this.isDarkMode.set(false);
      this.applyTheme(false);
    } else {
      // Default to what we set in index.html for auto theme loading
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.set(prefersDark);
      this.applyTheme(prefersDark);
    }
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      // Enable smooth transition overlay globally
      document.documentElement.classList.add('dark-transition');
      
      const newDarkState = !this.isDarkMode();
      this.isDarkMode.set(newDarkState);
      this.applyTheme(newDarkState);
      
      localStorage.setItem('theme', newDarkState ? 'dark' : 'light');
      
      // Remove transition class after animation completes to prevent layout shift animations later
      setTimeout(() => {
        document.documentElement.classList.remove('dark-transition');
      }, 500); 
    }
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light'); // Keep light class for backward compatibility
    }
  }
}