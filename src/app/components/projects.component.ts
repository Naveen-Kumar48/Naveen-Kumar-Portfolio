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
      <!-- Sparkle Elements -->
      <div class="absolute top-20 left-1/4 w-1 h-1 bg-emerald-400 rounded-full opacity-0 animate-sparkle"></div>
      <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full opacity-0 animate-sparkle" style="animation-delay: 1s"></div>
      <div class="absolute bottom-1/4 right-20 w-1 h-1 bg-emerald-300 rounded-full opacity-0 animate-sparkle" style="animation-delay: 2.5s"></div>
      
      <!-- Background Kinetic Energy -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] rounded-full -z-10 animate-pulse-slow" style="background: radial-gradient(closest-side, rgba(16,185,129,0.10), transparent);"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <header class="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div class="max-w-2xl">
            <div class="flex items-center gap-3 mb-6 reveal-y opacity-0">
              <span class="w-16 h-[2px] bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 font-mono text-[11px] uppercase tracking-[0.5em] font-black italic">Curated Architectures</span>
            </div>
            <h2 class="text-5xl lg:text-7xl font-black mb-6 tracking-tighter leading-none reveal-y opacity-0">
               Featured MERN Stack <br>
               <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 animate-shimmer drop-shadow-lg" style="filter: drop-shadow(0 0 20px rgba(16,185,129,0.4));">Portfolio Projects</span>
            </h2>
            <p class="text-zinc-500 text-lg md:text-xl font-medium reveal-y opacity-0 p-4 rounded-lg bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20">
                Explore my portfolio of custom MERN stack applications. See case studies of scalable SaaS platforms, e-commerce sites, and React.js web apps I've built.
            </p>
          </div>
          
          <!-- Liquid Filter Chips -->
          <nav class="flex flex-wrap gap-3 p-1 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-2 border-emerald-500/30 reveal-y opacity-0 backdrop-blur-sm">
            @for (cat of categories; track cat) {
              <button (click)="activeCategory.set(cat)"
                      appMagnetic
                      [class]="'px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ' + 
                               (activeCategory() === cat 
                                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 shadow-[0_10px_25px_rgba(16,185,129,0.3)]' 
                                : 'text-zinc-500 hover:text-white hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]')">
                {{ cat }}
              </button>
            }
          </nav>
        </header>

        <!-- Bento 2.0 Asymmetric Grid -->
        <div #grid class="grid grid-cols-1 md:grid-cols-6 gap-8 min-h-[900px]">
          @for (project of filteredProjects(); track project.id; let i = $index) {
            <article 
                 [class]="'group relative rounded-2xl md:rounded-3xl overflow-hidden liquid-glass border border-[var(--glass-border)] transition-colors duration-500 md:hover:border-emerald-500/30 shadow-lg md:shadow-2xl flex flex-col min-h-[300px] md:min-h-auto ' + 
                          (i % 3 === 0 ? 'md:col-span-4' : 'md:col-span-2')"
                 (mouseenter)="activeProject.set(project.id)"
                 (mouseleave)="activeProject.set(null)">
              
              <!-- Narrative Overlays -->
              <div class="absolute inset-0 z-20 p-4 md:p-10 flex flex-col justify-between pointer-events-none">
                <!-- Mobile Top Section: Badge & Title -->
                <div class="flex justify-between items-start mb-2">
                    <!-- Desktop Badge -->
                    <div class="hidden md:flex md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 md:translate-y-4 md:group-hover:translate-y-0">
                        <div class="px-3 md:px-4 py-1 md:py-1.5 bg-emerald-500 text-zinc-950 text-[9px] md:text-[10px] font-black tracking-[0.2em] rounded-sm transform md:-rotate-2">
                            MX-LAYER / {{project.category | uppercase}}
                        </div>
                    </div>
                    
                    <!-- Mobile Top Right: Quick Links -->
                    <div class="md:hidden flex items-center gap-2">
                      <!-- Code Button -->
                      <a [href]="project.githubLink" 
                         target="_blank" 
                         class="inline-flex items-center justify-center gap-1 px-2 py-1.5 bg-white/10 hover:bg-emerald-500 hover:text-zinc-950 rounded text-[10px] font-bold text-emerald-400 border border-emerald-500/50 transition-all shadow-md pointer-events-auto" 
                         title="View source code"
                         (click)="$event.stopPropagation()">
                        <mat-icon class="text-xs">code</mat-icon>
                        <span>Code</span>
                      </a>
                      <!-- Live Button -->
                      <a [href]="project.liveLink" 
                         target="_blank" 
                         class="inline-flex items-center justify-center gap-1 px-2 py-1.5 bg-emerald-500 text-zinc-950 rounded text-[10px] font-bold border border-emerald-500 transition-all shadow-md hover:shadow-lg hover:scale-105 pointer-events-auto" 
                         title="View live demo"
                         (click)="$event.stopPropagation()">
                        <mat-icon class="text-xs">visibility</mat-icon>
                        <span>Live</span>
                      </a>
                    </div>
                </div>

                <!-- Title & Description -->
                <div class="transform md:group-hover:-translate-y-4 transition-transform duration-1000 ease-out flex-grow flex flex-col justify-between">
                    <div>
                        <h3 class="text-xl md:text-3xl lg:text-5xl font-black text-white tracking-tighter mb-1 md:mb-4 drop-shadow-2xl line-clamp-2 md:line-clamp-3">{{ project.title }}</h3>
                        <p class="text-[11px] md:text-sm lg:text-base text-zinc-300 md:text-zinc-400 line-clamp-2 md:line-clamp-2 max-w-lg md:group-hover:text-zinc-200 transition-colors md:opacity-0 md:group-hover:opacity-100 duration-700 font-medium leading-relaxed">
                            {{ project.description }}
                        </p>
                    </div>
                    
                    <!-- Mobile Footer: Always visible with prominent buttons -->
                    <footer class="pt-3 md:pt-10 flex flex-col gap-2 md:gap-3 md:opacity-0 md:group-hover:opacity-100 md:translate-y-6 md:group-hover:translate-y-0 transition-all duration-1000 pointer-events-auto md:hidden">
                        <!-- Action Buttons Row -->
                        <div class="flex items-center gap-2 w-full">
                            <!-- Code Button Mobile -->
                            <a [href]="project.githubLink" 
                               target="_blank" 
                               class="flex-1 p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white flex items-center justify-center gap-2 font-bold text-xs uppercase transition-all shadow-lg" 
                               title="View source code on GitHub"
                               (click)="$event.stopPropagation()">
                              <mat-icon class="text-sm">code</mat-icon>
                              <span>Code</span>
                            </a>
                            
                            <!-- Live Demo Button Mobile -->
                            <a [href]="project.liveLink" 
                               target="_blank" 
                               class="flex-1 p-3 bg-emerald-500 rounded-lg text-zinc-950 flex items-center justify-center gap-2 font-bold text-xs uppercase transition-all shadow-lg hover:shadow-emerald-500/50 hover:scale-105" 
                               title="View live project demo"
                               (click)="$event.stopPropagation()">
                              <mat-icon class="text-sm">visibility</mat-icon>
                              <span>Live Demo</span>
                            </a>
                        </div>
                        
                        <!-- Tags --->
                        <div class="flex gap-2 flex-wrap">
                             @for (tag of project.tags.slice(0, 3); track tag) {
                                <span class="px-2 py-1 bg-white/5 rounded text-[8px] font-black text-zinc-500 border border-white/5 uppercase italic tracking-tighter">{{ tag }}</span>
                             }
                        </div>
                    </footer>
                    
                    <!-- Desktop Footer -->
                    <footer class="hidden md:flex md:flex-col md:gap-3 md:mt-10 md:opacity-0 md:group-hover:opacity-100 md:translate-y-6 md:group-hover:translate-y-0 transition-all duration-1000 pointer-events-auto">
                        <div class="flex items-center gap-4">
                            <!-- Code Link Button Desktop -->
                            <a [href]="project.githubLink" 
                               target="_blank" 
                               appMagnetic 
                               class="p-4 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-emerald-500 hover:text-zinc-950 transition-all shadow-2xl" 
                               title="View source code on GitHub">
                              <mat-icon class="text-sm">code</mat-icon>
                            </a>
                            
                            <!-- Live Demo Button Desktop -->
                            <a [href]="project.liveLink" 
                               target="_blank" 
                               appMagnetic 
                               class="p-4 bg-emerald-500 rounded-2xl text-zinc-950 hover:scale-105 transition-all shadow-[0_15px_30px_rgba(16,185,129,0.3)]" 
                               title="View live project demo">
                              <mat-icon class="text-sm">visibility</mat-icon>
                            </a>
                        </div>
                        
                        <!-- Desktop Tags -->
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
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-100 md:group-hover:opacity-0 transition-opacity duration-1000"></div>
                <div class="absolute inset-0 bg-emerald-500/10 mix-blend-color-dodge opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000"></div>
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
    
    /* Mobile-specific project card styles */
    @media (max-width: 768px) {
      article {
        min-height: 280px;
        position: relative;
      }
      
      article img {
        opacity: 0.5;
      }
      
      /* Ensure overlay content is always visible on mobile */
      article a[href] {
        position: relative;
        z-index: 30;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Make buttons look like actual buttons on mobile */
      a[appMagnetic], a[href] {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
      }
      
      /* Project title sizing for mobile */
      h3 {
        line-height: 1.2;
      }
      
      /* Ensure footer is always accessible on mobile */
      footer {
        position: relative;
        z-index: 25;
      }
      
      /* Optimize button touch targets */
      a[target="_blank"] {
        min-height: 48px;
        min-width: 48px;
      }
    }
    
    /* Desktop styles remain unchanged */
    @media (min-width: 769px) {
      article .md\:hidden {
        display: none !important;
      }
      
      article .hidden.md\:inline {
        display: inline !important;
      }
    }
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
