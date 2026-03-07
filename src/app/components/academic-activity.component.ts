import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ACADEMIC_ACTIVITIES } from '../data/portfolio.data';

@Component({
  selector: 'app-academic-activity',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="academic" class="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Academic <span class="text-emerald-400">Activity</span></h2>
          <p class="text-[var(--text-secondary)]">My educational background and achievements.</p>
        </div>

        <div class="space-y-8">
          @for (activity of activities; track activity.id) {
            <div class="bg-[var(--bg-secondary)] p-8 rounded-2xl border border-[var(--border-color)] hover:border-emerald-500/30 transition-all duration-300 shadow-lg group">
              <div class="flex flex-col md:flex-row md:items-start gap-6">
                
                <!-- Icon -->
                <div class="w-14 h-14 bg-[var(--bg-primary)] rounded-xl flex items-center justify-center border border-[var(--border-color)] group-hover:scale-110 transition-transform duration-300 shadow-inner shrink-0">
                  <mat-icon class="text-emerald-500 text-2xl">{{ activity.icon }}</mat-icon>
                </div>

                <div class="flex-grow">
                  <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 class="text-xl font-bold text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors">{{ activity.degree }}</h3>
                      <h4 class="text-[var(--text-secondary)] font-medium flex items-center gap-2 mt-1">
                        <mat-icon class="text-sm">school</mat-icon> {{ activity.institution }}
                      </h4>
                    </div>
                    <div class="mt-2 md:mt-0 flex flex-col items-start md:items-end">
                      <span class="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded-full border border-emerald-500/20 mb-1">
                        {{ activity.period }}
                      </span>
                      @if (activity.grade) {
                        <span class="text-xs text-[var(--text-secondary)] font-mono">Grade: {{ activity.grade }}</span>
                      }
                    </div>
                  </div>

                  <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                    @for (achievement of activity.achievements; track achievement) {
                      <div class="flex items-start gap-2 text-[var(--text-secondary)] text-sm">
                        <mat-icon class="text-emerald-500 text-xs mt-0.5">check_circle</mat-icon>
                        <span>{{ achievement }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class AcademicActivityComponent {
  activities = ACADEMIC_ACTIVITIES;
}
