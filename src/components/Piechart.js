import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';
import * as d3Shape from 'd3-shape';

class Piechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 250,
      height: 250,
      id: props.id ? props.id : 'piechart',
      data: props.data,
      donut: props.donut,
    };
    this.initializeD3 = this.initializeD3.bind(this);
  }

  componentWillMount() {
    this.setState({ ...this.state }, () => this.initializeD3());
  }

  initializeD3() {
    const mountPoint = this.mountPoint;
    const { width, height, data } = this.state;
    const radius = Math.min(width, height) / 2;
    const RED = '#da1c15';
    const YELLOW = '#f6ad26';
    const GREEN = '#7db346';
    const BLUE = '#5280fb';

    const svg = select(mountPoint)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('overflow', 'hidden')
      .attr('id', this.state.id);

    const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

    // FIXME colors from vulnerabilities
    const color = scaleOrdinal([BLUE, GREEN, YELLOW, RED]);

    const piechart = d3Shape.pie().sort(null).value(d => d);

    const path = d3Shape.arc()
      .outerRadius(radius - 10)
      .innerRadius(this.state.donut ? radius / 2 : 0);

    const label = d3Shape.arc().outerRadius(radius - 40).innerRadius(radius - 40);

    const arc = g.selectAll('.arc')
      .data(piechart(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arc.append('path')
      .style('stroke', '#fff')
      .attr('d', path)
      .style('fill', d => color(d.data));

    arc.append('text')
      .style('font', '10px sans-serif')
      .style('text-anchor', 'middle')
      .attr('transform', d => `translate(${label.centroid(d)})`)
      .text(d => d.data);
  }

  render() {
    return (
      <div>
        <div ref={(r) => { this.mountPoint = r; }} />
      </div>
    );
  }
}
Piechart.propTypes = {
  id: PropTypes.string.isRequired,
  donut: PropTypes.bool,
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

Piechart.defaultProps = {
  donut: false,
};

export default Piechart;
