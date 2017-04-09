import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { emptyStateItem, isInit, isLoading, isFailed, isFetched } from '../util/stateHelpers';
import { request } from '../redux/modules/developer';

import DeveloperGeneral from './DeveloperGeneral';
import DeveloperLanguage from './DeveloperLanguage';
import DeveloperTopStarredRepos from './DeveloperTopStarredRepos';

import DeveloperSidebar from '../components/DeveloperSidebar';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Nav from '../components/Nav';
import NotFound from '../components/NotFound';
import Loading from '../components/Loading';

class DeveloperDetail extends Component {
  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps);
  }

  load(props) {
    const { match, developer } = props;

    if (isInit(developer)) {
      this.props.request(match.params.developer);
    }
  }

  render() {
    const { match, developer } = this.props;

    if (isFailed(developer)) {
      return <NotFound />;
    }

    const router = (
      <div>
        <Switch>
          <Route
            exact
            path="/developer/:developer"
            render={() => (
              <DeveloperGeneral data={developer.data.user} positions={developer.data.positions} />
            )}
          />
          <Route
            exact
            path="/developer/:developer/languages"
            render={() => <DeveloperLanguage data={developer.data.stats.topLanguages} />}
          />
          <Route
            exact
            path="/developer/:developer/most-starred-repos"
            render={() => <DeveloperTopStarredRepos data={developer.data.stats.topStarredRepos} />}
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
              {isLoading(developer) && <h1 className="title">Yükleniyor</h1>}
              {isFetched(developer) &&
                <article className="media">
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img src={developer.data.user.avatarUrl} alt="Profil resmi" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <h1 className="title">
                      {developer.data.user.name}
                      {' '}
                      <small>
                        <a
                          href={`https://github.com/${developer.data.user.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="githubLink"
                        >
                          @{developer.data.user.username}
                        </a>
                      </small>
                    </h1>
                    <h2 className="subtitle">
                      <span className="icon">
                        <i className="fa fa-map-marker" />
                      </span>
                      <span>{developer.data.user.location}</span>
                    </h2>
                  </div>
                </article>}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-one-quarter">
                <DeveloperSidebar params={match.params} />
              </div>
              <div className="column">
                {isLoading(developer) ? <Loading /> : router}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

DeveloperDetail.propTypes = {
  match: PropTypes.object.isRequired,
  developer: PropTypes.object.isRequired,
  request: PropTypes.func.isRequired,
};

export default connect(
  (state, { match }) => ({
    developer: state.developer[match.params.developer] || emptyStateItem,
  }),
  dispatch => bindActionCreators({ request }, dispatch),
)(DeveloperDetail);
