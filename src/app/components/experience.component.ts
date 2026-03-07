import { Component, ElementRef, ViewChild, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EXPERIENCE } from '../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="experience" class="py-24 bg-[var(--bg-secondary)]">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">My <span class="text-emerald-400">Journey</span></h2>
          <p class="text-[var(--text-secondary)]">Professional experience and career milestones.</p>
        </div>

        <div #timeline class="relative space-y-12 before:content-[''] before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-[var(--border-color)] before:to-[var(--bg-secondary)]">
          
          @for (exp of experience; track exp.id; let i = $index) {
            <div [class]="'relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ' + (i % 2 === 0 ? 'md:flex-row' : '')">
              
              <!-- Icon -->
              <div class="absolute left-0 md:left-1/2 w-10 h-10 bg-[var(--bg-secondary)] border-2 border-emerald-500 rounded-full flex items-center justify-center z-10 -translate-x-0 md:-translate-x-1/2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <mat-icon class="text-emerald-400 text-sm">work</mat-icon>
              </div>

              <!-- Content Card -->
              <div [class]="'ml-16 md:ml-0 w-full md:w-[45%] bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-color)] hover:border-emerald-500/30 transition-all duration-300 shadow-lg ' + (i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto')">
                <span class="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded-full mb-3 border border-emerald-500/20">
                  {{ exp.period }}
                </span>
                <h3 class="text-xl font-bold text-[var(--text-primary)] mb-1">{{ exp.role }}</h3>
                <h4 class="text-[var(--text-secondary)] text-sm font-medium mb-4 flex items-center gap-1">
                  <mat-icon class="text-base">business</mat-icon> {{ exp.company }}
                </h4>
                <ul class="space-y-2">
                  @for (desc of exp.description; track desc) {
                    <li class="text-[var(--text-secondary)] text-sm flex items-start gap-2">
                      <span class="text-emerald-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
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
  `
})
export class ExperienceComponent implements AfterViewInit {
  experience = EXPERIENCE;
  @ViewChild('timeline') timelineRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(Array.from(this.timelineRef.nativeElement.children), {
        scrollTrigger: {
          trigger: this.timelineRef.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  }
}
