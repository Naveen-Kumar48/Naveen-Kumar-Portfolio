import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-three-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #rendererContainer class="w-full h-full absolute inset-0 -z-10"></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  `]
})
export class ThreeHeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private particles!: THREE.Points;
  private mouseX = 0;
  private mouseY = 0;
  private windowHalfX = 0;
  private windowHalfY = 0;
  private animationId: number | null = null;
  private resizeObserver!: ResizeObserver;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.initThree();
      this.initResizeObserver();
      window.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      if (this.renderer) {
        this.renderer.dispose();
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      window.removeEventListener('mousemove', this.onDocumentMouseMove.bind(this));
    }
  }

  private initThree() {
    const container = this.rendererContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    this.scene = new THREE.Scene();
    // Fog to blend with background
    this.scene.fog = new THREE.FogExp2(0x09090b, 0.002); // Matches zinc-950

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 2000);
    this.camera.position.z = 1000;

    // Particles
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      // Spread particles in a wide area
      posArray[i] = (Math.random() - 0.5) * 3000;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const material = new THREE.PointsMaterial({
      size: 3,
      color: 0x10b981, // Emerald-500
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(this.renderer.domElement);

    // Start Animation Loop outside Angular Zone
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Rotate the entire particle system slowly
    this.particles.rotation.x += 0.0005;
    this.particles.rotation.y += 0.0005;

    // Mouse interaction parallax
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }

  private onDocumentMouseMove(event: MouseEvent) {
    this.mouseX = (event.clientX - this.windowHalfX) * 0.5;
    this.mouseY = (event.clientY - this.windowHalfY) * 0.5;
  }

  private initResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.onWindowResize();
    });
    this.resizeObserver.observe(this.rendererContainer.nativeElement);
  }

  private onWindowResize() {
    if (!this.rendererContainer) return;
    
    const container = this.rendererContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
