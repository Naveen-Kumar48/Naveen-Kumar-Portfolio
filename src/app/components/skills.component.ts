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
    <section id="skills" class="py-24 bg-[var(--bg-secondary)]">
      <div class="max-w-7xl mx-auto px-6">
        <div class="mb-16 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Technical <span class="text-emerald-400">Skills</span></h2>
          <p class="text-[var(--text-secondary)] max-w-2xl mx-auto">
            A comprehensive toolkit that allows me to build scalable, performant, and user-centric applications.
          </p>
        </div>

        <div #grid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (category of categories; track category) {
            <div class="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
              <h3 class="text-xl font-semibold mb-6 capitalize flex items-center gap-2">
                <mat-icon class="text-emerald-500">{{ getCategoryIcon(category) }}</mat-icon>
                {{ category }}
              </h3>
              
              <div class="space-y-4">
                @for (skill of getSkillsByCategory(category); track skill.name) {
                  <div class="group cursor-help" 
                       [matTooltip]="skill.description || ''"
                       matTooltipPosition="above"
                       matTooltipClass="bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm p-2 rounded shadow-lg">
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
                        {{ skill.name }}
                      </span>
                      <span class="text-xs text-[var(--text-secondary)]">{{ skill.level }}%</span>
                    </div>
                    <div class="w-full bg-[var(--bg-secondary)] rounded-full h-2 overflow-hidden">
                      <div #skillBar 
                           class="bg-emerald-500 h-2 rounded-full group-hover:bg-emerald-400"
                           [style.width.%]="0"
                           [attr.data-width]="skill.level"></div>
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
  categories = ['frontend', 'backend', 'database', 'devops', 'tools'] as const;

  @ViewChild('grid') gridRef!: ElementRef;
  @ViewChildren('skillBar') skillBars!: QueryList<ElementRef>;

  private platformId = inject(PLATFORM_ID);

  getSkillsByCategory(category: string) {
    return this.skills.filter(s => s.category === category);
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'frontend': return 'web';
      case 'backend': return 'settings_ethernet';
      case 'database': return 'storage';
      case 'devops': return 'cloud_queue';
      case 'tools': return 'build';
      default: return 'code';
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // Animate cards
      gsap.to(Array.from(this.gridRef.nativeElement.children), {
        scrollTrigger: {
          trigger: this.gridRef.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Animate skill bars
      this.skillBars.forEach((bar) => {
        const width = bar.nativeElement.getAttribute('data-width');
        gsap.to(bar.nativeElement, {
          scrollTrigger: {
            trigger: bar.nativeElement,
            start: 'top 90%', // Start animation when bar is near bottom of viewport
            toggleActions: 'play none none reverse'
          },
          width: width + '%',
          duration: 1.5,
          ease: 'power2.out'
        });
      });
    }
  }
}
