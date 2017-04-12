import React, { Component } from 'react';
import PropTypes from 'prop-types';

class YearRange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: props.min, max: props.max },
      buttonDisabled: false,
    };

    this.updateValue = this.updateValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.value);
    }
  }

  updateValue(field) {
    return event => {
      const value = parseInt(event.target.value, 10);

      this.setState(state => ({
        ...state,
        value: { ...state.value, [field]: value },
        buttonDisabled: !/^\d{4}$/.test(value),
      }));
    };
  }

  render() {
    const { disabled } = this.props;
    const { buttonDisabled } = this.state;

    return (
      <div style={{ paddingTop: 20 }} className="columns">
        <div className="column is-half is-offset-one-quarter">
          <div className="columns is-multiline">
            <div className="column is-4">
              <strong>
                <small>Min. içeren yıl</small>
              </strong>
              <input
                type="number"
                className="input"
                value={this.state.value.min}
                onChange={this.updateValue('min')}
              />
            </div>

            <div className="column is-4">
              <strong>
                <small>Maks. içeren yıl</small>
              </strong>
              <input
                type="number"
                className="input"
                value={this.state.value.max}
                onChange={this.updateValue('max')}
              />
            </div>

            <div className="column is-4">
              <strong>&nbsp;</strong>
              <button
                className="button is-primary is-fullwidth"
                onClick={this.onChange}
                disabled={disabled || buttonDisabled}
              >
                Filtrele
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

YearRange.defaultProps = {
  disabled: false,
};

YearRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default YearRange;
