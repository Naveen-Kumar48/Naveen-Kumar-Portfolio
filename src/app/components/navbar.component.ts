import { Component, signal, HostListener, inject, PLATFORM_ID, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StarBorderComponent } from './star-border.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    StarBorderComponent
  ],
  template: `
    <nav [class]="'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b px-6 py-4 ' + (scrolled() || mobileMenuOpen() ? 'bg-[var(--glass-bg)] backdrop-blur-md border-[var(--border-color)] shadow-sm' : 'bg-transparent border-transparent')">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" class="group text-2xl font-extrabold tracking-tighter transition-all duration-300 text-[var(--text-primary)] drop-shadow-sm">
          Naveen<span class="text-emerald-500 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all duration-300">.</span><span class="font-light text-[var(--text-secondary)] text-xl group-hover:text-emerald-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">web</span>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-2 relative" (mouseleave)="onNavContainerLeave()">
          <!-- Glassmorphism Pill -->
          <div 
            class="absolute top-1/2 -translate-y-1/2 h-9 bg-[var(--text-primary)]/5 backdrop-blur-md border border-[var(--border-color)]/50 rounded-full transition-all duration-300 ease-out z-0 pointer-events-none"
            [ngStyle]="{'left.px': pillStyle().left, 'width.px': pillStyle().width, 'opacity': pillStyle().opacity}">
          </div>

          @for (item of navItems; track item.label) {
            <a #navLink [attr.data-id]="item.id" [href]="item.href" 
               class="px-4 py-2 text-sm font-medium transition-colors relative z-10 rounded-full"
               [class]="(hoveredSection() || activeSection()) === item.id ? 'text-emerald-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'"
               (mouseenter)="onItemHover(item.id)"
               (click)="scrollToSection($event, item.href)">
              {{ item.label }}
            </a>
          }
          
          <div class="w-px h-6 bg-[var(--border-color)] mx-2"></div>
          
          <button (click)="toggleTheme()" class="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors relative z-10">
            <mat-icon class="text-sm">{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>

          <a href="#contact" (click)="scrollToSection($event, '#contact')" class="ml-2 relative z-10 group block">
            <app-star-border color="#10b981" speed="4s" innerClass="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-center text-sm py-2 px-4 group-hover:bg-[var(--bg-secondary)] transition-colors">
              <span class="font-medium group-hover:text-emerald-400">Contact Me</span>
            </app-star-border>
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-1 md:hidden">
          <button (click)="toggleTheme()" class="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors shrink-0">
            <mat-icon class="text-sm">{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
          
          <a href="#contact" (click)="scrollToSection($event, '#contact')" class="shrink-0 block md:hidden">
            <app-star-border color="#10b981" speed="4s" [thickness]="1" innerClass="bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-center text-xs py-1.5 px-3 group-hover:bg-[var(--bg-secondary)] transition-colors">
              <span class="font-medium group-hover:text-emerald-400 whitespace-nowrap">Contact</span>
            </app-star-border>
          </a>
          
          <button class="p-2 text-[var(--text-primary)] shrink-0" (click)="toggleMenu()">
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
          <div class="pt-4 border-t border-[var(--border-color)] mt-2">
            <a href="#contact" 
               class="block w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] text-center shadow-lg hover:shadow-emerald-500/25"
               (click)="scrollToSection($event, '#contact'); toggleMenu()">
              <span class="flex items-center justify-center gap-2">
                <mat-icon class="text-base">mail</mat-icon>
                Contact Me
              </span>
            </a>
          </div>
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

  pillStyle = signal({ left: 0, width: 0, opacity: 0 });
  hoveredSection = signal('');

  @ViewChildren('navLink') navLinks!: QueryList<ElementRef<HTMLAnchorElement>>;

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

      effect(() => {
        const idToHighlight = this.hoveredSection() || this.activeSection();
        setTimeout(() => this.updatePillPosition(idToHighlight), 0);
      });
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

  onNavContainerLeave() {
    this.hoveredSection.set('');
  }

  onItemHover(id: string) {
    this.hoveredSection.set(id);
  }

  private updatePillPosition(activeId: string) {
    if (!this.navLinks || this.navLinks.length === 0) return;

    const activeLink = this.navLinks.find(link => link.nativeElement.getAttribute('data-id') === activeId);

    if (activeLink) {
      const element = activeLink.nativeElement;
      this.pillStyle.set({
        left: element.offsetLeft,
        width: element.offsetWidth,
        opacity: 1
      });
    } else {
      this.pillStyle.update(style => ({ ...style, opacity: 0 }));
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  @HostListener('window:resize', [])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.updatePillPosition(this.activeSection());
    }
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
