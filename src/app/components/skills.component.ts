import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID, ViewChildren, QueryList } from '@angular/core';
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
  template: `
    <section id="skills" class="py-16 bg-[var(--bg-secondary)] relative overflow-hidden">
      <!-- Background Decorative Elements -->
      <div class="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="mb-16 text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <mat-icon class="text-emerald-500 text-sm h-4 w-4">verified</mat-icon>
            <span class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Expertise</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Technical <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Toolkit</span></h2>
          <p class="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
            A specialized collection of modern technologies engineered for <span class="text-[var(--text-primary)] font-medium">performance</span>, <span class="text-[var(--text-primary)] font-medium">scalability</span>, and <span class="text-[var(--text-primary)] font-medium">security</span>.
          </p>
        </div>

        <div #grid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          @for (category of categories; track category) {
            <div class="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-3xl p-8 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5 group/card transform translate-y-4 opacity-0">
              <h3 class="text-xl font-bold mb-8 capitalize flex items-center gap-3 text-[var(--text-primary)]">
                <div class="p-2 rounded-lg bg-[var(--bg-secondary)] text-emerald-500 group-hover/card:bg-emerald-500 group-hover/card:text-zinc-950 transition-colors duration-500">
                  <mat-icon class="block">{{ getCategoryIcon(category) }}</mat-icon>
                </div>
                {{ category }}
              </h3>
              
              <div class="space-y-6">
                @for (skill of getSkillsByCategory(category); track skill.name) {
                  <div class="group cursor-help relative" 
                       [matTooltip]="skill.description || ''"
                       matTooltipPosition="above"
                       matTooltipClass="custom-tooltip">
                    <div class="flex justify-between items-center mb-2">
                       <div class="flex items-center gap-3">
                         @if (skill.logoUrl) {
                           <img [src]="skill.logoUrl" 
                                (error)="skill.logoUrl = ''" 
                                [alt]="skill.name" 
                                class="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-110">
                         } @else {
                           <mat-icon class="text-sm text-emerald-500">code</mat-icon>
                         }
                         <span class="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{{ skill.name }}</span>
                       </div>
                       <span class="text-[10px] font-bold text-emerald-500/50 group-hover:text-emerald-500 transition-colors">{{ skill.level }}%</span>
                    </div>
                    
                    <div class="w-full bg-[var(--bg-secondary)] rounded-full h-1.5 overflow-hidden ring-1 ring-white/5">
                      <div #skillBar 
                           class="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full relative"
                           [style.width.%]="0"
                           [attr.data-width]="skill.level">
                        <div class="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
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
  `
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
      gsap.registerPlugin(ScrollTrigger);

      // Animate cards on scroll - More robust reveal
      gsap.to(Array.from(this.gridRef.nativeElement.children), {
        scrollTrigger: {
          trigger: this.gridRef.nativeElement,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Animate individual skill bars with stagger
      this.skillBars.forEach((bar, index) => {
        const width = bar.nativeElement.getAttribute('data-width');
        gsap.to(bar.nativeElement, {
          scrollTrigger: {
            trigger: bar.nativeElement,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          },
          width: width + '%',
          duration: 1.5,
          delay: (index % 6) * 0.05,
          ease: 'power2.inOut'
        });
      });
    }
  }
}


