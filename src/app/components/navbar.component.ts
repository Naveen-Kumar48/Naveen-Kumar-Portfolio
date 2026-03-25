import { Component, signal, inject, PLATFORM_ID, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, effect, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { MagneticDirective } from '../directives/magnetic.directive';
import { fromEvent, throttleTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [class]="'fixed top-0 left-0 w-full z-[1000] transition-all duration-700 px-4 md:px-6 py-4 ' + (scrolled() ? 'py-3' : 'py-6')">
      <!-- High-Performance Nav Container -->
      <div [class]="'max-w-7xl mx-auto flex justify-between items-center transition-all duration-700 rounded-[2rem] px-5 md:px-8 ' + (scrolled() || mobileMenuOpen() ? 'liquid-glass border border-[var(--glass-border)] py-3 shadow-2xl backdrop-blur-2xl' : 'bg-transparent py-2 border-transparent')">
        
        <!-- Logo Matrix -->
        <a href="#" class="group flex items-center gap-1 text-3xl font-black tracking-tighter text-[var(--text-primary)] leading-none">
          <span class="bg-clip-text text-transparent bg-gradient-to-br from-[var(--text-primary)] to-[var(--text-secondary)]">Naveen</span>
          <span class="text-emerald-500 group-hover:rotate-12 transition-transform duration-500">.</span>
          <span class="font-light text-[var(--text-secondary)] text-xl transition-colors duration-300">web</span>
        </a>

        <!-- Desktop Navigation Matrix -->
        <div class="hidden lg:flex items-center gap-1 relative" (mouseleave)="onNavContainerLeave()">
          <!-- Sliding Kinetic Pill -->
          <div 
            class="absolute top-1/2 -translate-y-1/2 h-9 bg-emerald-500/10 border border-emerald-500/20 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] z-0"
            [ngStyle]="{'left.px': pillStyle().left, 'width.px': pillStyle().width, 'opacity': pillStyle().opacity}">
          </div>

          @for (item of navItems; track item.label) {
            <a #navLink [attr.data-id]="item.id" [href]="item.href" 
               appMagnetic
               class="px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative z-10 rounded-xl whitespace-nowrap italic"
               [class]="(hoveredSection() || activeSection()) === item.id ? 'text-emerald-500 translate-y-[-2px]' : 'text-[var(--text-secondary)] hover:text-white'"
               (mouseenter)="onItemHover(item.id)"
               (click)="scrollToSection($event, item.href)">
              {{ item.label }}
            </a>
          }
          
          <div class="w-px h-4 bg-white/5 mx-4"></div>
          
          <button (click)="toggleTheme()" appMagnetic class="p-2 rounded-xl hover:bg-white/5 text-[var(--text-secondary)] hover:text-white transition-all relative z-10" aria-label="Toggle Global Theme Mode">
            <mat-icon class="text-base">{{ isDarkMode() ? 'nights_stay' : 'light_mode' }}</mat-icon>
          </button>

          <a href="#contact" (click)="scrollToSection($event, '#contact')" appMagnetic class="ml-4 relative z-10 group" aria-label="Navigate to contact section">
             <div class="px-6 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black text-[10px] uppercase tracking-[0.3em] rounded-xl transition-all hover:scale-110 active:scale-95 shadow-xl flex items-center gap-2 italic">
               Uplink <mat-icon class="text-sm">bolt</mat-icon>
             </div>
          </a>
        </div>

        <!-- Mobile Logic Center -->
        <div class="flex items-center gap-3 lg:hidden">
          <button (click)="toggleTheme()" class="p-2 rounded-xl bg-white/5 text-[var(--text-secondary)] transition-all" aria-label="Toggle Theme Mode">
            <mat-icon class="text-base">{{ isDarkMode() ? 'nights_stay' : 'light_mode' }}</mat-icon>
          </button>
          
          <button class="p-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-xl transform transition-transform active:scale-90" (click)="toggleMenu()" aria-label="Toggle Mobile Navigation Menu">
            <mat-icon class="text-base font-bold">{{ mobileMenuOpen() ? 'close' : 'menu_open' }}</mat-icon>
          </button>
        </div>
      </div>

      <div *ngIf="mobileMenuOpen()" 
           class="lg:hidden fixed inset-x-6 top-24 z-[2000] liquid-glass border border-[var(--glass-border)] rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-[0_40px_100px_rgba(0,0,0,0.8)] animate-mobile-reveal backdrop-blur-3xl overflow-hidden pointer-events-auto">
        
        <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        @for (item of navItems; track item.label; let i = $index) {
          <a [href]="item.href" 
             class="text-4xl font-black tracking-tighter transition-all flex items-center justify-between group"
             [class]="activeSection() === item.id ? 'text-emerald-500' : 'text-[var(--text-secondary)]'"
             (click)="scrollToSection($event, item.href)"
             [style.animation-delay]="i * 40 + 'ms'">
            <span class="group-hover:translate-x-4 transition-transform duration-300 italic uppercase">{{ item.label }}</span>
            <mat-icon class="opacity-0 group-hover:opacity-100 transition-all text-emerald-500">east</mat-icon>
          </a>
        }
        
        <div class="pt-8 border-t border-white/5 mt-4">
          <a href="#contact" 
             class="flex items-center justify-center gap-4 w-full py-6 bg-emerald-500 text-zinc-950 font-black rounded-2xl transition-all active:scale-95 text-xs uppercase tracking-[0.4em] italic shadow-2xl"
             (click)="scrollToSection($event, '#contact')">
            <mat-icon>terminal</mat-icon>
            Initiate Sync
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host { display: block; z-index: 5000; position: fixed; width: 100%; top: 0; }
    .animate-mobile-reveal { animation: mobile-reveal 0.3s cubic-bezier(0.2, 0, 0, 1) forwards; }
    @keyframes mobile-reveal {
      0% { opacity: 0; transform: translateY(-20px) scale(0.95) rotateX(-10deg); }
      100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0); }
    }
  `]
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
  private ngZone = inject(NgZone);
  private observer: IntersectionObserver | null = null;
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  navItems = [
    { label: 'Narrative', href: '#about', id: 'about' },
    { label: 'Stack', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#academic', id: 'academic' }
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode.set(savedTheme ? savedTheme === 'dark' : true);
      this.applyTheme();

      effect(() => {
        const id = this.hoveredSection() || this.activeSection();
        setTimeout(() => this.updatePillPosition(id), 0);
      }, { allowSignalWrites: true });
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      this.setupScrollListener();
    }
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupScrollListener() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(
          throttleTime(16), // ~60fps
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          const isScrolled = window.scrollY > 30;
          if (this.scrolled() !== isScrolled) {
            this.ngZone.run(() => {
              this.scrolled.set(isScrolled);
            });
          }
        });
    });
  }

  onNavContainerLeave() { this.hoveredSection.set(''); }
  onItemHover(id: string) { this.hoveredSection.set(id); }

  private updatePillPosition(activeId: string) {
    if (!this.navLinks) return;
    const activeLink = this.navLinks.find(link => link.nativeElement.getAttribute('data-id') === activeId);

    if (activeLink) {
      const element = activeLink.nativeElement;
      this.pillStyle.set({ left: element.offsetLeft, width: element.offsetWidth, opacity: 1 });
    } else {
      this.pillStyle.update(s => ({ ...s, opacity: 0 }));
    }
    this.cdr.markForCheck();
  }

  toggleMenu() { this.mobileMenuOpen.update(v => !v); }
  toggleTheme() { this.isDarkMode.update(v => !v); this.applyTheme(); }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.toggle('light', !this.isDarkMode());
      localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    }
  }

  private setupIntersectionObserver() {
    const options = { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0.1 };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) this.activeSection.set(entry.target.id);
      });
    }, options);

    this.navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) this.observer?.observe(el);
    });
  }

  scrollToSection(event: Event, href: string) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const id = href.replace('#', '');
      const lenis = (window as any).lenis;

      if (lenis) {
        lenis.scrollTo(href, { offset: -90, duration: 2 });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }

      this.activeSection.set(id);
      if (this.mobileMenuOpen()) {
        this.mobileMenuOpen.set(false);
      }
    }
  }
}
