import { Component, signal, HostListener, inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <nav [class]="'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b px-6 py-4 ' + (scrolled() || mobileMenuOpen() ? 'bg-[var(--glass-bg)] backdrop-blur-md border-[var(--border-color)] shadow-sm' : 'bg-transparent border-transparent')">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" class="text-xl font-bold tracking-tighter hover:text-emerald-400 transition-colors text-[var(--text-primary)]">
          Naveen<span class="text-emerald-500">.</span>dev
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-6">
          @for (item of navItems; track item.label) {
            <a [href]="item.href" 
               class="text-sm font-medium transition-colors relative"
               [class]="activeSection() === item.id ? 'text-emerald-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'"
               (click)="scrollToSection($event, item.href)">
              {{ item.label }}
              @if (activeSection() === item.id) {
                <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
              }
            </a>
          }
          
          <button (click)="toggleTheme()" class="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors">
            <mat-icon class="text-sm">{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>

          <a href="#contact" 
             class="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full text-sm transition-all hover:scale-105"
             (click)="scrollToSection($event, '#contact')">
            Hire Me
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-4 md:hidden">
          <button (click)="toggleTheme()" class="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors">
            <mat-icon class="text-sm">{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
          
          <button class="text-[var(--text-primary)]" (click)="toggleMenu()">
            <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden absolute top-full left-0 w-full mt-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col gap-4 shadow-2xl overflow-hidden">
          @for (item of navItems; track item.label) {
            <a [href]="item.href" 
               class="text-lg font-medium"
               [class]="activeSection() === item.id ? 'text-emerald-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'"
               (click)="scrollToSection($event, item.href); toggleMenu()">
              {{ item.label }}
            </a>
          }
          <a href="#contact" 
             class="px-5 py-3 bg-emerald-500 text-center text-white font-semibold rounded-xl"
             (click)="scrollToSection($event, '#contact'); toggleMenu()">
            Hire Me
          </a>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent implements OnInit, OnDestroy {
  scrolled = signal(false);
  mobileMenuOpen = signal(false);
  isDarkMode = signal(true);
  activeSection = signal('');

  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#academic', id: 'academic' }
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode.set(savedTheme === 'dark');
      } else {
        this.isDarkMode.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
      this.applyTheme();
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
    this.applyTheme();
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const html = document.documentElement;
      if (this.isDarkMode()) {
        html.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -50% 0px', // Trigger when section is near the middle/top
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, options);

    this.navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        this.observer?.observe(element);
      }
    });

    // Also observe hero section to clear active state or set to home
    const hero = document.querySelector('app-hero section'); // Assuming hero has a section tag
    if (hero) {
      // We might want to add an id to hero section if not present, or just handle it.
      // For now, let's just stick to the nav items.
    }
  }

  scrollToSection(event: Event, href: string) {
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Manually set active section for immediate feedback
      this.activeSection.set(href.replace('#', ''));
    }
  }
}
