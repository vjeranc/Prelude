import React from 'react';
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import Application from './application.jsx';
import Home from './home.jsx';
import About from './about.jsx';
import SightReadingPracticeIntro from './modes/sight-reading-practice-intro.jsx';
import PerfectPitchPracticeIntro from './modes/perfect-pitch-practice-intro.jsx';

// Needed by Material UI
console.log("Injecting tap");
injectTapEventPlugin();

// Render top-level component to page
render(
  <Router history={hashHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={Home} />
      <Route path="about" component={About}/>
      <Route path="sightReading" component={SightReadingPracticeIntro}/>
      <Route path="perfectPitch" component={PerfectPitchPracticeIntro}/>
      <Route path="*" component={Home}/>
    </Route>
  </Router>,
  document.getElementById('container')
);
