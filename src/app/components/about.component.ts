import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="about" class="py-24 relative overflow-hidden">
      <!-- Background subtle elements (Pulsing Glows) -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2 animate-pulse" style="animation-delay: 2s"></div>
      
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative">
        
        <!-- ImageSide with Tech Concept -->
        <div #imageSide class="relative order-2 md:order-1 opacity-0 group">
          <div #tiltContainer class="relative z-10 transition-transform duration-300 ease-out" style="transform-style: preserve-3d">
            <div class="rounded-2xl overflow-hidden border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative group-hover:border-emerald-500/50 transition-colors duration-700">
              <img src="/about_tech.png" alt="Advanced Full Stack Architecture" class="w-full h-auto object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-in-out">
              
              <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div class="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out"></div>
              
              <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--bg-secondary)]/80 to-transparent"></div>
            </div>

            <!-- Floating Tech Badges -->
            <div class="absolute -top-6 -right-6 p-4 bg-[var(--bg-secondary)] backdrop-blur-md border border-emerald-500/30 rounded-2xl shadow-xl z-20 animate-bounce group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300" style="animation-duration: 3.5s">
              <mat-icon class="text-emerald-500">terminal</mat-icon>
            </div>
            <div class="absolute -bottom-6 -left-6 p-4 bg-[var(--bg-secondary)] backdrop-blur-md border border-cyan-500/30 rounded-2xl shadow-xl z-20 animate-bounce group-hover:scale-110 group-hover:translate-y-2 transition-all duration-300" style="animation-duration: 4.5s; animation-delay: 1.5s">
              <mat-icon class="text-cyan-500">api</mat-icon>
            </div>
          </div>

          <!-- Decorative Glowing Orbs -->
          <div #decorGlow class="absolute -top-6 -left-6 w-full h-full border-2 border-emerald-500/20 rounded-2xl -z-10"></div>
          <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl -z-10 group-hover:bg-emerald-400/40 transition-all duration-1000"></div>
        </div>

        <!-- Text Side -->
        <div #textSide class="order-1 md:order-2 opacity-0 translate-x-12">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">My Professional Journey</span>
          </div>

          <h2 class="text-4xl md:text-5xl font-bold mb-8 tracking-tighter leading-tight">
            Engineering High-End <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Digital Solutions</span>
          </h2>
          
          <div class="space-y-6 text-[var(--text-secondary)] leading-relaxed text-lg">
            <p>
              I'm an ambitious Full Stack Developer specializing in <span class="text-[var(--text-primary)] font-medium">MERN Stack</span> and <span class="text-[var(--text-primary)] font-medium">AI-powered Applications</span>. I excel at bridging the gap between rigorous backend architectures and pixel-perfect design systems.
            </p>
            <p>
              From building high-performance SaaS tools like <span class="text-emerald-400 font-semibold italic">FlashMind</span> to real-time communication engines, my focus is always on delivering <span class="text-[var(--text-primary)] underline decoration-emerald-500/30 underline-offset-4">production-ready quality</span> that scales with user demand.
            </p>
          </div>

          <!-- Professional Metrics Grid -->
          <div class="grid grid-cols-2 gap-6 mt-12">
            <div class="group p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] hover:border-emerald-500/50 transition-all duration-500 relative overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 class="text-3xl font-bold text-[var(--text-primary)] mb-1">10+</h3>
               <p class="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.2em] font-black">Digital Products</p>
            </div>
            <div class="group p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] hover:border-cyan-500/50 transition-all duration-500 relative overflow-hidden">
               <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 class="text-3xl font-bold text-[var(--text-primary)] mb-1">99.9%</h3>
               <p class="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.2em] font-black">Code Reliability</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('imageSide') imageRef!: ElementRef;
  @ViewChild('tiltContainer') tiltContainer!: ElementRef;
  @ViewChild('textSide') textRef!: ElementRef;
  @ViewChild('decorGlow') glowRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private mouseListener: any;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.imageRef.nativeElement,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(this.imageRef.nativeElement,
        {
          opacity: 0,
          scale: 0.85,
          x: -100,
          rotateY: -30,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: 'power4.out'
        }
      )
        .to(this.textRef.nativeElement, {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=1');

      gsap.to(this.tiltContainer.nativeElement, {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.to(this.glowRef.nativeElement, {
        scale: 1.05,
        opacity: 0.5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      this.mouseListener = (e: MouseEvent) => {
        const rect = this.imageRef.nativeElement.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(this.tiltContainer.nativeElement, {
          rotateY: x * 15,
          rotateX: -y * 15,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      this.imageRef.nativeElement.parentElement.addEventListener('mousemove', this.mouseListener);
      this.imageRef.nativeElement.parentElement.addEventListener('mouseleave', () => {
        gsap.to(this.tiltContainer.nativeElement, {
          rotateY: 0,
          rotateX: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.mouseListener) {
      window.removeEventListener('mousemove', this.mouseListener);
    }
  }
}
