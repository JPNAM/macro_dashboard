import { useState } from 'react';
import Layout from './components/Layout';

import MacroPage from './pages/MacroPage';

// Placeholder components for pages
const RatesPage = () => <div className="text-zinc-400">Interest Rate Monitor (Coming Soon)</div>;
const InflationPage = () => <div className="text-zinc-400">Inflation Lab (Coming Soon)</div>;
const SupplyPage = () => <div className="text-zinc-400">Supply Chain Monitor (Coming Soon)</div>;

function App() {
  const [activePage, setActivePage] = useState('macro');

  const renderPage = () => {
    switch (activePage) {
      case 'macro': return <MacroPage />;
      case 'rates': return <RatesPage />;
      case 'inflation': return <InflationPage />;
      case 'supply': return <SupplyPage />;
      default: return <MacroPage />;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
