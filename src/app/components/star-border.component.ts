import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-border',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="relative inline-block overflow-hidden rounded-[20px]"
      [ngClass]="className"
      [style.padding-top.px]="thickness"
      [style.padding-bottom.px]="thickness"
    >
      <div
        class="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        [style.background]="'radial-gradient(circle, ' + color + ', transparent 10%)'"
        [style.animation-duration]="speed"
      ></div>
      <div
        class="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        [style.background]="'radial-gradient(circle, ' + color + ', transparent 10%)'"
        [style.animation-duration]="speed"
      ></div>
      <div class="relative z-1 bg-gradient-to-b from-zinc-950 to-zinc-900 border border-zinc-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class StarBorderComponent {
  @Input() className = '';
  @Input() color = '#10b981'; // Default to emerald-500 to match theme
  @Input() speed = '6s';
  @Input() thickness = 1;
}
