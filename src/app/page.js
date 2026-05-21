import React from 'react';
import Home from './Components/shared/Home';
import PlatformStats from './Components/shared/PlatformStats';
import TrendingIdeas from './Components/shared/TrendingIdeas';
import InnovationCTA from './Components/shared/InnovationCTA';

const page = () => {
  return (
    <div>
      <Home />
      <TrendingIdeas />
      <PlatformStats />
      <InnovationCTA />
    </div>
  );
};

export default page;