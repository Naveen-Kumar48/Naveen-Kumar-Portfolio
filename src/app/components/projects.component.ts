import { Component, ElementRef, ViewChild, AfterViewInit, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PROJECTS } from '../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="projects" class="py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Featured <span class="text-emerald-400">Projects</span></h2>
            <p class="text-[var(--text-secondary)] max-w-xl">
              A selection of projects that demonstrate my ability to solve complex problems with code.
            </p>
          </div>
          
          <!-- Filter Buttons -->
          <div class="flex flex-wrap gap-2">
            @for (cat of categories; track cat) {
              <button (click)="activeCategory.set(cat)"
                      [class]="'px-4 py-2 rounded-full text-sm font-medium transition-all ' + 
                               (activeCategory() === cat 
                                ? 'bg-emerald-500 text-zinc-950' 
                                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]')">
                {{ cat | titlecase }}
              </button>
            }
          </div>
        </div>

        <div #grid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of filteredProjects(); track project.id) {
            <div class="group bg-[var(--bg-secondary)] rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-emerald-500/50 transition-all hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/10 duration-300 flex flex-col h-full opacity-0 translate-y-8">
              <!-- Image Container -->
              <div class="relative h-48 overflow-hidden">
                <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerpolicy="no-referrer">
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  <a [href]="project.githubLink" class="p-3 bg-[var(--bg-secondary)] rounded-full text-[var(--text-primary)] hover:text-emerald-400 hover:scale-110 transition-all" title="View Code">
                    <mat-icon>code</mat-icon>
                  </a>
                  <a [href]="project.liveLink" class="p-3 bg-[var(--bg-secondary)] rounded-full text-[var(--text-primary)] hover:text-emerald-400 hover:scale-110 transition-all" title="Live Demo">
                    <mat-icon>visibility</mat-icon>
                  </a>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors text-[var(--text-primary)]">{{ project.title }}</h3>
                <p class="text-[var(--text-secondary)] text-sm mb-4 line-clamp-3 flex-grow">{{ project.description }}</p>
                
                <div class="flex flex-wrap gap-2 mt-auto">
                  @for (tag of project.tags; track tag) {
                    <span class="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded text-[var(--text-secondary)] border border-[var(--border-color)]">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent implements AfterViewInit {
  projects = PROJECTS;
  categories = ['all', 'frontend', 'backend', 'fullstack'];
  activeCategory = signal('all');

  filteredProjects = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return this.projects;
    return this.projects.filter(p => p.category === cat);
  });

  @ViewChild('grid') gridRef!: ElementRef;
  
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // Re-run animation when category changes (and thus DOM changes)
      // Since Angular signals update synchronously, we might need a small delay or effect
      // For now, we'll just animate the initial load. 
      // Ideally, we'd use an effect() to re-trigger this, but let's keep it simple for now.
      
      this.animateGrid();
    }
  }

  animateGrid() {
    // Kill existing triggers to prevent conflicts if re-called
    ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === this.gridRef.nativeElement) t.kill();
    });

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
  }
}
