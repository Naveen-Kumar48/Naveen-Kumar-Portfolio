import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download-resume',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container relative z-20">
      <label class="label">
        <input type="checkbox" class="input" (change)="downloadResume($event)" />
        <span class="circle">
          <svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
          </svg>
          <div class="square"></div>
        </span>
        <p class="title text-sm">My Resume</p>
        <p class="title text-sm">Open</p>
      </label>
    </div>
  `,
  styles: [`
    .container {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-family: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .label {
      background-color: #10b981; /* emerald-500 */
      border: 2px solid #10b981;
      display: flex;
      align-items: center;
      border-radius: 50px;
      width: 130px;
      height: 40px;
      cursor: pointer;
      transition: all 0.4s ease;
      padding: 4px;
      position: relative;
    }

    .label:hover {
      background-color: #059669; /* emerald-600 */
      border-color: #059669;
    }

    .label::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #fff;
      width: 8px;
      height: 8px;
      transition: all 0.4s ease;
      border-radius: 100%;
      margin: auto;
      opacity: 0;
      visibility: hidden;
    }

    .label .input {
      display: none;
    }

    .label .title {
      color: #fff;
      transition: all 0.4s ease;
      position: absolute;
      right: 18px;
      bottom: 10px;
      text-align: center;
      font-weight: 600; /* font-semibold */
      white-space: nowrap;
    }

    .label .title:last-child {
      opacity: 0;
      visibility: hidden;
    }

    .label .circle {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2); /* lighter overlay */
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.4s ease;
      position: relative;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
      overflow: hidden;
    }

    .label .circle .icon {
      color: #fff;
      width: 18px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.4s ease;
    }

    .label .circle .square {
      aspect-ratio: 1;
      width: 10px;
      border-radius: 2px;
      background-color: #fff;
      opacity: 0;
      visibility: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.4s ease;
    }

    .label .circle::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.2); 
      width: 100%;
      height: 0;
      transition: all 0.4s ease;
    }

    .label:has(.input:checked) {
      width: 42px;
      animation: installed 0.4s ease 3.5s forwards;
    }

    .label:has(.input:checked)::before {
      animation: rotate 3s ease-in-out 0.4s forwards;
    }

    .label .input:checked + .circle {
      animation:
        pulse 1s forwards,
        circleDelete 0.2s ease 3.5s forwards;
      rotate: 180deg;
    }

    .label .input:checked + .circle::before {
      animation: installing 3s ease-in-out forwards;
    }

    .label .input:checked + .circle .icon {
      opacity: 0;
      visibility: hidden;
    }

    .label .input:checked ~ .circle .square {
      opacity: 1;
      visibility: visible;
    }

    .label .input:checked ~ .title {
      opacity: 0;
      visibility: hidden;
    }

    .label .input:checked ~ .title:last-child {
      animation: showInstalledMessage 0.4s ease 3.5s forwards;
    }

    @keyframes pulse {
      0% {
        scale: 0.95;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); 
      }
      70% {
        scale: 1;
        box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
      }
      100% {
        scale: 0.95;
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
      }
    }

    @keyframes installing {
      from {
        height: 0;
      }
      to {
        height: 100%;
      }
    }

    @keyframes rotate {
      0% {
        transform: rotate(-90deg) translate(20px) rotate(0);
        opacity: 1;
        visibility: visible;
      }
      99% {
        transform: rotate(270deg) translate(20px) rotate(270deg);
        opacity: 1;
        visibility: visible;
      }
      100% {
        opacity: 0;
        visibility: hidden;
      }
    }

    @keyframes installed {
      100% {
        width: 120px;
        background-color: #10b981;
        border-color: #10b981;
      }
    }

    @keyframes circleDelete {
      100% {
        opacity: 0;
        visibility: hidden;
      }
    }

    @keyframes showInstalledMessage {
      100% {
        opacity: 1;
        visibility: visible;
        right: 30px;
      }
    }
  `]
})
export class DownloadResumeBtnComponent {
  downloadResume(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      // Create a temporary link to download
      const link = document.createElement('a');
      link.href = '/assets/Naveen_kumar_Resume.pdf';
      link.download = 'Naveen_kumar_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Uncheck after animation completes so it can be used again
      setTimeout(() => {
        input.checked = false;
      }, 4000);
    }
  }
}
