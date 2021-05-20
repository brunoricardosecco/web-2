import { useEffect } from 'react';

import { useAuth } from '../hooks/auth';

function Home() {
  const { verifySession } = useAuth();

  useEffect(() => {
    verifySession();
  }, []);

  return <div />;
}

export default Home;
