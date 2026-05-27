import { useEffect, useRef } from 'react';
import { ShaderMaterial, Timer, Uniform, WebGLRenderer } from 'three';
import {
  attachPointerSplats,
  FluidSimulation,
  FULLSCREEN_VERTEX,
  FullscreenPass,
} from 'three-fluid-fx';

const SIMULATION_DEFAULTS = {
  splatRadius: 0.001,
  splatForce: 6,
  reflectWalls: false,
} as const;

const MAX_PIXEL_RATIO = 2;
const MAX_STEP_SECONDS = 1 / 60;

export type ThreeFluidFxHelloWorldProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function ThreeFluidFxHelloWorld({ className, style }: ThreeFluidFxHelloWorldProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    stage.appendChild(renderer.domElement);

    const fluid = new FluidSimulation(renderer, SIMULATION_DEFAULTS);
    const detachPointer = attachPointerSplats(renderer.domElement, fluid);

    const composite = new ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tFluid;
        void main() {
          vec3 fluid = texture2D(tFluid, vUv).rgb;
          float a = clamp(fluid.b * 2.0, 0.0, 1.0);
          gl_FragColor = vec4(fluid, a);
        }
      `,
      uniforms: { tFluid: new Uniform(fluid.densityTexture) },
    });
    const pass = new FullscreenPass(composite);

    const resize = () => {
      const w = Math.max(1, stage.clientWidth);
      const h = Math.max(1, stage.clientHeight);
      renderer.setSize(w, h, false);
      fluid.resize(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    const clock = new Timer();
    renderer.setAnimationLoop(() => {
      clock.update();
      const dt = Math.min(Math.max(clock.getDelta(), 1e-6), MAX_STEP_SECONDS);
      fluid.step(dt);
      composite.uniforms.tFluid.value = fluid.densityTexture;
      pass.render(renderer, null);
    });

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('resize', resize);
      detachPointer();
      fluid.dispose();
      composite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === stage) {
        stage.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100svh',
        background: '#0b0b0f',
        overflow: 'hidden',
        ...style,
      }}
    />
  );
}
