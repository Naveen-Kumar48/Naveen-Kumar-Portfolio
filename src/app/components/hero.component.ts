import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, ViewChildren, QueryList, OnDestroy, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ThreeHeroComponent } from './three-hero.component';
import { OrbComponent } from './orb.component';
import { DownloadResumeBtnComponent } from './download-resume.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatIconModule, ThreeHeroComponent, OrbComponent, DownloadResumeBtnComponent],
  template: `
    <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" style="perspective: 1000px">
      <!-- 3D Background -->
      <app-three-hero class="absolute inset-0 w-full h-full" />

      <!-- Gradient Overlay for text readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/50 to-[var(--bg-primary)]/90 pointer-events-none transition-colors duration-300"></div>

      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div #content class="flex flex-col gap-6">
          <div #animateItem class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] backdrop-blur-md border border-[var(--border-color)] w-fit opacity-0 translate-y-4 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Available for work</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <div class="overflow-hidden">
              <span #greeting class="inline-block mr-4 text-[var(--text-primary)]">Hi, I'm</span>
            </div>
            <div class="min-h-[1.2em] flex items-center">
              <span class="text-[var(--text-primary)]">{{ displayedName() }}</span>
              <span class="animate-blink ml-1 w-1 h-12 bg-emerald-500 inline-block" [class.opacity-0]="!showCursor()"></span>
            </div>
            <div class="overflow-hidden mt-2">
              <span #roleText class="block pb-2 min-h-[1.2em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">MERN Stack Developer</span>
            </div>
          </h1>
          
          <p #animateItem class="text-xl text-[var(--text-secondary)] max-w-lg leading-relaxed opacity-0 translate-y-4">
            Specializing in MERN Stack and Next.js. Building AI-integrated SaaS platforms and secure e-commerce systems.
          </p>
          
          <div #animateItem class="flex flex-wrap gap-4 mt-4 items-center opacity-0 translate-y-4">
            <a href="#projects" class="w-[130px] h-[40px] flex justify-center items-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-all text-sm gap-1">
              View Projects
              <!-- <mat-icon class="text-sm">arrow_forward</mat-icon> -->
            </a>
            
            <app-download-resume></app-download-resume>
          </div>

          <div #animateItem class="flex items-center gap-6 mt-8 opacity-0 translate-y-4">
            <a href="https://github.com/Naveen-Kumar48" target="_blank" class="text-[var(--text-secondary)] hover:text-[#fff] hover:scale-110 transition-all duration-300" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/naveen-kumar-6806382b9/" target="_blank" class="text-[var(--text-secondary)] hover:text-[#0A66C2] hover:scale-110 transition-all duration-300" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="mailto:kumarnaveen897941@gmail.com" class="text-[var(--text-secondary)] hover:text-[#EA4335] hover:scale-110 transition-all duration-300" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
            </a>
          </div>
        </div>

        <!-- Visual side with Orb -->
        <div #visual class="relative hidden lg:flex items-center justify-center h-[600px] w-full pointer-events-none opacity-0 scale-90" style="transform-style: preserve-3d">
           <div #orbContainer class="w-[500px] h-[500px] pointer-events-auto">
             <app-orb 
               [hue]="160" 
               [hoverIntensity]="0.5" 
               [rotateOnHover]="true" 
               [forceHoverState]="false"
               backgroundColor="transparent"
             ></app-orb>
           </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('greeting') greetingRef!: ElementRef;
  @ViewChild('roleText') roleTextRef!: ElementRef;
  @ViewChildren('animateItem') animateItems!: QueryList<ElementRef>;
  @ViewChild('content') contentRef!: ElementRef;
  @ViewChild('visual') visualRef!: ElementRef;
  @ViewChild('orbContainer') orbContainerRef!: ElementRef;

  displayedName = signal('');
  showCursor = signal(true);

  private platformId = inject(PLATFORM_ID);
  private mouseMoveListener: any;
  private cursorInterval: any;
  private roleInterval: any;
  private roles = ["MERN Stack Developer", "Full Stack Developer"];

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Cursor blinking
      this.cursorInterval = setInterval(() => {
        this.showCursor.update(v => !v);
      }, 500);

      // Split text into individual characters for advanced animation
      const greetingElement = this.greetingRef.nativeElement;
      const roleElement = this.roleTextRef.nativeElement;

      // 1. "Hi, I'm" - Staggered letter drop with glow
      tl.from(greetingElement, {
        opacity: 0,
        y: -100,
        rotationX: -90,
        duration: 1.2,
        ease: 'back.out(1.7)',
        transformOrigin: 'top center'
      }
      )
        // Animate individual letters with stagger
        .fromTo(greetingElement.querySelectorAll('span, char'),
          {
            opacity: 0,
            y: 50,
            scale: 0.5
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'elastic.out(1, 0.5)'
          },
          '-=0.8')
        // 2. Typewriter Effect for Name with glow pulse
        .call(() => {
          const name = "Naveen Kumar";
          const obj = { length: 0 };
          gsap.to(obj, {
            length: name.length,
            duration: 1.5,
            ease: `steps(${name.length})`,
            onUpdate: () => {
              this.displayedName.set(name.substring(0, Math.ceil(obj.length)));
            }
          });
        }, undefined, '-=0.5')
        // 3. Role Text - Scramble decode effect with wave animation
        .to(roleElement, {
          y: 0,
          duration: 0.8,
          delay: 1.5,
          onStart: () => {
            let roleIndex = 0;
            const cycleRoles = () => {
              this.scrambleText(roleElement, this.roles[roleIndex], 1.5);
              roleIndex = (roleIndex + 1) % this.roles.length;
            };
            cycleRoles();
            this.roleInterval = setInterval(cycleRoles, 4000);

            // Add wave animation to letters
            gsap.fromTo(roleElement.querySelectorAll('span, char'),
              { scaleY: 0.5 },
              {
                scaleY: 1,
                duration: 0.3,
                stagger: 0.05,
                ease: 'back.out(1.7)',
                repeat: 1,
                yoyo: true
              }
            );
          }
        })
        // 4. Other items - Cascade in with bounce
        .to(this.animateItems.map(el => el.nativeElement), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            amount: 0.4,
            from: 'start',
            ease: 'back.out(1.7)'
          },
          ease: 'back.out(1.7)'
        }, '-=0.5')
        // 5. Visual Orb - Scale and rotate entrance
        .fromTo(this.visualRef.nativeElement,
          {
            opacity: 0,
            scale: 0.5,
            rotationY: -180
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.5,
            ease: 'elastic.out(1, 0.6)'
          },
          '-=1.0');

      // Floating Animation
      gsap.to(this.orbContainerRef.nativeElement, {
        y: 30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Parallax Effect
      this.mouseMoveListener = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);

        gsap.to(this.contentRef.nativeElement, {
          x: x * -20,
          y: y * -20,
          duration: 1,
          ease: 'power2.out'
        });

        gsap.to(this.visualRef.nativeElement, {
          x: x * 40,
          y: y * 40,
          rotationY: x * 15,
          rotationX: -y * 15,
          duration: 1,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', this.mouseMoveListener);
    }
  }

  scrambleText(element: HTMLElement, finalText: string, duration: number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    const startTime = Date.now();
    const durationMs = duration * 1000;

    const update = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / durationMs, 1);

      let result = "";
      for (let i = 0; i < finalText.length; i++) {
        if (progress >= 1 || i < finalText.length * progress) {
          result += finalText[i];
        } else if (finalText[i] === ' ') {
          result += ' ';
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.innerText = result;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.mouseMoveListener) {
        window.removeEventListener('mousemove', this.mouseMoveListener);
      }
      if (this.cursorInterval) {
        clearInterval(this.cursorInterval);
      }
      if (this.roleInterval) {
        clearInterval(this.roleInterval);
      }
    }
  }
}
