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
import { HttpClientModule } from '@angular/common/http';
import { CursorComponent } from './components/cursor.component';

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
    HttpClientModule,
    CursorComponent
  ],
  template: `
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
  `
})
export class App { }
