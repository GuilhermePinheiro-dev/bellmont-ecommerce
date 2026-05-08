import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

function App() {
  return (
    <>
      <Header />
      <main className="py-6">
        <Hero />
      </main>
    </>
  );
}

export default App;
