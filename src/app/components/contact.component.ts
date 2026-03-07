import { Component, inject, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  template: `
    <section id="contact" class="py-24 relative overflow-hidden">
      <!-- Background Glow -->
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div #infoSide class="transform transition-transform">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Let's work <span class="text-emerald-400">together</span></h2>
          <p class="text-[var(--text-secondary)] mb-8 leading-relaxed">
            I'm currently available for freelance work or full-time positions. 
            If you have a project that needs some creative touch, or just want to say hi, 
            feel free to send me a message.
          </p>

          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center border border-[var(--border-color)] text-emerald-400">
                <mat-icon>email</mat-icon>
              </div>
              <div>
                <p class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Email</p>
                <a href="mailto:kumarnaveen897941@gmail.com" class="text-lg font-medium hover:text-emerald-400 transition-colors text-[var(--text-primary)]">kumarnaveen897941&#64;gmail.com</a>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center border border-[var(--border-color)] text-emerald-400">
                <mat-icon>phone</mat-icon>
              </div>
              <div>
                <p class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Phone</p>
                <a href="tel:+918979413404" class="text-lg font-medium hover:text-emerald-400 transition-colors text-[var(--text-primary)]">+91 8979413404</a>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center border border-[var(--border-color)] text-emerald-400">
                <mat-icon>location_on</mat-icon>
              </div>
              <div>
                <p class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">Location</p>
                <p class="text-lg font-medium text-[var(--text-primary)]">India</p>
              </div>
            </div>
          </div>

          <div class="mt-12">
            <p class="text-sm text-[var(--text-secondary)] mb-4">Connect with me</p>
            <div class="flex gap-4">
              <a href="https://github.com/Naveen-Kumar48" target="_blank" class="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-emerald-500 hover:border-emerald-500 transition-all">
                <mat-icon class="text-sm">code</mat-icon>
              </a>
              <a href="https://www.linkedin.com/in/naveen-kumar-6806382b9/" target="_blank" class="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-emerald-500 hover:border-emerald-500 transition-all">
                <mat-icon class="text-sm">work</mat-icon>
              </a>
              <a href="mailto:kumarnaveen897941@gmail.com" class="w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-emerald-500 hover:border-emerald-500 transition-all">
                <mat-icon class="text-sm">alternate_email</mat-icon>
              </a>
            </div>
          </div>
        </div>

        <form #formSide [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="bg-[var(--bg-secondary)] p-8 rounded-3xl border border-[var(--border-color)] shadow-xl transform transition-transform">
          <div class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Name</label>
              <input type="text" id="name" formControlName="name" 
                     class="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                     placeholder="John Doe">
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email</label>
              <input type="email" id="email" formControlName="email" 
                     class="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                     placeholder="john@example.com">
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message</label>
              <textarea id="message" formControlName="message" rows="4"
                        class="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                        placeholder="Tell me about your project..."></textarea>
            </div>

            <button type="submit" 
                    [disabled]="contactForm.invalid || isSubmitting"
                    class="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
              @if (!isSubmitting) {
                <span>Send Message</span>
              }
              @if (isSubmitting) {
                <span>Sending...</span>
              }
              @if (!isSubmitting) {
                <mat-icon>send</mat-icon>
              }
            </button>

            @if (submitted) {
              <p class="text-green-400 text-center text-sm mt-4">
                Thanks for reaching out! I'll get back to you soon.
              </p>
            }
            @if (submitError) {
              <p class="text-red-400 text-center text-sm mt-4">
                Something went wrong. Please try again.
              </p>
            }
          </div>
        </form>
      </div>
    </section>
  `
})
export class ContactComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('infoSide') infoRef!: ElementRef;
  @ViewChild('formSide') formRef!: ElementRef;

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  isSubmitting = false;
  submitted = false;

  submitError = false;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(this.infoRef.nativeElement, {
        scrollTrigger: {
          trigger: this.infoRef.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.to(this.formRef.nativeElement, {
        scrollTrigger: {
          trigger: this.formRef.nativeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = false;
      this.submitted = false;

      try {
        const formData = new FormData();
        formData.append("access_key", "a8205ed1-ce6d-4713-bc3c-4510e20f664c");
        formData.append("name", this.contactForm.value.name);
        formData.append("email", this.contactForm.value.email);
        formData.append("message", this.contactForm.value.message);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          this.submitted = true;
          this.contactForm.reset();
          setTimeout(() => {
            this.submitted = false;
            this.cdr.markForCheck();
          }, 5000);
        } else {
          this.submitError = true;
        }
      } catch (error) {
        this.submitError = true;
      } finally {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }
    }
  }
}
