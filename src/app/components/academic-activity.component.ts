import { Component, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ACADEMIC_ACTIVITIES } from '../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticDirective } from '../directives/magnetic.directive';

@Component({
  selector: 'app-academic-activity',
  standalone: true,
  imports: [CommonModule, MatIconModule, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="academic" class="py-32 bg-[var(--bg-primary)] border-t border-[var(--glass-border)] transition-colors duration-500 relative overflow-hidden">
      <!-- Sparkle Elements -->
      <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400 rounded-full opacity-0 animate-sparkle"></div>
      <div class="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-400 rounded-full opacity-0 animate-sparkle" style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/4 right-20 w-1 h-1 bg-emerald-300 rounded-full opacity-0 animate-sparkle" style="animation-delay: 2.5s"></div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <header class="text-center mb-24">
          <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/50 mb-6 backdrop-blur-sm hover:border-emerald-400 transition-all duration-500 shadow-lg">
            <mat-icon class="text-emerald-500 text-sm">school</mat-icon>
            <span class="text-[10px] font-black bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent uppercase tracking-[0.4em]">Scholastic Foundation</span>
          </div>
          <h2 class="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-[var(--text-primary)] leading-[0.9]">
            Intellectual <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 italic font-black animate-shimmer drop-shadow-lg" style="filter: drop-shadow(0 0 20px rgba(16,185,129,0.4));">Architecture</span>
          </h2>
          <p class="text-[var(--text-secondary)] text-lg md:text-xl font-medium max-w-xl mx-auto italic p-4 rounded-lg bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">Cultivating technical mastery through academic excellence.</p>
        </header>

        <div #grid class="space-y-12">
          @for (activity of activities; track activity.id) {
            <article class="liquid-glass p-8 md:p-12 rounded-[3rem] border border-[var(--glass-border)] hover:border-emerald-500/40 transition-colors duration-500 hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] group relative overflow-hidden opacity-0 translate-y-12">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="flex flex-col lg:flex-row lg:items-start gap-10 relative z-10">
                
                <!-- Icon Catalyst -->
                <div appMagnetic class="w-16 h-16 bg-[var(--bg-primary)] rounded-full flex items-center justify-center border border-[var(--glass-border)] group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-700 shadow-2xl shrink-0">
                  <mat-icon class="text-emerald-500 group-hover:text-inherit text-3xl font-black">{{ activity.icon }}</mat-icon>
                </div>

                <div class="flex-grow">
                  <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-10 gap-6">
                    <div>
                      <h3 class="text-3xl lg:text-4xl font-black text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors mb-3 leading-tight tracking-tighter">{{ activity.degree }}</h3>
                      <h4 class="text-[var(--text-secondary)] font-extrabold flex items-center gap-3 mt-1 tracking-wide uppercase text-sm group-hover:text-zinc-300 transition-colors">
                        <mat-icon class="text-emerald-500/50">storefront</mat-icon> {{ activity.institution }}
                      </h4>
                    </div>
                    <div class="mt-4 lg:mt-0 flex flex-col items-start lg:items-end gap-3">
                      <span class="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black italic rounded-xl border border-emerald-500/20 uppercase tracking-widest shadow-sm">
                        {{ activity.period }}
                      </span>
                      @if (activity.grade) {
                        <span class="text-xs font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] italic opacity-50">Score: {{ activity.grade }}</span>
                      }
                    </div>
                  </div>

                  <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                    @for (achievement of activity.achievements; track achievement) {
                      <div class="flex items-start gap-4 p-5 liquid-glass rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all duration-500 group/item">
                        <mat-icon class="text-emerald-500 text-xl font-black group-hover/item:scale-125 transition-transform duration-500">auto_awesome</mat-icon>
                        <span class="leading-relaxed text-[var(--text-secondary)] font-bold text-sm md:text-base group-hover/item:text-[var(--text-primary)]">{{ achievement }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AcademicActivityComponent implements AfterViewInit {
  activities = ACADEMIC_ACTIVITIES;
  @ViewChild('grid') gridRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Kinetic Entrance Reveal
      const children = Array.from(this.gridRef.nativeElement.children) as HTMLElement[];
      children.forEach((child) => {
        gsap.to(child, {
          scrollTrigger: {
            trigger: child,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.2)',
          clearProps: 'transform'
        });
      });
    }
  }
}
