import React from 'react';
import { Link } from 'react-router-dom';

import './LanguageSearch.css';

import topLanguages from '../data/topLanguages.json';

const LanguageSearch = () => (
  <section className="hero is-fullheight LanguageSearch">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">
          Dil İstatistikleri
        </h1>
        <div className="columns">
          <div className="column is-2" />
          <div className="column is-8">
            <div className="tags has-text-centered">
              {topLanguages.map(language => (
                <Link
                  key={language}
                  to={`/language/${language}`}
                  className="tag is-primary is-medium"
                >
                  {language}
                </Link>
              ))}
            </div>
          </div>
          <div className="column is-2" />
        </div>
      </div>
    </div>
  </section>
);

export default LanguageSearch;
