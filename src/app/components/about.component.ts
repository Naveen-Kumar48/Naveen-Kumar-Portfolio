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
            <div class="rounded-3xl overflow-hidden border border-[var(--glass-border)] liquid-glass shadow-2xl relative group-hover:border-emerald-500/50 transition-colors duration-1000">
              <img src="/about_tech.png" alt="Advanced Architecture Visualization" loading="lazy" decoding="async" class="w-full h-auto object-cover transform scale-105 group-hover:scale-100 transition-all duration-[2s] ease-out mix-blend-luminosity group-hover:mix-blend-normal">
              
              <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div class="absolute inset-0 bg-[var(--bg-primary)]/40 group-hover:bg-transparent transition-colors duration-1000"></div>
            </div>

            <!-- Kinetic badges -->
            <div class="absolute -top-10 -right-6 p-5 liquid-glass rounded-2xl shadow-2xl z-20" style="animation-duration: 3.5s">
              <mat-icon class="text-emerald-500 scale-125">terminal</mat-icon>
            </div>
            <div class="absolute -bottom-8 -left-6 p-5 liquid-glass rounded-2xl shadow-2xl z-20" style="animation-duration: 4.5s; animation-delay: 1.5s">
              <mat-icon class="text-cyan-500 scale-125">layers</mat-icon>
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
            Engineering High-End <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500">Digital Solutions</span>
          </h2>
          
          <div class="space-y-8 text-[var(--text-secondary)] leading-relaxed text-lg md:text-xl font-medium">
            <p>
              I am a Senior Software Architect specializing in <span class="text-[var(--text-primary)] font-black italic">Next-Level MERN</span> and <span class="text-[var(--text-primary)] font-black italic">AI-First Engineering</span>. My workflow is predicated on the rigorous integration of scalable backend logic and high-fidelity front-end design systems.
            </p>
            <p>
              From architecting production-grade SaaS engines like <span class="text-emerald-500 font-extrabold underline decoration-emerald-500/20 underline-offset-8">FlashMind</span> to engineering real-time decentralized cloud infrastructures, I prioritize performance, security, and elite Machine Experience (MX).
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
        { opacity: 0, scale: 0.98, y: 30, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }
      )
        .to(this.textRef.nativeElement, {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power2.out'
        }, '-=0.8');

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
