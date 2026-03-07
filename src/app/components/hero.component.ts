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
          
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-[var(--text-primary)]">
            <div class="overflow-hidden">
              <span #greeting class="inline-block translate-y-full mr-4">Hi, I'm</span>
            </div>
            <div class="min-h-[1.2em] flex items-center">
              <span class="text-[var(--text-primary)]">{{ displayedName() }}</span>
              <span class="animate-blink ml-1 w-1 h-12 bg-emerald-500 inline-block" [class.opacity-0]="!showCursor()"></span>
            </div>
            <div class="overflow-hidden mt-2">
              <span #roleText class="block translate-y-full text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 pb-2 min-h-[1.2em]">Full Stack Developer</span>
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

          <div #animateItem class="flex items-center gap-6 mt-8 text-[var(--text-secondary)] opacity-0 translate-y-4">
            <a href="https://github.com/Naveen-Kumar48" target="_blank" class="hover:text-emerald-400 transition-colors"><mat-icon>code</mat-icon></a>
            <a href="https://www.linkedin.com/in/naveen-kumar-6806382b9/" target="_blank" class="hover:text-emerald-400 transition-colors"><mat-icon>work</mat-icon></a>
            <a href="mailto:kumarnaveen897941@gmail.com" class="hover:text-emerald-400 transition-colors"><mat-icon>alternate_email</mat-icon></a>
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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Cursor blinking
      this.cursorInterval = setInterval(() => {
        this.showCursor.update(v => !v);
      }, 500);

      // 1. "Hi, I'm" Slide Up
      tl.to(this.greetingRef.nativeElement, {
        y: 0,
        duration: 1,
        ease: 'power4.out'
      })
        // 2. Typewriter Effect for Name
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
        // 3. "Full Stack Developer" Slide Up & Scramble
        .to(this.roleTextRef.nativeElement, {
          y: 0,
          duration: 0.8,
          delay: 1.5, // Wait for typewriter
          onStart: () => {
            this.scrambleText(this.roleTextRef.nativeElement, "Full Stack Developer", 1.5);
          }
        })
        // 4. Other items
        .to(this.animateItems.map(el => el.nativeElement), {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }, '-=0.5')
        // 5. Visual Orb
        .to(this.visualRef.nativeElement, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.75)'
        }, '-=1.0');

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
    }
  }
}
