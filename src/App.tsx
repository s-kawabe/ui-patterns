import { ThreeFluidFxHelloWorld } from './patterns/3d/three-fluid-fx/helloworld/Demo';
import './App.css';

function App() {
  return (
    <main className="featured-stage">
      <ThreeFluidFxHelloWorld />
      <header className="featured-label">
        <span className="featured-label__crumbs">3D · three-fluid-fx · HelloWorld</span>
        <span className="featured-label__hint">マウスを動かして反応を見てください</span>
      </header>
    </main>
  );
}

export default App;
