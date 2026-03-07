import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="about" class="py-24 relative">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <!-- Image/Visual Side -->
        <div #imageSide class="relative order-2 md:order-1">
          <div class="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" alt="Developer Workspace" class="w-full h-auto object-cover" referrerpolicy="no-referrer">
          </div>
          <!-- Decorative Elements -->
          <div class="absolute -top-4 -left-4 w-full h-full border-2 border-emerald-500/30 rounded-2xl -z-10"></div>
          <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl -z-10"></div>
        </div>

        <!-- Text Side -->
        <div #textSide class="order-1 md:order-2">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">About <span class="text-emerald-400">Me</span></h2>
          
          <div class="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              I'm an ambitious Full Stack Developer specializing in MERN Stack and Full Stack Development. I have experience in building AI-integrated SaaS platforms, secure e-commerce systems, and professional networking tools.
            </p>
            <p>
              My expertise includes JWT-based authentication, RBAC, responsive UI design, and integrating third-party APIs. I focus on delivering production-ready, high-performance applications with clean code and maintainable architecture.
            </p>
            <p>
              Currently, I am working as a Full Stack Developer Trainee at Q-Spiders, engineering robust end-to-end web applications.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-8">
            <div class="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
              <h3 class="text-2xl font-bold text-[var(--text-primary)] mb-1">1+</h3>
              <p class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Years Experience</p>
            </div>
            <div class="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
              <h3 class="text-2xl font-bold text-[var(--text-primary)] mb-1">4+</h3>
              <p class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Projects Completed</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('imageSide') imageRef!: ElementRef;
  @ViewChild('textSide') textRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(this.imageRef.nativeElement, {
        scrollTrigger: {
          trigger: this.imageRef.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.to(this.textRef.nativeElement, {
        scrollTrigger: {
          trigger: this.textRef.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }
  }
}
