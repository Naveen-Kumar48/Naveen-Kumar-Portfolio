import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './components/navbar.component';
import { HeroComponent } from './components/hero.component';
import { AboutComponent } from './components/about.component';
import { SkillsComponent } from './components/skills.component';
import { ProjectsComponent } from './components/projects.component';
import { ExperienceComponent } from './components/experience.component';
import { ContactComponent } from './components/contact.component';
import { FooterComponent } from './components/footer.component';
import { AcademicActivityComponent } from './components/academic-activity.component';
import { CursorComponent } from './components/cursor.component';
import { LoaderComponent } from './components/loader.component';
import { BackToTopComponent } from './components/back-to-top.component';
import { signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    AcademicActivityComponent,
    CursorComponent,
    LoaderComponent,
    BackToTopComponent,
    CommonModule
  ],
  template: `
    <app-loader />
    
    <div [style.visibility]="contentVisible() ? 'visible' : 'hidden'"
         [style.opacity]="contentVisible() ? '1' : '0'"
         class="transition-opacity duration-700 ease-in-out">
      <app-cursor />
      <main class="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] selection:bg-emerald-500/30 selection:text-emerald-200 cursor-none overflow-x-hidden">
        <app-navbar />
        <app-hero />
        <app-about />
        <app-skills />
        <app-projects />
        <app-experience />
        <app-academic-activity />
        <app-contact />
        <app-footer />
      </main>
      <app-back-to-top />
    </div>
  `
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  contentVisible = signal(false);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Components will start initializing now but stay hidden
      setTimeout(() => {
        this.contentVisible.set(true);
      }, 3000);
    } else {
      this.contentVisible.set(true);
    }
  }
}
