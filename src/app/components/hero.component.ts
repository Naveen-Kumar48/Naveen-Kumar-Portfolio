import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, ViewChildren, QueryList, OnDestroy, signal, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { GalaxyComponent } from './Gallaxy.component';
import { OrbComponent } from './orb.component';
import { DownloadResumeBtnComponent } from './download-resume.component';
import { MagneticDirective } from '../directives/magnetic.directive';
import { StorylineComponent } from './storyline.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatIconModule, GalaxyComponent, OrbComponent, DownloadResumeBtnComponent, MagneticDirective, StorylineComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden selection:bg-emerald-500/30 will-change-transform">
      <app-storyline></app-storyline>
      
      <!-- Spatial Environment -->
      <app-galaxy class="absolute inset-0 w-full h-full opacity-40 mix-blend-screen -z-10"></app-galaxy>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/20 to-[var(--bg-primary)] pointer-events-none -z-10 transition-colors duration-1000"></div>

      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-20">
        <header #content class="flex flex-col gap-10 will-change-transform">
          
          <!-- Tactical Badge -->
          <div #badgeContainer class="inline-flex items-center gap-3 px-5 py-2 rounded-full liquid-glass border border-emerald-500/30 w-fit opacity-0 translate-y-12">
            <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></span>
            </span>
            <span class="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] italic leading-none">
                {{ displayedBadge() }}<span *ngIf="activeSection() === 'badge'" class="animate-pulse bg-emerald-500 w-1 h-3 inline-block ml-1"></span>
            </span>
          </div>
          
          <div class="flex flex-col gap-4">
            <h1 class="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.82] text-[var(--text-primary)]">
               <!-- Narrative Greeting -->
               <div class="min-h-[1.2em] mb-2">
                 <span class="inline-block mr-4 text-[var(--text-secondary)] text-3xl md:text-4xl lg:text-5xl font-black italic">
                   {{ displayedGreeting() }}<span *ngIf="activeSection() === 'greeting'" class="animate-pulse bg-[var(--text-secondary)] w-1 h-8 inline-block ml-1"></span>
                 </span>
               </div>

               <!-- Primary Identity -->
               <div class="min-h-[1.1em] flex items-center tracking-tighter perspective-1500 mb-6 font-black scale-100 origin-left">
                 <span class="bg-clip-text text-transparent bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)] drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)]">
                   {{ displayedName() }}
                 </span>
                 <span *ngIf="activeSection() === 'name'" class="animate-pulse md:ml-4 w-4 h-[0.9em] bg-emerald-500 inline-block shadow-[0_0_40px_rgba(16,185,129,0.9)] rounded-sm"></span>
               </div>

               <!-- Kinetic Role Matrix (Infinite Cycle) -->
               <div class="min-h-[1.2em]">
                 <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl italic uppercase leading-[1.1] drop-shadow-[0_10px_20px_rgba(16,185,129,0.15)]">
                    {{ displayedRole() }}<span *ngIf="activeSection() === 'role'" class="animate-pulse bg-emerald-500 w-1 h-12 lg:h-16 xl:h-20 inline-block ml-2 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
                 </span>
               </div>
            </h1>
          </div>
          
          <p #animateItem class="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl font-bold opacity-0 translate-y-12 leading-relaxed">
            As a <span class="text-[var(--text-primary)] font-black text-reveal-gradient italic">Full Stack Developer in New Delhi</span>, I architect high-performance SaaS infrastructures and AI-integrated multi-cloud systems with mathematical precision.
          </p>
          
          <div #animateItem class="flex flex-wrap gap-10 mt-6 items-center opacity-0 translate-y-12">
            <a href="#projects" 
               appMagnetic
               (click)="scrollToProjects($event)"
               class="px-12 py-6 bg-[var(--text-primary)] text-[var(--bg-primary)] font-black rounded-3xl transition-all shadow-2xl hover:scale-110 active:scale-95 flex items-center gap-3 uppercase text-[12px] tracking-[0.3em]">
              Examine Codebase <mat-icon class="text-sm">arrow_outward</mat-icon>
            </a>
            
            <div appMagnetic>
                <app-download-resume></app-download-resume>
            </div>
          </div>

          <div #animateItem class="flex items-center gap-12 mt-12 opacity-0 translate-y-12">
            <a href="https://github.com/Naveen-Kumar48" target="_blank" appMagnetic class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-700" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/naveen-kumar-6806382b9/" target="_blank" appMagnetic class="text-[var(--text-secondary)] hover:text-emerald-500 transition-all duration-700" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </header>

        <aside #visual class="relative hidden lg:flex items-center justify-center h-[750px] w-full pointer-events-none opacity-0 scale-90 translate-x-20" style="transform-style: preserve-3d">
           <div #orbContainer class="w-[650px] h-[650px] pointer-events-auto filter drop-shadow-[0_0_80px_rgba(16,185,129,0.25)]">
             <app-orb [hue]="160" [hoverIntensity]="0.9" [rotateOnHover]="true" [forceHoverState]="false" backgroundColor="transparent"></app-orb>
           </div>
           <div class="absolute -top-12 -right-12 w-48 h-48 liquid-glass rounded-full border border-white/5 -z-10 animate-float-slow opacity-10 blur-xl"></div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .perspective-1500 { perspective: 1500px; }
    .animate-float-slow { animation: float 10s infinite ease-in-out; }
    .text-reveal-gradient { background: linear-gradient(90deg, #10b981, #06b6d4, #10b981); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shine 5s linear infinite; }
    @keyframes float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-20px, 40px); } }
    @keyframes shine { to { background-position: 200% center; } }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('content') contentRef!: ElementRef;
  @ViewChild('visual') visualRef!: ElementRef;
  @ViewChild('orbContainer') orbContainerRef!: ElementRef;
  @ViewChild('badgeContainer') badgeContainer!: ElementRef;
  @ViewChildren('animateItem') animateItems!: QueryList<ElementRef>;

  displayedBadge = signal('');
  displayedGreeting = signal('');
  displayedName = signal('');
  displayedRole = signal('');
  activeSection = signal<'badge' | 'greeting' | 'name' | 'role' | 'done'>('badge');
  showCursor = signal(true);

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private mouseMoveListener: any;
  private cursorInterval: any;
  private isDestroyed = false;
  private mainTimeline: gsap.core.Timeline | null = null;
  private orbAnimation: gsap.core.Tween | null = null;

  // Infinity Cycle Config
  private roles = ["Full Stack Architect", "MERN Stack Developer", "React Developer India", "Node.js Developer Delhi"];
  private currentRoleIndex = 0;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
      this.cursorInterval = setInterval(() => {
        if (!this.isDestroyed) this.showCursor.update(v => !v);
      }, 500);
    }
  }

  private initAnimations() {
    this.mainTimeline = gsap.timeline({ defaults: { ease: 'expo.out' } });

    this.mainTimeline.to(this.badgeContainer.nativeElement, {
      opacity: 1, y: 0, duration: 1.5, delay: 1.0
    });

    this.mainTimeline.add(() => {
      this.runSequeTyped([
        { text: "Extreme-Tier Engineering / Active", signal: this.displayedBadge, type: 'badge' },
        { text: "Hi, I'm", signal: this.displayedGreeting, type: 'greeting' },
        { text: "Naveen Kumar", signal: this.displayedName, type: 'name' }
      ]);
    }, "-=0.5");

    this.mainTimeline.to(this.animateItems.map(el => el.nativeElement), {
      opacity: 1, y: 0, duration: 2, stagger: 0.2, ease: 'power4.out'
    }, "+=3.5");

    this.mainTimeline.to(this.visualRef.nativeElement, { opacity: 1, scale: 1, x: 0, duration: 3, ease: 'expo.out' }, "-=3");

    this.orbAnimation = gsap.to(this.orbContainerRef.nativeElement, { y: 50, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    this.mouseMoveListener = (e: MouseEvent) => {
      // Disable parallax logic on touch-only protocols to ensure interaction integrity
      const isTouch = window.matchMedia('(hover: none)').matches;
      if (isTouch) return;

      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      gsap.to(this.contentRef.nativeElement, { x: x * -40, y: y * -40, rotateY: x * 10, duration: 2.5, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(this.visualRef.nativeElement, { x: x * 80, y: y * 80, rotateY: x * 20, rotateX: -y * 20, duration: 3, ease: 'power3.out', overwrite: 'auto' });
    };

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.mouseMoveListener);
    });
  }

  private runSequeTyped(items: any[], index = 0) {
    if (this.isDestroyed || index >= items.length) {
      if (!this.isDestroyed) this.startInfiniteRoleCycle();
      return;
    }

    const current = items[index];
    this.activeSection.set(current.type);

    let charIndex = 0;
    const type = () => {
      if (this.isDestroyed) return;
      if (charIndex < current.text.length) {
        current.signal.set(current.text.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(type, 30 + Math.random() * 40);
      } else {
        setTimeout(() => this.runSequeTyped(items, index + 1), 400);
      }
    };
    type();
  }

  private startInfiniteRoleCycle() {
    this.activeSection.set('role');
    this.typeRole(this.roles[this.currentRoleIndex]);
  }

  private typeRole(role: string) {
    let charIndex = 0;
    const type = () => {
      if (this.isDestroyed) return;
      if (charIndex < role.length) {
        this.displayedRole.set(role.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(type, 50 + Math.random() * 30);
      } else {
        setTimeout(() => this.backspaceRole(role), 3000);
      }
    };
    type();
  }

  private backspaceRole(role: string) {
    let charIndex = role.length;
    const backspace = () => {
      if (this.isDestroyed) return;
      if (charIndex >= 0) {
        this.displayedRole.set(role.substring(0, charIndex));
        charIndex--;
        setTimeout(backspace, 30);
      } else {
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        setTimeout(() => this.typeRole(this.roles[this.currentRoleIndex]), 500);
      }
    };
    backspace();
  }

  scrollToProjects(event: Event) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo('#projects', { offset: -80, duration: 2 });
      } else {
        const element = document.querySelector('#projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    if (isPlatformBrowser(this.platformId)) {
      if (this.mouseMoveListener) window.removeEventListener('mousemove', this.mouseMoveListener);
      if (this.cursorInterval) clearInterval(this.cursorInterval);
      // Kill GSAP animations to prevent memory leaks
      if (this.mainTimeline) this.mainTimeline.kill();
      if (this.orbAnimation) this.orbAnimation.kill();
    }
  }
}
