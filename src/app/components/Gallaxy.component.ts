import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, PLATFORM_ID, inject, NgZone } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

@Component({
  selector: 'app-galaxy',
  standalone: true,
  imports: [CommonModule],
  template: `<div #ctnDom class="w-full h-full relative overflow-hidden pointer-events-auto"></div>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    ::ng-deep canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
      outline: none;
    }
  `]
})
export class GalaxyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ctnDom', { static: true }) ctnDom!: ElementRef<HTMLDivElement>;

  @Input() focal: [number, number] = [0.5, 0.5];
  @Input() rotation: [number, number] = [1.0, 0.0];
  @Input() starSpeed: number = 0.5;
  @Input() density: number = 1;
  @Input() hueShift: number = 140;
  @Input() disableAnimation: boolean = false;
  @Input() speed: number = 1.0;
  @Input() mouseInteraction: boolean = true;
  @Input() glowIntensity: number = 0.3;
  @Input() saturation: number = 0.0;
  @Input() mouseRepulsion: boolean = true;
  @Input() repulsionStrength: number = 2;
  @Input() twinkleIntensity: number = 0.3;
  @Input() rotationSpeed: number = 0.1;
  @Input() autoCenterRepulsion: number = 0;
  @Input() transparent: boolean = true;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  private targetMousePos = { x: 0.5, y: 0.5 };
  private smoothMousePos = { x: 0.5, y: 0.5 };
  private targetMouseActive = 0.0;
  private smoothMouseActive = 0.0;

  private renderer: any;
  private gl: any;
  private program: any;
  private mesh: any;
  private animateId?: number;

  private resizeListener?: () => void;
  private mouseMoveListener?: (e: MouseEvent) => void;
  private mouseLeaveListener?: () => void;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Run WebGL initialization and rendering outside Angular context 
      // to avoid triggering change detection on every frame (avoids memory leaks & perf issues).
      this.ngZone.runOutsideAngular(() => {
        this.initWebGL();
      });
    }
  }

  private initWebGL() {
    const ctn = this.ctnDom.nativeElement;
    if (!ctn) return;

    this.renderer = new Renderer({
      alpha: this.transparent,
      premultipliedAlpha: false
    });
    this.gl = this.renderer.gl;

    if (this.transparent) {
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.clearColor(0, 0, 0, 0);
    } else {
      this.gl.clearColor(0, 0, 0, 1);
    }

    this.resizeListener = () => {
      const scale = 1;
      this.renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
      if (this.program) {
        this.program.uniforms['uResolution'].value = new Color(
          this.gl.canvas.width,
          this.gl.canvas.height,
          this.gl.canvas.width / this.gl.canvas.height
        );
      }
    };
    window.addEventListener('resize', this.resizeListener, false);
    this.resizeListener();

    const geometry = new Triangle(this.gl);
    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color(this.gl.canvas.width, this.gl.canvas.height, this.gl.canvas.width / this.gl.canvas.height)
        },
        uFocal: { value: new Float32Array(this.focal) },
        uRotation: { value: new Float32Array(this.rotation) },
        uStarSpeed: { value: this.starSpeed },
        uDensity: { value: this.density },
        uHueShift: { value: this.hueShift },
        uSpeed: { value: this.speed },
        uMouse: {
          value: new Float32Array([this.smoothMousePos.x, this.smoothMousePos.y])
        },
        uGlowIntensity: { value: this.glowIntensity },
        uSaturation: { value: this.saturation },
        uMouseRepulsion: { value: this.mouseRepulsion },
        uTwinkleIntensity: { value: this.twinkleIntensity },
        uRotationSpeed: { value: this.rotationSpeed },
        uRepulsionStrength: { value: this.repulsionStrength },
        uMouseActiveFactor: { value: 0.0 },
        uAutoCenterRepulsion: { value: this.autoCenterRepulsion },
        uTransparent: { value: this.transparent }
      }
    });

    this.mesh = new Mesh(this.gl, { geometry, program: this.program });

    const update = (t: number) => {
      this.animateId = requestAnimationFrame(update);
      if (!this.disableAnimation) {
        this.program.uniforms['uTime'].value = t * 0.001;
        this.program.uniforms['uStarSpeed'].value = (t * 0.001 * this.starSpeed) / 10.0;
      }

      const lerpFactor = 0.05;
      this.smoothMousePos.x += (this.targetMousePos.x - this.smoothMousePos.x) * lerpFactor;
      this.smoothMousePos.y += (this.targetMousePos.y - this.smoothMousePos.y) * lerpFactor;
      this.smoothMouseActive += (this.targetMouseActive - this.smoothMouseActive) * lerpFactor;

      this.program.uniforms['uMouse'].value[0] = this.smoothMousePos.x;
      this.program.uniforms['uMouse'].value[1] = this.smoothMousePos.y;
      this.program.uniforms['uMouseActiveFactor'].value = this.smoothMouseActive;

      this.renderer.render({ scene: this.mesh });
    };

    this.animateId = requestAnimationFrame(update);
    ctn.appendChild(this.gl.canvas);

    this.mouseMoveListener = (e: MouseEvent) => {
      const rect = ctn.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      this.targetMousePos = { x, y };
      this.targetMouseActive = 1.0;
    };

    this.mouseLeaveListener = () => {
      this.targetMouseActive = 0.0;
    };

    if (this.mouseInteraction) {
      ctn.addEventListener('mousemove', this.mouseMoveListener);
      ctn.addEventListener('mouseleave', this.mouseLeaveListener);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.animateId !== undefined) {
        cancelAnimationFrame(this.animateId);
      }
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
      }

      if (this.ctnDom?.nativeElement) {
        const ctn = this.ctnDom.nativeElement;
        if (this.mouseInteraction && this.mouseMoveListener && this.mouseLeaveListener) {
          ctn.removeEventListener('mousemove', this.mouseMoveListener);
          ctn.removeEventListener('mouseleave', this.mouseLeaveListener);
        }
        if (this.gl && this.gl.canvas && ctn.contains(this.gl.canvas)) {
          ctn.removeChild(this.gl.canvas);
        }
      }

      // Cleanup OGL resources properly to avoid memory leaks
      if (this.mesh && this.mesh.geometry) {
        this.mesh.geometry.remove();
      }
      if (this.program) {
        this.program.remove();
      }

      if (this.gl) {
        const ext = this.gl.getExtension('WEBGL_lose_context');
        if (ext) {
          ext.loseContext();
        }
      }
    }
  }
}
