import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './UserSearch.css';

class UserSearch extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const username = this.username.value;
    this.props.dispatch(push(`/developer/${username}`));
  }

  render() {
    const { topUsers } = this.props;

    return (
      <section className="hero is-fullheight UserSearch">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              Geliştirici İstatistikleri
            </h1>
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
                <form method="get" onSubmit={this.handleSubmit}>
                  <div className="field is-grouped">
                    <p className="control is-expanded">
                      <input
                        className="input is-large"
                        required
                        type="text"
                        placeholder="Kullanıcı adı"
                        ref={ref => {
                          this.username = ref;
                        }}
                      />
                    </p>
                    <p className="control">
                      <button type="submit" className="button is-large is-dark">
                        Ara
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="has-text-centered tags">
              {topUsers.map(user => (
                <Link key={user} to={`/developer/${user}`} className="tag is-primary is-medium">
                  {user}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

UserSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
  topUsers: PropTypes.array.isRequired,
};

export default connect()(UserSearch);
