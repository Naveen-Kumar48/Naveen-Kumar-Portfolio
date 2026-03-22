import { Component, inject, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, ChangeDetectorRef, signal, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticDirective } from '../directives/magnetic.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MagneticDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="py-32 relative overflow-hidden transition-colors duration-500">
      <!-- Spatial Design Elements -->
      <div class="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div class="absolute top-1/2 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2"></div>

      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        <!-- Interactive Information Sidebar -->
        <div #infoSide class="opacity-0 -translate-x-12">
          <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full liquid-glass border border-emerald-500/30 mb-8">
            <mat-icon class="text-emerald-500 text-sm">connect_without_contact</mat-icon>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Protocol: Direct Sync</span>
          </div>

          <h2 class="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-[0.9] text-[var(--text-primary)]">
             {{ displayedTitle() }}<span class="animate-pulse bg-emerald-500 w-1 h-[0.9em] inline-block ml-2 rounded-sm shadow-[0_0_20px_rgba(16,185,129,0.5)]"></span>
          </h2>
          
          <p class="text-[var(--text-secondary)] text-xl font-medium mb-12 leading-relaxed max-w-lg">
            Architecting world-class digital systems requires <span class="text-[var(--text-primary)] font-black italic">relentless collaboration</span>. Available for strategic partnerships and high-stakes engineering.
          </p>

          <!-- Contact Matrices -->
          <div class="space-y-10">
            <div appMagnetic class="group flex items-center gap-6 cursor-none">
              <div class="w-16 h-16 liquid-glass rounded-2xl flex items-center justify-center border border-[var(--glass-border)] text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-700 shadow-xl">
                <mat-icon class="scale-125">alternate_email</mat-icon>
              </div>
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.3em] font-black italic mb-1">Secure Transmission</p>
                <a href="mailto:kumarnaveen897941@gmail.com" class="text-xl md:text-2xl font-black hover:text-emerald-400 transition-colors text-[var(--text-primary)] tracking-tighter">kumarnaveen897941&#64;gmail.com</a>
              </div>
            </div>

            <div appMagnetic class="group flex items-center gap-6 cursor-none">
              <div class="w-16 h-16 liquid-glass rounded-2xl flex items-center justify-center border border-[var(--glass-border)] text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-700 shadow-xl">
                <mat-icon class="scale-125">dialpad</mat-icon>
              </div>
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.3em] font-black italic mb-1">Voice Frequency</p>
                <a href="tel:+918979413404" class="text-xl md:text-2xl font-black hover:text-emerald-400 transition-colors text-[var(--text-primary)] tracking-tighter">+91 8979413404</a>
              </div>
            </div>

            <div appMagnetic class="group flex items-center gap-6 cursor-none">
              <div class="w-16 h-16 liquid-glass rounded-2xl flex items-center justify-center border border-[var(--glass-border)] text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all duration-700 shadow-xl">
                <mat-icon class="scale-125">share_location</mat-icon>
              </div>
              <div>
                <p class="text-[10px] text-[var(--text-secondary)] uppercase tracking-[0.3em] font-black italic mb-1">Local Node</p>
                <p class="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tighter uppercase italic">India (IST UTC+5:30)</p>
              </div>
            </div>
          </div>
        </div>

        <!-- High-Performance Input Terminal -->
        <form #formSide [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="liquid-glass p-10 md:p-12 rounded-[3.5rem] border border-[var(--glass-border)] shadow-2xl relative transition-all duration-1000 group/form opacity-0 translate-x-12">
          <div class="space-y-8 relative">
            <!-- Quantum Success State -->
            <div *ngIf="submitted" 
                 class="absolute inset-0 z-50 bg-[var(--bg-secondary)]/95 backdrop-blur-xl rounded-[3rem] flex flex-col items-center justify-center text-center p-10 border border-emerald-500/30 animate-reveal">
              <div class="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8 text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <mat-icon style="font-size: 56px; width: 56px; height: 56px;">check_circle</mat-icon>
              </div>
              <h3 class="text-3xl font-black text-[var(--text-primary)] mb-3 tracking-tighter uppercase italic">Transmission Received</h3>
              <p class="text-[var(--text-secondary)] mb-10 text-lg font-medium leading-relaxed">System acknowledgment sent. Strategic response pending within 24 hours.</p>
              <button type="button" (click)="resetStatus()" 
                      appMagnetic
                      class="px-10 py-4 liquid-glass hover:bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 rounded-2xl transition-all text-xs font-black uppercase tracking-[0.3em]">
                New Uplink
              </button>
            </div>

            <div class="group/input">
              <label class="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.4em] mb-3 ml-2 group-focus-within/input:text-emerald-500 transition-colors italic">Initiator Identity</label>
              <input type="text" formControlName="name" 
                     class="w-full bg-[var(--bg-primary)]/50 border border-[var(--glass-border)] rounded-2xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-bold placeholder:text-white/10"
                     placeholder="Command Input [Full Name]">
            </div>
            
            <div class="group/input">
              <label class="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.4em] mb-3 ml-2 group-focus-within/input:text-emerald-500 transition-colors italic">Frequence Node</label>
              <input type="email" formControlName="email" 
                     class="w-full bg-[var(--bg-primary)]/50 border border-[var(--glass-border)] rounded-2xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-bold placeholder:text-white/10"
                     placeholder="Command Input [Email Hash]">
            </div>

            <div class="group/input">
              <label class="block text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.4em] mb-3 ml-2 group-focus-within/input:text-emerald-500 transition-colors italic">Encrypted Payload</label>
              <textarea formControlName="message" rows="5"
                        class="w-full bg-[var(--bg-primary)]/50 border border-[var(--glass-border)] rounded-2xl px-6 py-4 text-[var(--text-primary)] focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all font-bold placeholder:text-white/10"
                        placeholder="Project Narrative Architecture..."></textarea>
            </div>

            <div class="mt-4">
              <div class="h-captcha min-h-[78px] flex justify-center lg:justify-start" 
                   data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"></div>
              @if (captchaError) {
                <p class="text-red-400 text-[10px] font-black uppercase tracking-widest mt-4 text-center lg:text-left flex items-center gap-2">
                  <mat-icon class="text-sm">security</mat-icon>
                  Biometric Verification Required (CAPTCHA)
                </p>
              }
            </div>

            <button type="submit" 
                    [disabled]="isSubmitting"
                    appMagnetic
                    class="w-full bg-[var(--text-primary)] hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed text-[var(--bg-primary)] font-black py-6 rounded-2xl transition-all flex items-center justify-center gap-4 uppercase text-[11px] tracking-[0.5em] shadow-2xl">
              <span>{{ isSubmitting ? 'Syncing...' : 'Initiate Contact' }}</span>
              <mat-icon *ngIf="!isSubmitting" class="scale-125">bolt</mat-icon>
              <div *ngIf="isSubmitting" class="w-5 h-5 border-2 border-[var(--bg-primary)]/30 border-t-[var(--bg-primary)] rounded-full animate-spin"></div>
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .animate-reveal { animation: zoom-in 0.6s cubic-bezier(0.2, 0, 0, 1) forwards; }
    @keyframes zoom-in { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  `]
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private toastr = inject(ToastrService);

  @ViewChild('infoSide') infoRef!: ElementRef;
  @ViewChild('formSide') formRef!: ElementRef;

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  displayedTitle = signal('');
  isSubmitting = false;
  submitted = false;
  submitError = false;
  captchaError = false;

  private typingInterval: any;
  private captchaCheckInterval: any;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScripts();
      this.initAnimations();
    }
  }

  private initScripts() {
    if (!(window as any).hcaptcha) {
      const script = document.createElement('script');
      script.src = 'https://js.hcaptcha.com/1/api.js';
      script.async = true; script.defer = true;
      document.body.appendChild(script);
    }

    const w3fScript = document.createElement('script');
    w3fScript.src = 'https://web3forms.com/client/script.js';
    w3fScript.async = true; w3fScript.defer = true;
    document.body.appendChild(w3fScript);

    const renderCaptcha = () => {
      const hcaptcha = (window as any).hcaptcha;
      const container = document.querySelector('.h-captcha');
      if (hcaptcha && container && container.innerHTML === '') {
        hcaptcha.render(container, { sitekey: '50b2fe65-b00b-4b9e-ad62-3ba471098be2', theme: 'dark' });
      }
    };

    this.captchaCheckInterval = setInterval(() => {
      renderCaptcha();
      if ((window as any).hcaptcha && document.querySelector('.h-captcha')?.innerHTML !== '') {
        clearInterval(this.captchaCheckInterval);
      }
    }, 1000);
  }

  private initAnimations() {
    // Precise Multi-Line Typewriter Reset
    const fullTitle = "Let's work together";
    ScrollTrigger.create({
      trigger: this.infoRef.nativeElement,
      start: 'top 85%',
      onEnter: () => this.startTyping(fullTitle)
    });

    gsap.to(this.infoRef.nativeElement, {
      opacity: 1, x: 0, duration: 1.5, ease: 'expo.out', scrollTrigger: { trigger: this.infoRef.nativeElement, start: 'top 80%' }
    });

    gsap.to(this.formRef.nativeElement, {
      opacity: 1, x: 0, duration: 1.8, ease: 'expo.out', delay: 0.3, scrollTrigger: { trigger: this.formRef.nativeElement, start: 'top 80%' }
    });
  }

  private startTyping(text: string) {
    if (this.typingInterval) clearInterval(this.typingInterval);
    this.displayedTitle.set('');
    let index = 0;
    this.typingInterval = setInterval(() => {
      if (index < text.length) {
        this.displayedTitle.set(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, 60);
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      const hcaptcha = (window as any).hcaptcha;
      const hcaptchaResponse = hcaptcha?.getResponse();

      if (!hcaptchaResponse) {
        this.captchaError = true;
        this.cdr.markForCheck();
        return;
      }

      this.isSubmitting = true;
      this.submitError = false;
      this.submitted = false;
      this.captchaError = false;
      this.cdr.markForCheck();

      try {
        const formData = new FormData();
        formData.append("access_key", "a8205ed1-ce6d-4713-bc3c-4510e20f664c");
        formData.append("name", this.contactForm.value.name);
        formData.append("email", this.contactForm.value.email);
        formData.append("message", this.contactForm.value.message);
        formData.append("h-captcha-response", hcaptchaResponse);

        const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
        const data = await response.json();

        if (data.success) {
          this.submitted = true;
          this.contactForm.reset();
          hcaptcha?.reset();
          this.toastr.success('System acknowledgment sent. Response pending.', 'Transmission Received');
        } else {
          this.submitError = true;
          this.toastr.error('Transmission failed. Please try again.', 'Error');
        }
      } catch (error) {
        this.submitError = true;
        this.toastr.error('Network error. Unable to establish uplink.', 'Error');
      } finally {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }
    }
  }

  resetStatus() {
    this.submitted = false;
    this.submitError = false;
    this.captchaError = false;
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.captchaCheckInterval) clearInterval(this.captchaCheckInterval);
  }
}
