import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { emptyStateItem, isInit, isLoading, isFailed, isFetched } from '../util/stateHelpers';
import { request } from '../redux/modules/language';

import LanguageGeneral from './LanguageGeneral';
import LanguageLocations from './LanguageLocations';
import LanguageMostActiveDevelopers from './LanguageMostActiveDevelopers';
import LanguageMostStarredRepos from './LanguageMostStarredRepos';

import LanguageSidebar from '../components/LanguageSidebar';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Nav from '../components/Nav';
import NotFound from '../components/NotFound';
import Loading from '../components/Loading';

class LanguageDetail extends Component {
  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps);
  }

  load(props) {
    const { match, language } = props;

    if (isInit(language)) {
      this.props.request(match.params.language);
    }
  }

  render() {
    const { match, language } = this.props;

    if (isFailed(language)) {
      return <NotFound />;
    }

    const router = (
      <div>
        <Switch>
          <Route
            exact
            path="/language/:language"
            render={() => (
              <LanguageGeneral data={language.data.language} positions={language.data.positions} />
            )}
          />
          <Route
            exact
            path="/language/:language/locations"
            render={() => (
              <LanguageLocations
                name={language.data.language.language}
                data={language.data.stats.topLocations}
              />
            )}
          />
          <Route
            exact
            path="/language/:language/most-starred-repos"
            render={() => (
              <LanguageMostStarredRepos
                name={language.data.language.language}
                data={language.data.stats.topStarredRepos}
              />
            )}
          />
          <Route
            exact
            path="/language/:language/most-active-developers"
            render={() => (
              <LanguageMostActiveDevelopers
                name={language.data.language.language}
                data={language.data.stats.topUsers}
              />
            )}
          />
        </Switch>
      </div>
    );

    return (
      <div>
        <ScrollToTopOnMount />
        <Nav />

        <section className="hero is-primary is-bold">
          <div className="hero-body">
            <div className="container">
              {isLoading(language) && <h1 className="title">Yükleniyor</h1>}
              {isFetched(language) &&
                <h1 className="title">
                  {language.data.language.language} İstatistikleri
                </h1>}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter">
                <LanguageSidebar params={match.params} />
              </div>
              <div className="column">
                {isLoading(language) ? <Loading /> : router}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

LanguageDetail.propTypes = {
  match: PropTypes.object.isRequired,
  language: PropTypes.object.isRequired,
  request: PropTypes.func.isRequired,
};

export default connect(
  (state, { match }) => ({
    language: state.language[match.params.language] || emptyStateItem,
  }),
  dispatch => bindActionCreators({ request }, dispatch),
)(LanguageDetail);
