import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Main = dynamic(() => import('./game/Index'), {
  ssr: false,
});

export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return <div>{loading ? <Main /> : null}</div>;
};

