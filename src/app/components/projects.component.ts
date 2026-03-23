import { Component, ElementRef, ViewChild, AfterViewInit, signal, computed, inject, PLATFORM_ID, effect, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PROJECTS } from '../data/portfolio.data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticDirective } from '../directives/magnetic.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatIconModule, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="py-32 relative overflow-hidden bg-[var(--bg-primary)]">
      <!-- Background Kinetic Energy -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] -z-10 animate-pulse"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <header class="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div class="max-w-2xl">
            <div class="flex items-center gap-3 mb-6 reveal-y opacity-0">
              <span class="w-16 h-[2px] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              <span class="text-emerald-500 font-mono text-[11px] uppercase tracking-[0.5em] font-black italic">Curated Architectures</span>
            </div>
            <h2 class="text-5xl lg:text-7xl font-black mb-6 tracking-tighter leading-none reveal-y opacity-0">
               Engineering <span class="text-zinc-600">The</span> <br>
               <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Extreme-Tier</span>
            </h2>
            <p class="text-zinc-500 text-lg md:text-xl font-medium reveal-y opacity-0">
                A rigorous orchestration of high-performance SaaS ecosystems and immersive 3D spatial environments.
            </p>
          </div>
          
          <!-- Liquid Filter Chips -->
          <nav class="flex flex-wrap gap-3 p-1 rounded-2xl liquid-glass border border-white/5 reveal-y opacity-0">
            @for (cat of categories; track cat) {
              <button (click)="activeCategory.set(cat)"
                      appMagnetic
                      [class]="'px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ' + 
                               (activeCategory() === cat 
                                ? 'bg-emerald-500 text-zinc-950 shadow-[0_10px_25px_rgba(16,185,129,0.3)]' 
                                : 'text-zinc-500 hover:text-white')">
                {{ cat }}
              </button>
            }
          </nav>
        </header>

        <!-- Bento 2.0 Asymmetric Grid -->
        <div #grid class="grid grid-cols-1 md:grid-cols-6 gap-8 min-h-[900px]">
          @for (project of filteredProjects(); track project.id; let i = $index) {
            <article 
                 [class]="'group relative rounded-3xl overflow-hidden liquid-glass border border-white/5 transition-colors duration-500 hover:border-emerald-500/30 shadow-2xl flex flex-col ' + 
                          (i % 3 === 0 ? 'md:col-span-4' : 'md:col-span-2')"
                 (mouseenter)="activeProject.set(project.id)"
                 (mouseleave)="activeProject.set(null)">
              
              <!-- Narrative Overlays -->
              <div class="absolute inset-0 z-20 p-10 flex flex-col justify-between pointer-events-none">
                <div class="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
                    <div class="px-4 py-1.5 bg-emerald-500 text-zinc-950 text-[10px] font-black tracking-[0.2em] rounded-sm transform -rotate-2">
                        MX-LAYER / {{project.category | uppercase}}
                    </div>
                </div>

                <div class="transform group-hover:-translate-y-4 transition-transform duration-1000 ease-out">
                    <h3 class="text-3xl lg:text-5xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">{{ project.title }}</h3>
                    <p class="text-zinc-400 text-sm lg:text-base line-clamp-2 max-w-lg group-hover:text-zinc-200 transition-colors opacity-0 group-hover:opacity-100 duration-700 font-semibold leading-relaxed">
                        {{ project.description }}
                    </p>
                    
                    <footer class="flex items-center gap-8 mt-10 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-1000 pointer-events-auto">
                        <div class="flex gap-4">
                            <a [href]="project.githubLink" target="_blank" appMagnetic class="p-4 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-emerald-500 hover:text-zinc-950 transition-all shadow-2xl">
                                <mat-icon class="text-sm">code</mat-icon>
                            </a>
                            <a [href]="project.liveLink" target="_blank" appMagnetic class="p-4 bg-emerald-500 rounded-2xl text-zinc-950 hover:scale-105 transition-all shadow-[0_15px_30px_rgba(16,185,129,0.3)]">
                                <mat-icon class="text-sm">visibility</mat-icon>
                            </a>
                        </div>
                        <div class="flex gap-3">
                             @for (tag of project.tags.slice(0, 3); track tag) {
                                <span class="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black text-zinc-500 border border-white/5 uppercase italic tracking-tighter">{{ tag }}</span>
                             }
                        </div>
                    </footer>
                </div>
              </div>

              <!-- Cinematic Media Interaction -->
              <div class="absolute inset-0 z-10 overflow-hidden bg-[#050505]">
                <img [src]="project.image" 
                     [alt]="'Naveen Kumar - Portfolio Project: ' + project.title + ' - ' + project.description" 
                     width="1200"
                     height="800"
                     loading="lazy"
                     decoding="async"
                     [class]="'w-full h-full object-cover transition-all duration-[2.5s] ease-[cubic-bezier(0.2, 0, 0, 1)] group-hover:scale-110 opacity-50 group-hover:opacity-20 ' + (activeProject() === project.id ? 'opacity-20 scale-105 blur-[2px]' : '')">
                
                <!-- Displacement Placeholder (Liquid Distortion Effect) -->
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-1000"></div>
                <div class="absolute inset-0 bg-emerald-500/10 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .reveal-y { transform: translateY(40px); }
  `]
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  projects = PROJECTS;
  categories = ['all', 'frontend', 'backend', 'fullstack'];
  activeCategory = signal('all');
  activeProject = signal<number | null>(null);

  filteredProjects = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return this.projects.slice(0, 5);
    return this.projects.filter(p => p.category === cat);
  });

  @ViewChild('grid') gridRef!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  private animationTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const _ = this.filteredProjects();
        // Debounce animation to prevent janky filter changes
        if (this.animationTimeout) {
          clearTimeout(this.animationTimeout);
        }
        this.animationTimeout = setTimeout(() => this.animateGrid(), 200);
      });
    }
  }

  ngOnDestroy() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private initAnimations() {
    gsap.to('.reveal-y', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 85%'
      }
    });

    this.animateGrid();
  }

  animateGrid() {
    if (!this.gridRef?.nativeElement || !isPlatformBrowser(this.platformId)) return;

    const isSmallScreen = window.innerWidth < 1024;
    const cards = Array.from(this.gridRef.nativeElement.children);

    // Simpler animation for mobile
    const startX = isSmallScreen ? 0 : (i: number) => (i % 2 === 0 ? -20 : 20);
    const startY = isSmallScreen ? 10 : 20;
    const duration = isSmallScreen ? 0.6 : 0.8;

    gsap.fromTo(cards,
      { opacity: 0, scale: 0.98, x: startX, y: startY },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: duration,
        stagger: 0.05,
        ease: 'power3.out',
        overwrite: 'auto'
      }
    );
  }
}
