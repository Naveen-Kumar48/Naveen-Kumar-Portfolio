import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, OnDestroy, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="py-32 relative overflow-hidden transition-colors duration-500">
      <!-- High-Fidelity Glows -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2 animate-pulse" style="animation-duration: 5s"></div>
      
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative">
        
        <!-- Interactive Visual Core -->
        <div #imageSide class="relative order-2 lg:order-1 opacity-0 group perspective-1000">
          <div #tiltContainer class="relative z-10 transition-shadow duration-700 ease-out" style="transform-style: preserve-3d">
            <div class="rounded-3xl overflow-hidden border border-[var(--glass-border)] liquid-glass shadow-2xl relative transition-colors duration-1000">
              <img src="/about_tech.webp" alt="Naveen Kumar - Freelance MERN Stack Developer and React.js Expert" width="800" height="1200" loading="lazy" decoding="async" class="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-all duration-[2s] ease-out">
              
              <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-white/5 opacity-0 transition-opacity duration-1000"></div>
              <div class="absolute inset-0 bg-[var(--bg-primary)]/40 group-hover:bg-transparent transition-colors duration-1000"></div>
            </div>

            <!-- Kinetic badges -->
            <div class="absolute -top-6 -right-4 md:-top-10 md:-right-6 p-3 md:p-5 liquid-glass rounded-xl md:rounded-2xl shadow-2xl z-20" style="animation-duration: 3.5s">
              <mat-icon class="text-emerald-500 scale-100 md:scale-125">terminal</mat-icon>
            </div>
            <div class="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-6 p-3 md:p-5 liquid-glass rounded-xl md:rounded-2xl shadow-2xl z-20" style="animation-duration: 4.5s; animation-delay: 1.5s">
              <mat-icon class="text-cyan-500 scale-100 md:scale-125">layers</mat-icon>
            </div>
          </div>

          <!-- Spatial Decor -->
          <div #decorGlow class="absolute -inset-10 border border-emerald-500/10 rounded-[4rem] -z-10 animate-pulse-slow"></div>
        </div>

        <!-- Narrative Content -->
        <div #textSide class="order-1 lg:order-2 opacity-0 translate-x-12">
          <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full liquid-glass border border-emerald-500/30 mb-8">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Architectural Narrative</span>
          </div>

          <h2 class="text-5xl md:text-6xl lg:text-7xl font-black mb-10 tracking-tighter leading-[0.9] text-[var(--text-primary)]">
            Technical Expertise & Core <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500">Web Development Skills</span>
          </h2>
          
          <div class="space-y-8 text-[var(--text-secondary)] leading-relaxed text-lg md:text-xl font-medium">
            <p>
              As a dedicated Full Stack Web Developer, my core expertise lies in the MERN stack. I architect robust backend systems using Node.js and Express, pair them with highly optimized MongoDB databases, and deliver intuitive, responsive frontend interactions using modern React.js.
            </p>
            <p>
              Whether working as a freelance consultant or an integrated team member, my focus is always on clean code, RESTful APIs, and scalable web architecture.
            </p>
          </div>

          <!-- Performance Metrics -->
          <div class="grid grid-cols-2 gap-8 mt-16">
            <div class="group p-8 liquid-glass rounded-3xl border border-[var(--glass-border)] hover:border-emerald-500/40 transition-all duration-700 relative overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
               <h3 class="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2 tracking-tighter">10+</h3>
               <p class="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.5em] font-black italic">Architected Products</p>
            </div>
            <div class="group p-8 liquid-glass rounded-3xl border border-[var(--glass-border)] hover:border-cyan-500/40 transition-all duration-700 relative overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
               <h3 class="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2 tracking-tighter">99.9%</h3>
               <p class="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.5em] font-black italic">System Uptime</p>
            </div>
          </div>
          <p class="text-[var(--text-secondary)] text-xl font-medium leading-relaxed max-w-2xl mt-12 transform translate-y-8 opacity-0 transition-all duration-1000 group-hover:translate-y-0 group-hover:opacity-100">
            I am a <span class="text-[var(--text-primary)] font-black">Freelance Web Developer India</span> specializing in the MERN ecosystem. My mission is to bridge the gap between complex engineering and human-centric design. I build digital experiences that are not just functional, but emotionally resonant.
          </p>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .animate-pulse-slow { animation: pulse 8s infinite ease-in-out; }
    @keyframes pulse { 0%, 100% { opacity: 0.1; scale: 1; } 50% { opacity: 0.4; scale: 1.05; } }
  `]
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('imageSide') imageRef!: ElementRef;
  @ViewChild('tiltContainer') tiltContainer!: ElementRef;
  @ViewChild('textSide') textRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private mouseMoveListener: any;
  private mouseLeaveListener: any;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Tame Entrance Reveal (Optimized for persistence)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.imageRef.nativeElement,
          start: 'top 90%',
          once: true // Only animate once for a smoother experience
        }
      });

      tl.fromTo(this.imageRef.nativeElement,
        { opacity: 0, scale: 0.98, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
        .to(this.textRef.nativeElement, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.4');

      // Tame Floating Physics
      gsap.to(this.tiltContainer.nativeElement, {
        y: -5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Subtle Interactive Tilt
      this.mouseMoveListener = (e: MouseEvent) => {
        const isSmallScreen = window.innerWidth < 1024;
        if (isSmallScreen) return;

        const rect = this.imageRef.nativeElement.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(this.tiltContainer.nativeElement, {
          rotateY: x * 8,
          rotateX: -y * 8,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      this.mouseLeaveListener = () => {
        gsap.to(this.tiltContainer.nativeElement, {
          rotateY: 0, rotateX: 0, duration: 1.5, ease: 'power2.out'
        });
      };

      this.ngZone.runOutsideAngular(() => {
        this.imageRef.nativeElement.addEventListener('mousemove', this.mouseMoveListener);
        this.imageRef.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener);
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.mouseMoveListener) {
        this.imageRef.nativeElement?.removeEventListener('mousemove', this.mouseMoveListener);
      }
      if (this.mouseLeaveListener) {
        this.imageRef.nativeElement?.removeEventListener('mouseleave', this.mouseLeaveListener);
      }
    }
  }
}
