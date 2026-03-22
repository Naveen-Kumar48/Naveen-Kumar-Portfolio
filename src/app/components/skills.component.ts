import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SKILLS } from '../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="py-32 bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-500">
      <!-- Background Kinetic Patterns -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none -z-10"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="mb-20 text-center">
          <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full liquid-glass border border-emerald-500/30 mb-6">
            <mat-icon class="text-emerald-500 text-sm">verified</mat-icon>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Expertise Matrix</span>
          </div>
          <h2 class="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-[var(--text-primary)] leading-[0.9]">
             Technical <br>
             <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500">Command Center</span>
          </h2>
          <p class="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            A specialized collection of modern technologies engineered for <span class="text-[var(--text-primary)] font-black italic">peak performance</span> and <span class="text-[var(--text-primary)] font-black italic">architectural integrity</span>.
          </p>
        </div>

        <div #grid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
          @for (category of categories; track category) {
            <div class="liquid-glass border border-[var(--glass-border)] rounded-[2.5rem] p-10 hover:border-emerald-500/40 transition-all duration-1000 group/card transform translate-y-8 opacity-0">
              <h3 class="text-2xl font-black mb-10 capitalize flex items-center gap-4 text-[var(--text-primary)] tracking-tighter italic">
                <div class="p-3 rounded-2xl bg-[var(--bg-secondary)] text-emerald-500 group-hover/card:bg-emerald-500 group-hover/card:text-zinc-950 transition-all duration-700 shadow-xl">
                  <mat-icon class="block scale-110">{{ getCategoryIcon(category) }}</mat-icon>
                </div>
                {{ category }}
              </h3>
              
              <div class="space-y-8">
                @for (skill of getSkillsByCategory(category); track skill.name) {
                  <div class="group cursor-help relative" 
                       [matTooltip]="skill.description || ''"
                       matTooltipPosition="above"
                       matTooltipClass="custom-tooltip">
                    <div class="flex justify-between items-center mb-3">
                       <div class="flex items-center gap-4">
                         @if (skill.logoUrl) {
                           <div class="w-8 h-8 flex items-center justify-center p-1 liquid-glass rounded-lg border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                             <img [src]="skill.logoUrl" 
                                  [alt]="skill.name" 
                                  width="32"
                                  height="32"
                                  loading="lazy"
                                  class="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700">
                           </div>
                         } @else {
                           <mat-icon class="text-sm text-emerald-500">code</mat-icon>
                         }
                         <span class="text-sm font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors uppercase tracking-wider">{{ skill.name }}</span>
                       </div>
                       <span class="text-[10px] font-black text-emerald-500/40 group-hover:text-emerald-500 transition-colors tracking-widest italic">{{ skill.level }}%</span>
                    </div>
                    
                    <div class="w-full bg-[var(--bg-secondary)] rounded-full h-2 overflow-hidden border border-white/5 relative">
                      <div #skillBar 
                           class="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 h-full rounded-full relative transition-all duration-1000"
                           [style.width.%]="0"
                           [attr.data-width]="skill.level">
                        <div class="absolute inset-0 bg-white/10 animate-pulse-slow"></div>
                      </div>
                    </div>
                  </div>
                }
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
export class SkillsComponent implements AfterViewInit {
  skills = SKILLS;
  categories = ['languages', 'frontend', 'backend', 'database', 'tools'] as const;

  @ViewChild('grid') gridRef!: ElementRef;
  @ViewChildren('skillBar') skillBars!: QueryList<ElementRef>;

  private platformId = inject(PLATFORM_ID);

  getSkillsByCategory(category: string) {
    return this.skills.filter(s => s.category === category);
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'languages': return 'terminal';
      case 'frontend': return 'web';
      case 'backend': return 'settings_ethernet';
      case 'database': return 'storage';
      case 'tools': return 'build';
      default: return 'code';
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Recursive Kinetic Entrance
      gsap.to(Array.from(this.gridRef.nativeElement.children), {
        scrollTrigger: {
          trigger: this.gridRef.nativeElement,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'expo.out'
      });

      // Synchronized Power Bars
      this.skillBars.forEach((bar, index) => {
        const width = bar.nativeElement.getAttribute('data-width');
        gsap.to(bar.nativeElement, {
          scrollTrigger: {
            trigger: bar.nativeElement,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          },
          width: width + '%',
          duration: 2,
          delay: (index % 5) * 0.1,
          ease: 'power4.inOut'
        });
      });
    }
  }
}
