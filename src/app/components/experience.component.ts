import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EXPERIENCE } from '../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticDirective } from '../directives/magnetic.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatIconModule, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="py-32 bg-[var(--bg-primary)] border-t border-[var(--glass-border)] transition-colors duration-500 relative overflow-hidden">
      <!-- Storytelling Line continuation -->
      <div class="absolute inset-0 z-0 opacity-10 pointer-events-none translate-y-20">
        <svg width="100%" height="100%">
          <path d="M 50 0 Q 80 500 20 1000" fill="transparent" stroke="#10b981" stroke-width="2" stroke-dasharray="8,8" />
        </svg>
      </div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <header class="text-center mb-24">
          <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full liquid-glass border border-emerald-500/30 mb-6">
            <mat-icon class="text-emerald-500 text-sm">timeline</mat-icon>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Chronological Provenance</span>
          </div>
          <h2 class="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-[var(--text-primary)] leading-[0.9]">
            Strategic <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 italic font-black">Velocity</span>
          </h2>
          <p class="text-[var(--text-secondary)] text-lg md:text-xl font-medium max-w-xl mx-auto">Career milestones engineered with mathematical precision.</p>
        </header>

        <div #timeline class="relative space-y-20 before:content-[''] before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-emerald-500/50 before:via-emerald-400/20 before:to-transparent">
          
          @for (exp of experience; track exp.id; let i = $index) {
            <div [class]="'relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group opacity-0 translate-y-12 ' + (i % 2 === 0 ? 'md:flex-row' : '')">
              
              <!-- Icon Matrix -->
              <div 
                  appMagnetic 
                  class="absolute left-0 md:left-1/2 w-12 h-12 liquid-glass border-2 border-emerald-500 rounded-2xl flex items-center justify-center z-20 -translate-x-1 md:-translate-x-1/2 shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-transform duration-500 group-hover:scale-110">
                <mat-icon class="text-emerald-400 text-xl font-bold">work</mat-icon>
              </div>

              <!-- Content Card - Ultra Polish -->
              <div [class]="'ml-20 md:ml-0 w-full md:w-[42%] liquid-glass p-8 md:p-10 rounded-[2.5rem] border border-[var(--glass-border)] hover:border-emerald-500/50 transition-all duration-1000 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:shadow-[0_40px_80px_rgba(16,185,129,0.15)] ' + (i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto')">
                <header class="flex justify-between items-start mb-6">
                    <span class="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black italic rounded-xl border border-emerald-500/20 uppercase tracking-widest shadow-sm">
                      {{ exp.period }}
                    </span>
                    <mat-icon class="text-emerald-500/20 group-hover:text-emerald-500 group-hover:rotate-12 transition-all duration-700">stars</mat-icon>
                </header>
                
                <h3 class="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-2 tracking-tighter">{{ exp.role }}</h3>
                <h4 class="text-[var(--text-secondary)] text-sm md:text-base font-extrabold mb-8 flex items-center gap-2 tracking-wide uppercase">
                  <mat-icon class="text-emerald-500/50 text-lg">corporate_fare</mat-icon> {{ exp.company }}
                </h4>
                
                <ul class="space-y-4">
                  @for (desc of exp.description; track desc) {
                    <li class="text-[var(--text-secondary)] text-sm md:text-base flex items-start gap-4 font-medium leading-relaxed group-hover:text-[var(--text-primary)] transition-colors duration-500">
                      <span class="mt-2.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] shrink-0 group-hover:scale-125 transition-transform duration-700"></span>
                      {{ desc }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          }

        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ExperienceComponent implements AfterViewInit {
  experience = EXPERIENCE;
  @ViewChild('timeline') timelineRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Kinetic Scroll Reveal
      const children = Array.from(this.timelineRef.nativeElement.children) as HTMLElement[];
      children.forEach((child, index) => {
        gsap.to(child, {
          scrollTrigger: {
            trigger: child,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'expo.out'
        });
      });
    }
  }
}
