import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-download-resume',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button 
      (click)="downloadResume()"
      class="group relative px-8 py-5 flex items-center gap-3 overflow-hidden rounded-2xl border border-emerald-500/30 bg-transparent transition-all duration-700 hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-95">
      
      <!-- Liquid Background Fill -->
      <div class="absolute inset-0 translate-y-full bg-emerald-500 transition-transform duration-700 ease-expo group-hover:translate-y-0"></div>
      
      <mat-icon class="relative z-10 text-emerald-500 transition-colors duration-700 group-hover:text-zinc-950">download</mat-icon>
      <span class="relative z-10 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 transition-colors duration-700 group-hover:text-zinc-950">
        Acquire Resume
      </span>
      
      <!-- Subtle Shine Effect -->
      <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
    </button>
  `,
  styles: [`
    .ease-expo { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
  `]
})
export class DownloadResumeBtnComponent {
  downloadResume() {
    const link = document.createElement('a');
    link.href = '/assets/Naveen_kumar_Resume.pdf';
    link.download = 'Naveen_kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
