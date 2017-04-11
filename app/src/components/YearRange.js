import React, { Component } from 'react';
import PropTypes from 'prop-types';

class YearRange extends Component {
  constructor(props) {
    super(props);

    this.state = { value: { min: props.min, max: props.max } };

    this.updateValue = this.updateValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  updateValue(field) {
    return event => {
      const value = parseInt(event.target.value, 10);

      this.setState(
        (state) => ({
          ...state,
          value: { ...state.value, [field]: value }
        })
      );
    };
  }

  onChange() {
    if ('function' === typeof this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    const { disabled, min, max } = this.props;

    return (
      <div style={{ paddingTop: 20 }} className="columns is-centered">
        <p className="column is-3">
          <input
            type="number" className="input" min={min} max={this.state.value.max - 1}
            value={this.state.value.min} onChange={this.updateValue('min')} />
        </p>

        <p className="column is-3">
          <input
            type="number" className="input" min={this.state.value.min + 1} max={max}
            value={this.state.value.max} onChange={this.updateValue('max')} />
        </p>

        <p className="column is-2">
          <button className="button is-primary" onClick={this.onChange} disabled={disabled}>
            Ara
          </button>
        </p>
      </div>
    );
  }
}

YearRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default YearRange;
