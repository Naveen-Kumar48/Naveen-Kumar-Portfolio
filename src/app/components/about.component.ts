import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, OnDestroy, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="py-32 relative overflow-hidden transition-colors duration-500 bg-[var(--bg-primary)]">
      <!-- High-Fidelity Glows -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2 animate-pulse" style="animation-duration: 5s"></div>
      
      <!-- Sparkle Elements -->
      <div class="absolute top-20 left-20 w-1 h-1 bg-emerald-400 rounded-full opacity-0 animate-sparkle"></div>
      <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-0 animate-sparkle" style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/3 right-10 w-1 h-1 bg-emerald-300 rounded-full opacity-0 animate-sparkle" style="animation-delay: 2s"></div>
      <div class="absolute top-2/3 left-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-0 animate-sparkle" style="animation-delay: 1.5s"></div>
      
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative">
        
        <!-- Interactive Visual Core -->
        <div #imageSide class="relative order-2 lg:order-1 opacity-0 group perspective-1000">
          <div #tiltContainer class="relative z-10 transition-shadow duration-700 ease-out" style="transform-style: preserve-3d">
            <div class="rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.3)] relative transition-all duration-1000 hover:shadow-[0_0_80px_rgba(16,185,129,0.5)] bg-gradient-to-br from-emerald-500/5 to-cyan-500/5">
              <img src="/about_tech.webp" alt="Naveen Kumar - Freelance MERN Stack Developer and React.js Expert" width="800" height="1200" loading="lazy" decoding="async" class="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-all duration-[2s] ease-out">
              
              <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-cyan-400/5 opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div class="absolute inset-0 bg-gradient-to-bl from-cyan-500/5 via-transparent to-emerald-500/5 mix-blend-screen"></div>
            </div>

            <!-- Kinetic badges with Glitter -->
            <div class="absolute -top-6 -right-4 md:-top-10 md:-right-6 p-3 md:p-5 bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 backdrop-blur-md rounded-xl md:rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] z-20 border border-emerald-400/50 hover:border-emerald-300 transition-all duration-500" style="animation-duration: 3.5s">
              <mat-icon class="text-emerald-400 scale-100 md:scale-125 drop-shadow-lg">terminal</mat-icon>
            </div>
            <div class="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-6 p-3 md:p-5 bg-gradient-to-br from-cyan-500/30 to-emerald-500/20 backdrop-blur-md rounded-xl md:rounded-2xl shadow-[0_0_30px_rgba(0,255,200,0.4)] z-20 border border-cyan-400/50 hover:border-cyan-300 transition-all duration-500" style="animation-duration: 4.5s; animation-delay: 1.5s">
              <mat-icon class="text-cyan-400 scale-100 md:scale-125 drop-shadow-lg">layers</mat-icon>
            </div>
          </div>

          <!-- Spatial Decor with Glitter -->
          <div #decorGlow class="absolute -inset-10 border-2 border-emerald-500/20 rounded-[4rem] -z-10 animate-pulse-slow shadow-[inset_0_0_40px_rgba(16,185,129,0.1)]"></div>
        </div>

        <!-- Narrative Content -->
        <div #textSide class="order-1 lg:order-2 opacity-0 translate-x-12">
          <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/50 mb-8 backdrop-blur-sm hover:border-emerald-400 transition-all duration-500 shadow-lg">
            <span class="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse shadow-lg"></span>
            <span class="text-[10px] font-black bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent uppercase tracking-[0.3em]">Architectural Narrative</span>
          </div>

          <h2 class="text-5xl md:text-6xl lg:text-7xl font-black mb-10 tracking-tighter leading-[0.9] text-[var(--text-primary)]">
            Technical Expertise & Core <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 animate-shimmer drop-shadow-lg" style="filter: drop-shadow(0 0 20px rgba(16,185,129,0.4));">Web Development Skills</span>
          </h2>
          
          <div class="space-y-8 text-[var(--text-secondary)] leading-relaxed text-lg md:text-xl font-medium">
            <p class="group hover:text-[var(--text-primary)] transition-colors duration-500 p-6 rounded-xl bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20 hover:border-emerald-400/50 backdrop-blur-sm">
              As a dedicated Full Stack Web Developer, my core expertise lies in the MERN stack. I architect robust backend systems using Node.js and Express, pair them with highly optimized MongoDB databases, and deliver intuitive, responsive frontend interactions using modern React.js.
            </p>
            <p class="group hover:text-[var(--text-primary)] transition-colors duration-500 p-6 rounded-xl bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-sm">
              Whether working as a freelance consultant or an integrated team member, my focus is always on clean code, RESTful APIs, and scalable web architecture. I also have a Basic knowledge of SEO.
            </p>
          </div>

          <!-- Performance Metrics -->
          <div class="grid grid-cols-2 gap-8 mt-16">
            <div class="group p-8 bg-gradient-to-br from-emerald-500/15 to-transparent rounded-3xl border-2 border-emerald-500/40 hover:border-emerald-400 transition-all duration-700 relative overflow-hidden hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]">
               <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent group-hover:from-emerald-500/20 transition-all duration-700"></div>
               <div class="absolute top-0 right-0 w-20 h-20 bg-emerald-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
               <h3 class="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2 tracking-tighter relative z-10">10+</h3>
               <p class="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.5em] font-black italic relative z-10">Architected Products</p>
            </div>
            <div class="group p-8 bg-gradient-to-br from-cyan-500/15 to-transparent rounded-3xl border-2 border-cyan-500/40 hover:border-cyan-400 transition-all duration-700 relative overflow-hidden hover:shadow-[0_0_40px_rgba(0,255,200,0.3)]">
               <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent group-hover:from-cyan-500/20 transition-all duration-700"></div>
               <div class="absolute top-0 right-0 w-20 h-20 bg-cyan-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
               <h3 class="text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-2 tracking-tighter relative z-10">99.9%</h3>
               <p class="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.5em] font-black italic relative z-10">System Uptime</p>
            </div>
          </div>
          <p class="text-[var(--text-secondary)] text-xl font-medium leading-relaxed max-w-2xl mt-12 transform translate-y-8 opacity-0 transition-all duration-1000 group-hover:translate-y-0 group-hover:opacity-100 p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 hover:border-emerald-400 hover:text-[var(--text-primary)]">
            I am a <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-black">Freelance Web Developer India</span> specializing in the MERN ecosystem. My mission is to bridge the gap between complex engineering and human-centric design. I build digital experiences that are not just functional, but emotionally resonant.
          </p>
          <div class="mt-8 p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl border-2 border-emerald-500/50 text-center backdrop-blur-sm hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-500">
            <p class="text-[var(--text-primary)] text-sm md:text-base font-bold tracking-wider uppercase">
              Search On Google <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-black">NAVEEN KUMAR MERN</span> TO SEE THIS WEBSITE ON TOP 3 RANKING
            </p>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
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
