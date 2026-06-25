import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Timeline } from './pages/Timeline';
import { AddRecord } from './pages/AddRecord';
import { Statistics } from './pages/Statistics';
import { TabBar } from './components/TabBar';
import { useCoffeeStore } from './store/useCoffeeStore';

export default function App() {
  const { initialize } = useCoffeeStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <div className="min-h-screen bg-cream">
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/add" element={<AddRecord />} />
          <Route path="/stats" element={<Statistics />} />
        </Routes>
        <TabBar />
      </div>
    </Router>
  );
}
