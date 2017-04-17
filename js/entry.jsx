import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Application from './Application';
import Home from './Home';
import About from './About';
import SightReadingPracticeIntro from './modes/sight-reading-practice-intro';
import PerfectPitchPracticeIntro from './modes/perfect-pitch-practice-intro';

// Needed by Material UI
console.log('Injecting tap');
injectTapEventPlugin();

// Render top-level component to page
render(
  <Router history={hashHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="sightReading" component={SightReadingPracticeIntro} />
      <Route path="perfectPitch" component={PerfectPitchPracticeIntro} />
      <Route path="*" component={Home} />
    </Route>
  </Router>,
  document.getElementById('container'),
);
