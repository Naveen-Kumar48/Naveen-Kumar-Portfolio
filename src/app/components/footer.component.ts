import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-[var(--bg-primary)] border-t border-[var(--border-color)] py-12">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-center md:text-left">
          <p class="text-[var(--text-secondary)] text-sm">
            &copy; {{ currentYear }} Naveen Kumar. All rights reserved.
          </p>
        </div>

        <div class="flex gap-6 text-sm font-medium text-[var(--text-secondary)]">
          <a href="#" class="hover:text-[var(--text-primary)] transition-colors">Privacy</a>
          <a href="#" class="hover:text-[var(--text-primary)] transition-colors">Terms</a>
          <a href="#" class="hover:text-[var(--text-primary)] transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
