import React from 'react';
import illustration__main from '../assets/images/study.svg';
import illustration__secondary from '../assets/images/tutors.svg';
import '../assets/styles/components/LandigPageDescription.scss';

function LandingPageDescription() {
  return (
    <>
      <section className="description-main__container">
        <section className="description-main__text-container">
          <p className="description__title">
            For each student,{' '}
            <span className="description__text--breack">
              a <span className="description__text--highlight">commited</span>{' '}
              tutor.
            </span>
          </p>
          <p className="description__subtitle">
            For each question.{' '}
            <span className="description__text--breack">The right answer.</span>
          </p>
          <div className="description__line"></div>
        </section>
        <img
          className="description__illustration"
          src={illustration__main}
          alt="main illustration"
        />
      </section>
      <section className="description-secondary__container">
        <div className="description-secondary__text-container">
          <p className="description__title">
            Ask <span className="description__text--highlight">anything</span>,{' '}
            <span className="description__text--breack">
              we've got you covered
            </span>
          </p>
          <p className="description__subtitle">
            Search for every subject you can imagine, a spetialized tutor will
            help you with your problem
          </p>
        </div>
        <img
          className="description__illustration"
          src={illustration__secondary}
          alt="secondary illustration"
        />
      </section>
    </>
  );
}

export { LandingPageDescription };
