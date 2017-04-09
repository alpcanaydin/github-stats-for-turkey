import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';

import './City.css';

class City extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentDidMount() {
    const bBox = this.path.getBBox();

    // eslint-disable-next-line
    this.setState({
      x: bBox.x + bBox.width / 2 - 20,
      y: bBox.y + bBox.height / 2 + 5,
    });
  }

  handleClick(event) {
    event.preventDefault();

    const { data } = this.props;
    this.props.onClick(data);
  }

  handleMouseMove(event) {
    const { data } = this.props;
    this.props.onMouseMove(data, event.pageY, event.pageX + 25);
  }

  handleMouseOut() {
    this.props.onMouseOut();
  }

  render() {
    const { data } = this.props;
    const { x, y } = this.state;

    return (
      <g
        id={data.id}
        name={data.name}
        className="CityG"
        onMouseMove={this.handleMouseMove}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
      >
        <path
          d={data.shape}
          fill={data.fill}
          ref={ref => {
            this.path = ref;
          }}
        />
        <text
          transform={`translate(${x} ${y})`}
          style={{
            fill: darken(0.28, data.fill),
          }}
        >
          {data.topLanguage || 'Yok'}
        </text>
      </g>
    );
  }
}

City.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shape: PropTypes.isRequired,
    fill: PropTypes.string,
    topLanguage: PropTypes.string,
    users: PropTypes.number.isRequired,
    repos: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
};

export default City;
