import React from 'react';
import { LandingPageDescription } from '../components/LandingPageDescription';
import { TutorsContainer } from '../components/TutorsContainer';
import '../assets/styles/pages/landing-page.css';

function LandingPage() {
  return (
    <div className="page">
      <div className="page__header-mock">Header</div>
      <main className="page__inner">
        <LandingPageDescription />
        <TutorsContainer />
      </main>
      <div className="page__footer-mock">Footer</div>
    </div>
  );
}

export { LandingPage };
