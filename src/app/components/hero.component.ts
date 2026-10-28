import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, ViewChildren, QueryList, OnDestroy, signal, ChangeDetectionStrategy, NgZone, WritableSignal } from '@angular/core';
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
      
      <!-- Sparkle Elements -->
      <div class="absolute top-20 left-20 w-1 h-1 bg-emerald-400 rounded-full opacity-0 animate-sparkle"></div>
      <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-0 animate-sparkle" style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/3 right-10 w-1 h-1 bg-emerald-300 rounded-full opacity-0 animate-sparkle" style="animation-delay: 2s"></div>
      <div class="absolute top-2/3 left-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-0 animate-sparkle" style="animation-delay: 1.5s"></div>
      <div class="absolute bottom-1/4 right-1/3 w-1 h-1 bg-emerald-400 rounded-full opacity-0 animate-sparkle" style="animation-delay: 2.5s"></div>
      
      <!-- Spatial Environment -->
      <app-galaxy class="absolute inset-0 w-full h-full opacity-40 -z-10"></app-galaxy>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/20 to-[var(--bg-primary)] pointer-events-none -z-10 transition-colors duration-1000"></div>

      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-20">
        <header #content class="flex flex-col gap-10 will-change-transform">
          
          <!-- Tactical Badge -->
          <div #badgeContainer class="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/50 w-fit opacity-0 translate-y-12 backdrop-blur-sm hover:border-emerald-400 transition-all duration-500 shadow-lg">
            <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></span>
            </span>
            <span class="text-[11px] font-black bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent uppercase tracking-[0.4em] italic leading-none">
                {{ displayedBadge() }}<span class="animate-pulse bg-emerald-500 w-1 h-3 inline-block ml-1" [style.display]="activeSection() === 'badge' ? 'inline-block' : 'none'"></span>
            </span>
          </div>
          
          <div class="flex flex-col gap-4">
            <h1 class="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.82] text-[var(--text-primary)]">
               <!-- Narrative Greeting -->
                <div class="min-h-[1.2em] mb-2">
                  <span class="inline-block mr-4 text-[var(--text-secondary)] text-xl md:text-3xl lg:text-4xl font-black italic">
                    {{ displayedGreeting() }}<span class="animate-pulse bg-[var(--text-secondary)] w-1 h-6 md:h-8 inline-block ml-1" [style.display]="activeSection() === 'greeting' ? 'inline-block' : 'none'"></span>
                  </span>
                </div>

               <!-- Primary Identity -->
               <div class="min-h-[1.1em] flex items-center tracking-tighter perspective-1500 mb-8 font-black scale-100 origin-left">
                 <span class="bg-clip-text text-transparent bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)] drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)]">
                   {{ displayedName() }}
                 </span>
                 <span class="animate-pulse md:ml-4 w-4 h-[0.9em] bg-gradient-to-b from-emerald-500 to-cyan-500 inline-block shadow-[0_0_40px_rgba(16,185,129,0.9)] rounded-sm" [style.display]="activeSection() === 'name' ? 'inline-block' : 'none'"></span>
               </div>

               <!-- Kinetic Role Matrix (Infinite Cycle) -->
                <div class="min-h-[1.2em] font-black text-6xl md:text-7xl lg:text-8xl italic uppercase leading-[1.1] max-w-2xl lg:max-w-lg mb-6">
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 animate-shimmer drop-shadow-[0_10px_20px_rgba(16,185,129,0.15)] py-2">
                     {{ displayedRole() }}
                  </span><span class="animate-pulse bg-gradient-to-b from-emerald-500 to-cyan-500 w-2 md:w-3 h-[0.85em] inline-block align-baseline ml-2 md:ml-4 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.5)]" [style.display]="activeSection() === 'role' ? 'inline-block' : 'none'"></span>
                </div>
            </h1>
          </div>
          
          <p #animateItem class="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl font-bold opacity-0 translate-y-12 leading-relaxed p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 hover:border-emerald-400 hover:text-[var(--text-primary)] transition-all duration-500">
            Senior Full Stack Developer specializing in React.js and Node.js. I build <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-black italic">scalable, user-centric</span> digital products for startups and enterprises.
          </p>
          
          <div #animateItem class="flex flex-wrap gap-10 mt-6 items-center opacity-0 translate-y-12">
            <a href="#projects" 
               appMagnetic
               (click)="scrollToProjects($event)"
               class="px-12 py-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-black rounded-3xl transition-all shadow-2xl hover:scale-110 active:scale-95 flex items-center gap-3 uppercase text-[12px] tracking-[0.3em] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              Explore my latest full stack MERN projects <mat-icon class="text-sm">arrow_outward</mat-icon>
            </a>
            
            <div appMagnetic>
                <app-download-resume></app-download-resume>
            </div>
          </div>

          <div #animateItem class="flex items-center gap-12 mt-12 opacity-0 translate-y-12">
            <a href="https://github.com/Naveen-Kumar48" target="_blank" appMagnetic class="text-[var(--text-secondary)] hover:text-emerald-400 transition-all duration-700 hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/naveen-kumar-dev/" target="_blank" appMagnetic class="text-[var(--text-secondary)] hover:text-cyan-400 transition-all duration-700 hover:drop-shadow-[0_0_20px_rgba(0,255,200,0.5)]" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </header>

        <aside #visual class="relative hidden lg:flex items-center justify-center h-[750px] w-full pointer-events-none opacity-0 scale-90 translate-x-20 -translate-y-32" style="transform-style: preserve-3d">
           <div #orbContainer class="w-[650px] h-[650px] pointer-events-auto filter drop-shadow-[0_0_80px_rgba(16,185,129,0.25)]">
             <app-orb [hue]="160" [hoverIntensity]="0.9" [rotateOnHover]="true" [forceHoverState]="false" backgroundColor="transparent"></app-orb>
           </div>
           <div class="absolute -top-12 -right-12 w-48 h-48 liquid-glass rounded-full border-2 border-emerald-500/30 -z-10 animate-float-slow opacity-10 blur-xl"></div>
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
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private cursorInterval: ReturnType<typeof setInterval> | null = null;
  private isDestroyed = false;
  private mainTimeline: gsap.core.Timeline | null = null;
  private orbAnimation: gsap.core.Tween | null = null;

  // Infinity Cycle Config
  private roles = ["Full Stack Developer", "MERN Stack Developer", "React Developer"];
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
    this.mainTimeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    // Optimized badge entrance - smooth fade in
    this.mainTimeline.to(this.badgeContainer.nativeElement, {
      opacity: 1, 
      y: 0, 
      duration: 0.7, 
      delay: 0.25,
      ease: 'power2.out'
    });

    // Typing animation
    this.mainTimeline.add(() => {
      this.runSequeTyped([
        { text: "Extreme-Tier / Active", signal: this.displayedBadge, type: 'badge' },
        { text: "Hi, I'm", signal: this.displayedGreeting, type: 'greeting' },
        { text: "Naveen Kumar", signal: this.displayedName, type: 'name' }
      ]);
    }, "-=0.2");

    // Optimized item entrance - smooth staggered animation
    this.mainTimeline.to(this.animateItems.map(el => el.nativeElement), {
      opacity: 1, 
      y: 0, 
      duration: 0.75, 
      stagger: 0.12,
      ease: 'power2.out'
    }, "+=1.4");

    // Optimized visual entrance - smoother scale and fade
    this.mainTimeline.to(this.visualRef.nativeElement, { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      duration: 1.2,
      ease: 'power2.out'
    }, "-=0.8");

    // Optimized orbit animation - smooth continuous float
    this.orbAnimation = gsap.to(this.orbContainerRef.nativeElement, { 
      y: 25, 
      duration: 5, 
      repeat: -1, 
      yoyo: true, 
      ease: 'sine.inOut',
      force3D: true 
    });

    // Optimized parallax - smooth mouse tracking without jank
    // Disable parallax logic on touch-only protocols or small screens to ensure performance
    const isTouch = window.matchMedia('(hover: none)').matches;
    this.mouseMoveListener = (e: MouseEvent) => {
      if (isTouch || window.innerWidth < 1024) return;
      // Hero is offscreen: no point running tweens
      if (window.scrollY > window.innerHeight) return;

      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      
      // Smoother easing with GPU acceleration
      gsap.to(this.contentRef.nativeElement, { 
        x: x * -40, 
        y: y * -40, 
        rotateY: x * 10, 
        duration: 2, 
        ease: 'power2.out', 
        overwrite: 'auto',
        force3D: true
      });
      
      gsap.to(this.visualRef.nativeElement, { 
        x: x * 80, 
        y: y * 80, 
        rotateY: x * 20, 
        rotateX: -y * 20, 
        duration: 2.5, 
        ease: 'power2.out', 
        overwrite: 'auto',
        force3D: true
      });
    };

    this.ngZone.runOutsideAngular(() => {
      if (this.mouseMoveListener) {
        window.addEventListener('mousemove', this.mouseMoveListener);
      }
    });
  }

  private runSequeTyped(items: { text: string; signal: WritableSignal<string>; type: 'badge' | 'greeting' | 'name' | 'role' }[], index = 0) {
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
        // Optimized timing for smoother feel
        setTimeout(type, 18 + Math.random() * 18);
      } else {
        setTimeout(() => this.runSequeTyped(items, index + 1), 250);
      }
    };
    type();
  }

  private startInfiniteRoleCycle() {
    this.activeSection.set('role');
    this.swapRole(this.roles[this.currentRoleIndex]);
  }

  private swapRole(role: string) {
    // Instantly display the new role
    this.displayedRole.set(role);
    
    // Animate the role element with scale transition
    const roleElement = document.querySelector('span.animate-shimmer');
    if (roleElement && !this.isDestroyed) {
      // Scale in animation
      gsap.fromTo(roleElement,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out' }
      );
    }
    
    // Wait and then swap to next role
    setTimeout(() => {
      if (!this.isDestroyed) {
        this.animateRoleOut(() => {
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          this.swapRole(this.roles[this.currentRoleIndex]);
        });
      }
    }, 2800);
  }

  private animateRoleOut(callback: () => void) {
    const roleElement = document.querySelector('span.animate-shimmer');
    if (roleElement && !this.isDestroyed) {
      // Scale out animation
      gsap.to(roleElement,
        { scale: 0.85, opacity: 0, duration: 0.5, ease: 'back.in', onComplete: callback }
      );
    } else {
      callback();
    }
  }

  scrollToProjects(event: Event) {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const lenis = (window as unknown as Window & { lenis?: { scrollTo: (target: string, options?: { offset?: number; duration?: number }) => void } }).lenis;
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
