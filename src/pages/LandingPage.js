import React from 'react';
import { LandingPageDescription } from '../components/LandingPageDescription';
import { TutorsContainer } from '../components/TutorsContainer';
import '../assets/styles/pages/landing-page.scss';

function LandingPage() {
  return (
    <div className="page">
      <main className="page__inner">
        <LandingPageDescription />
        <TutorsContainer title="Meet some of our best tutors" />
      </main>
    </div>
  );
}

export { LandingPage };
