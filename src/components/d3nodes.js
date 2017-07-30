import React from 'react'
import { Redirect } from 'react-router'

const NODES_COLOR = '#88D8B0';
const NODES_ON_HOVER_COLOR = '#00FF00';

const DANGER_COLOR = '#EF623B';
const WARNING_COLOR = '#F8C633';
const NEUTRAL_COLOR = '#88D8B0'

const QUESTION_COUNT_COLOR = '#02a8f3';

const TOPIC_RADIUS = 50;
const SUBTOPIC_RADIUS = 25;

const NODES_DISTANCE = 150;

const TOPIC_QUESTION_COUNT_RADIUS = 15;
const SUBTOPIC_QUESTION_COUNT_RADIUS = 12;

export default class D3Nodes extends React.Component{
  constructor(){
    super();
    this.state = {
    };
  }

  // helper function needed in renderD3()
  renderD3Nodes(data){
    // renderD3s the topic nodes (the red/orange/green circles)
    var self = this;
    var nodes = this.svg.selectAll('.node').data(data);
    nodes.enter().append('circle')
      .attr('cx', TOPIC_RADIUS)
    nodes
      .attr('class', 'node')
      .attr('cy', (data, i) => (TOPIC_RADIUS + i * NODES_DISTANCE))
      .attr('r', (data) => (data.type==='TOPIC' ? TOPIC_RADIUS : SUBTOPIC_RADIUS))
      .attr('fill', (data) => {
        if(data.upvotes >= data.downvotes){
          return NEUTRAL_COLOR;
        } else if(data.downvotes - data.upvotes < 5){
          return WARNING_COLOR;
        } else {
          return DANGER_COLOR;
        }
      })
      .on('mouseover', function(d, i){
        d3.select(this).attr({
          fill: self.shadeColor(d3.select(this).attr('fill'), 0.3)
        });
      })
      .on('mouseout', function(data, i){
        var temp;
        if(data.upvotes >= data.downvotes){
          temp = NEUTRAL_COLOR;
        } else if(data.downvotes - data.upvotes < 5){
          temp = WARNING_COLOR;
        } else {
          temp = DANGER_COLOR;
        }
        d3.select(this).attr({
          fill: temp
        });
      })
      .on('click', function(d, i){
        alert('You clicked on node no.' + i);
      })
    nodes.exit().remove();

    // renderD3 questions count (blue circles on top right)
    var questions_count = this.svg.selectAll('.questions_count').data(data);
    questions_count.enter().append('circle')
    questions_count
      .attr('class', 'questions_count')
      .attr('r', (data) => (data.type==='TOPIC' ? TOPIC_QUESTION_COUNT_RADIUS : SUBTOPIC_QUESTION_COUNT_RADIUS))
      .attr('cx', (data) => (data.type==='TOPIC' ? (TOPIC_RADIUS + Math.cos(Math.PI/4) * TOPIC_RADIUS) : (TOPIC_RADIUS + Math.cos(Math.PI/4) * SUBTOPIC_RADIUS)))
      .attr('cy', (data, i) => (data.type==='TOPIC' ? (TOPIC_RADIUS + i * NODES_DISTANCE - Math.cos(Math.PI/4) * TOPIC_RADIUS) : (TOPIC_RADIUS + i * NODES_DISTANCE - Math.sin(Math.PI/4)  * SUBTOPIC_RADIUS)))
      .attr('fill', (data) => (data.questions.length===0 ? 'none' : QUESTION_COUNT_COLOR))
    questions_count.exit().remove();
  }

  // helper function needed in renderD3()
  renderD3Line(data){
    // renderD3s the gray line connecting all the nodes
    var line = this.svg.selectAll('line');
    line.attr('y2', TOPIC_RADIUS + (data.length - 1) * NODES_DISTANCE)
  }

  // helper function needed in renderD3()
  renderD3Text(data){
    var self = this;
    //renderD3 description of topic next to the topic nodes
    var topic_name = this.svg.selectAll('.topic_name').data(data);
    topic_name.enter().append('text')
      .attr('x', TOPIC_RADIUS*2 + 10) //50 is margin between text and node
    topic_name
      .attr('class', 'topic_name')
      .attr('y', (data, i) => (TOPIC_RADIUS + i * NODES_DISTANCE))
      .text(d=>d.description)
      // .on('click', function(d, i){
      //   alert('You clicked on' + d.description);
      // })

    topic_name.exit().remove();

    // renderD3s the white number that's showing the number of questions inside the blue circle
    var question_number = this.svg.selectAll('.question_number').data(data);
    question_number.enter().append('text')
      .attr('fill', 'white');
    // for hardcoding the position of the number to be at the center of circle
    var x_offset = 0;
    var y_offset = 5;
    question_number
      .attr('class', 'question_number')
      .attr('x', (data) => (data.type==='TOPIC' ? (TOPIC_RADIUS + Math.cos(Math.PI/4) * TOPIC_RADIUS + x_offset) : (TOPIC_RADIUS + Math.cos(Math.PI/4) * SUBTOPIC_RADIUS + x_offset)))
      .attr('y', (data, i) => (data.type==='TOPIC' ? (TOPIC_RADIUS + i * NODES_DISTANCE - Math.cos(Math.PI/4) * TOPIC_RADIUS + y_offset) : (TOPIC_RADIUS + i * NODES_DISTANCE - Math.sin(Math.PI/4)  * SUBTOPIC_RADIUS + y_offset)))
      .attr('text-anchor', 'middle')
      .text(data=>(data.questions.length===0 ? '' : data.questions.length))
    question_number.exit().remove();

    // draw transparent rectangle on top of text for links
    var links = this.svg.selectAll('.links').data(data);

    links.enter().append('a')
      .attr('xlink:href', '#nav')

    var y_offset = -25;

    links
      .append("rect")
      .attr('x', TOPIC_RADIUS*2 + 10)
      .attr('y', (data, i) => (TOPIC_RADIUS + i * NODES_DISTANCE + y_offset))
      .attr('fill', 'rgba(0,0,0,0)')
      .attr('width', '390')
      .attr('height', '40')
      .on('click', function(d, i){
        // alert('You clicked on' + d.description);
        self.props.nodeClicked(d,i);
      })

    links.exit().remove();
  }

  renderD3(data){
      this.renderD3Line(data);
      this.renderD3Nodes(data);
      this.renderD3Text(data);
  }

  // function for lightening / darkening HEX color code
  // @param: color: #RRGGBB, percent: -1.0 to +1.0
  shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }

  shouldComponentUpdate() {
    return false; // This prevents future re-renders of this component
  }

  componentDidMount(){
    var svg_height = (this.props.allNodes.length -1) * NODES_DISTANCE + 2 * TOPIC_RADIUS;
    this.svg
      .attr('width', 400)
      .attr('height', svg_height)

    var line = this.svg.append('line')
      .attr('x1', TOPIC_RADIUS)
      .attr('y1', TOPIC_RADIUS)
      .attr('x2', TOPIC_RADIUS)
      .attr('stroke', 'gray')
      .attr('stroke-width', '3')

    this.renderD3(this.props.allNodes);
  }

  render(){
    return(
        <svg ref={(elem) => { this.svg = d3.select(elem); }} />
    )
  }
}
