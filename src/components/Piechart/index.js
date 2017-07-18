import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';

import * as d3Sel from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Format from 'd3-format';

import './piechart.css';

class Piechart extends Component {


  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        width: 510,
        height: 300,
      },
      id: props.id ? props.id : 'piechart',
      donut: props.donut,
      data: props.data,
      init: false,
    };
    this.initializeD3 = this.initializeD3.bind(this);
  }

  componentWillMount() {
    this.setState({ ...this.state }, () => this.initializeD3());
  }

  componentWillUpdate(nextProps, nextState) {
    const oldWidth = this.state.dimensions.width;
    const oldHeight = this.state.dimensions.height;
    const newWidth = nextState.dimensions.width;
    const newHeight = nextState.dimensions.height;
    if (oldWidth !== newWidth || oldHeight !== newHeight) {
      this.updateSize(newWidth, newHeight);
    }
  }

  // eslint-disable-next-line no-unused-vars
  updateSize(width, height) {
    if (this.state.init) {
      // console.log('update');
    }
  }


  initializeD3() {
    const mountPoint = this.mountPoint;
    const { width, height } = this.state.dimensions;
    const { data } = this.state;
    /* eslint-disable no-unused-vars */
    const RED = '#da1c15';
    const YELLOW = '#f6ad26';
    const GREEN = '#7db346';
    const BLUE = '#5280fb';
    /* eslint-enable no-unused-vars */
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    // const colour = d3Scale.scaleOrdinal(d3Scale.schemeCategory20c);
    const colour = d3Scale.scaleOrdinal([BLUE, GREEN, YELLOW, RED]);

    // Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
    const radius = Math.min(width, height) / 2;
    const cornerRadius = 2;
    const padAngle = 0.02;

    // Set up format options
    const floatFormat = d3Format.format('.4r');
    const variable = 'numberVulnerabilities';
    const category = 'riskFactor';

    // creates a new pie generator
    const pie = d3Shape.pie()
      .value(d => floatFormat(d[variable]))
      .sort(null);

    // contructs and arc generator. This will be used for the donut. The difference
    // between outer and inner radius will dictate the thickness of the donut
    const arc = d3Shape.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.55)
        .cornerRadius(cornerRadius)
        .padAngle(padAngle);

    // this arc is used for aligning the text labels
    const outerArc = d3Shape.arc()
        .outerRadius(radius * 0.9)
        .innerRadius(radius * 0.9);

    // create the svg element
    const svg = d3Sel.select(mountPoint)
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('id', this.state.id);

    const svgG = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    const midAngle = d => d.startAngle + ((d.endAngle - d.startAngle) / 2);

    const risk = (d) => {
      switch (d) {
        case 1:
          return 'Informative';
        case 2:
          return 'Low';
        case 3:
          return 'Medium';
        case 4:
          return 'High';
        default:
          return '';
      }
    };

    const toolTipHTML = (dataArg) => {
      let tip = '';

      // Risk Factor info

      tip += `<tspan x="0" dy="0em">Risk: ${risk(dataArg.data.riskFactor)}</tspan>`;

      // Number of Vulnerabilities info
      tip += `<tspan x="0" dy="1em">Total: ${dataArg.data.numberVulnerabilities}</tspan>`;

      // Object.keys(dataArg.data).forEach((key, i) => {
      //   // if value is a number, format it as a percentage
      //   const value = (!isNaN(parseFloat(dataArg.data[key]))) ?
      //     percentFormat(dataArg.data[key]) : dataArg.data[key];

      //   // leave off 'dy' attr for first tspan so the 'dy' attr on
      //   // text element works. The 'dy' attr on
      //   // tspan effectively imitates a line break.
      //   if (i === 0) tip += `<tspan x="0">${key}: ${value}</tspan>`;
      //   else tip += `<tspan x="0" dy="1.2em">${key}: ${value}</tspan>`;
      // });

      return tip;
    };
    const toolTip = (selection) => {
      // add tooltip (svg circle element) when mouse enters label or slice
      selection.on('mouseenter', (dataArg) => {
        svgG.append('text')
          .attr('class', 'toolCircle')
          .attr('dy', -15) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
          .html(toolTipHTML(dataArg)) // add text to the circle.
          .style('font-size', '.9em')
          .style('text-anchor', 'middle'); // centres text in tooltip

        svgG.append('circle')
          .attr('class', 'toolCircle')
          .attr('r', radius * 0.5) // radius of tooltip circle
          .style('fill', colour(dataArg.data[category])) // colour based on category mouse is over
          .style('fill-opacity', 0.35);
      });

      // remove the tooltip when mouse leaves the slice/label
      selection.on('mouseout', () => {
        d3Sel.selectAll('.toolCircle').remove();
      });
    };

    // g elements to keep elements within svg modular
    const slices = svgG.append('g').attr('class', 'slices');
    const labels = svgG.append('g').attr('class', 'labelName');
    const lines = svgG.append('g').attr('class', 'lines');

    // label line length, in relation to the radius of the slice
    const radiusDistMultiplier = 0.8;

    // add and colour the donut slices
    const path = slices.datum(data).selectAll('path')
      .data(pie)
    .enter()
      .append('path')
      .attr('fill', d => colour(d.data[category]))
      .attr('d', arc);

    const label = labels.datum(data).selectAll('text')
      .data(pie)
    .enter()
      .append('text')
      .attr('dy', '.35em')
      // add "key: value" for given category. Number inside tspan is bolded in stylesheet.
      .html(d => `${risk(d.data.riskFactor)}: <tspan>${d.data.numberVulnerabilities}</tspan>`)
      .attr('transform', (d) => {
        // effectively computes the centre of the slice.
        // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
        const pos = outerArc.centroid(d);
        // changes the point to be on left or right depending on where label is.
        // eslint-disable-next-line max-len
        pos[0] = radius * radiusDistMultiplier * (d.data.riskFactor === 4 ? -1 : 1) * (midAngle(d) < Math.PI ? 1 : -1);
        if (d.data.riskFactor === 4) {
          pos[0] += 50;
        }
        return `translate(${pos})`;
      })
      // if slice centre is on the left, anchor text to start, otherwise anchor to end
      .style('text-anchor', d => ((midAngle(d)) < Math.PI ? 'start' : 'end'));

    // add lines connecting labels to slice. A polyline creates
    // straight lines connecting several points
    const polyline = lines.datum(data).selectAll('polyline')
        .data(pie)
      .enter()
        .append('polyline')
        .attr('points', (d) => {
          // see label transform function for explanations of these three lines.
          const pos = outerArc.centroid(d);
          // eslint-disable-next-line max-len
          pos[0] = radius * radiusDistMultiplier * (d.data.riskFactor === 4 ? -1 : 1) * (midAngle(d) < Math.PI ? 1 : -1);
          return [arc.centroid(d), outerArc.centroid(d), pos];
        });

    // add tooltip to mouse events on slices and labels
    svgG.selectAll('.labelName text, .slices path').call(toolTip);

    this.setState({
      ...this.state,
      init: true,
      d3Viz: {
        svg, svgG, path, label, polyline,
      },
    });
  }

  render() {
    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({ ...this.state, dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) =>
          (
            <div ref={measureRef}>
              <div ref={(r) => { this.mountPoint = r; }} />
            </div>
          )
        }
      </Measure>
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
