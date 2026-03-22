import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MagneticDirective } from '../directives/magnetic.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MagneticDirective, MatIconModule],
  template: `
    <footer class="bg-[var(--bg-primary)] border-t border-[var(--border-color)] pt-24 pb-12 relative overflow-hidden selection:bg-emerald-500/30">
      
      <!-- Fluid Flow Decor -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-20"></div>

      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
        
        <!-- Identity Node -->
        <div class="md:col-span-5 flex flex-col gap-8">
          <a href="#" class="text-3xl font-black tracking-tighter text-[var(--text-primary)] transition-all">
            Naveen<span class="text-emerald-500">.</span><span class="font-light text-[var(--text-secondary)] text-xl">web</span>
          </a>
          <p class="text-[var(--text-secondary)] text-lg font-medium leading-relaxed max-w-sm">
            Architecting high-performance digital ecosystems with a focus on <span class="text-[var(--text-primary)] font-black italic">technical precision</span> and immersive user narrative.
          </p>
          
          <div class="flex items-center gap-8 mt-4">
             <a href="https://github.com/Naveen-Kumar48" target="_blank" appMagnetic class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-700" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/naveen-kumar-6806382b9/" target="_blank" appMagnetic class="text-[var(--text-secondary)] hover:text-emerald-500 transition-all duration-700" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        <!-- Navigation Matrix -->
        <div class="md:col-span-3">
          <h4 class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-10 italic">Core Directives</h4>
          <ul class="space-y-4 text-lg font-bold">
            <li><a href="#about" (click)="scrollTo($event, '#about')" class="text-[var(--text-secondary)] hover:text-white transition-all">Narrative</a></li>
            <li><a href="#skills" (click)="scrollTo($event, '#skills')" class="text-[var(--text-secondary)] hover:text-white transition-all">Stack</a></li>
            <li><a href="#projects" (click)="scrollTo($event, '#projects')" class="text-[var(--text-secondary)] hover:text-white transition-all">Projects</a></li>
            <li><a href="#experience" (click)="scrollTo($event, '#experience')" class="text-[var(--text-secondary)] hover:text-white transition-all">Milestones</a></li>
          </ul>
        </div>

        <!-- System Node -->
        <div class="md:col-span-4 flex flex-col items-start md:items-end">
          <h4 class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-10 italic">System Status</h4>
          <div class="flex flex-col items-start md:items-end gap-2">
            <p class="text-[var(--text-secondary)] text-sm font-black italic">V.4.2 // EXTREME TIER</p>
            <p class="text-[var(--text-primary)] text-sm font-black tracking-tight uppercase">Deployed by Naveen Kumar</p>
            <p class="text-[var(--text-secondary)] text-[10px] mt-6 tracking-widest opacity-50">&copy; {{ currentYear }} ALL SYSTEM RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`:host { display: block; }`]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  private platformId = inject(PLATFORM_ID);

  scrollTo(event: Event, target: string) {
    if (isPlatformBrowser(this.platformId)) {
      event.preventDefault();
      const element = document.querySelector(target);
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    }
  }
}
