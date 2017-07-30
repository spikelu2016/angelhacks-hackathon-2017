import React from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

const NODES_COLOR = '#88D8B0';
const NODES_ON_HOVER_COLOR = '#00FF00';

const DANGER_COLOR = '#EF623B';
// const DANGER_COLOR = '#FF6B6B';

const WARNING_COLOR = '#F8C633';
// const NEUTRAL_COLOR = '#88D8B0';
const NEUTRAL_COLOR = '#26A69A';

const QUESTION_COUNT_COLOR = '#02a8f3';

const TOPIC_RADIUS = 50;
const SUBTOPIC_RADIUS = 25;

const NODES_DISTANCE = 150;

const TOPIC_QUESTION_COUNT_RADIUS = 15;
const SUBTOPIC_QUESTION_COUNT_RADIUS = 12;

const X_OFFSET = 5;
const Y_OFFSET = 5;

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
      .attr('cx', TOPIC_RADIUS + X_OFFSET)
      .attr('stroke-width', '5')
      .attr('fill', 'white')
    nodes
      .attr('class', 'node')
      .attr('cy', (data, i) => (TOPIC_RADIUS + i * NODES_DISTANCE + Y_OFFSET))
      .attr('r', (data) => (data.type==='TOPIC' ? TOPIC_RADIUS : SUBTOPIC_RADIUS))
      .attr('stroke', (data) => { //changed from fill
        if(data.upvotes >= data.downvotes){
          return NEUTRAL_COLOR;
        } else if(data.downvotes - data.upvotes < 5){
          return WARNING_COLOR;
        } else {
          return DANGER_COLOR;
        }
      })
      .on('click', function(d, i){
        alert('You clicked on node no.' + i);
      })
    nodes.exit().remove();
    if(this.props.studentView){
      console.log('hit this');
      // render top half of circle for upvoting
      var lower_half_circle = this.svg.selectAll('.lower_half_circle').data(data);

      lower_half_circle.enter().append('path')
        .attr('fill', 'rgba(0,0,0,0)')

      lower_half_circle
        .attr('d', (data, i) => {
          var start_x = 0
          var end_x = 100;
          if(data.type==='SUBTOPIC'){
            start_x = TOPIC_RADIUS - SUBTOPIC_RADIUS;
            end_x = 50
          }
          return 'M' + String(start_x + X_OFFSET) + ',' + String(Y_OFFSET + 50 + 150 * i) + ' a1,1 0 0,0' + String(end_x) + ',0 Z';
        })
        .on('mouseover', function(d, i){
          d3.select(this)
            .attr('fill', 'rgba(239, 98, 59, 0.5)')
        })
        .on('mouseout', function(d, i){
          d3.select(this)
            .attr('fill', 'rgba(0,0,0,0)')
        })
        .on('click', function(d, i){
          self.props.socket.emit('downvote', {
            nodeId: d._id
          });
        })
      lower_half_circle.exit().remove();

      // UPPER HALF CIRCLE
      var upper_half_circle = this.svg.selectAll('.upper_half_circle').data(data);

      upper_half_circle.enter().append('path')
        // .attr('fill', 'rgba(255,255,255,0.5)')
        .attr('fill', 'rgba(0,0,0,0)')

      upper_half_circle
        .attr('d', (data, i) => {
          var start_x = 0
          var end_x = 100;
          if(data.type==='SUBTOPIC'){
            start_x = TOPIC_RADIUS - SUBTOPIC_RADIUS;
            end_x = 50
          }
          return 'M' + String(start_x + X_OFFSET) + ',' + String(Y_OFFSET + 50 + 150 * i) + ' a1,1 0 0,1' + String(end_x) + ',0 Z';
        })
        .on('mouseover', function(d, i){
          d3.select(this)
            // .attr('fill', 'rgba(255,255,255,0.7)')
            .attr('fill', 'rgba(38, 166, 154, 0.5)')
        })
        .on('mouseout', function(d, i){
          d3.select(this)
            // .attr('fill', 'rgba(255,255,255,0.5)')
            .attr('fill', 'rgba(0,0,0,0)')
        })
        .on('click', function(d, i){
          self.props.socket.emit('upvote', {
            nodeId: d._id
          });
        })
      upper_half_circle.exit().remove();
    }

    // renderD3 questions count (blue circles on top right)
    var questions_count = this.svg.selectAll('.questions_count').data(data);
    questions_count.enter().append('circle')

    questions_count
      .attr('class', 'questions_count')
      .attr('r', (data) => (data.type==='TOPIC' ? TOPIC_QUESTION_COUNT_RADIUS : SUBTOPIC_QUESTION_COUNT_RADIUS))
      .attr('cx', (data) => (data.type==='TOPIC' ? (TOPIC_RADIUS + Math.cos(Math.PI/4) * TOPIC_RADIUS + X_OFFSET) : (TOPIC_RADIUS + Math.cos(Math.PI/4) * SUBTOPIC_RADIUS + X_OFFSET)))
      .attr('cy', (data, i) => (data.type==='TOPIC' ? (Y_OFFSET + TOPIC_RADIUS + i * NODES_DISTANCE - Math.cos(Math.PI/4) * TOPIC_RADIUS) : (Y_OFFSET + TOPIC_RADIUS + i * NODES_DISTANCE - Math.sin(Math.PI/4)  * SUBTOPIC_RADIUS)))
      .attr('fill', (data) => (data.questions.length===0 ? 'none' : QUESTION_COUNT_COLOR))

    questions_count.exit().remove();
    if(this.props.studentView){
      // render up arrow
      var up_arrow = this.svg.selectAll('.up_arrow').data(data);
      up_arrow.enter().append('path')
        .attr('d', `M11.4,5.4L6,0C5.9-0.1,5.8-0.1,5.8-0.1c-0.1,0-0.2,0-0.2,0.1
          L0.1,5.4C0,5.6,0,5.7,0.1,5.9l0.4,0.4c0.1,0.1,0.3,0.1,0.4,0l4.8-4.8l4.8,4.8c0.1,0.1,0.3,0.1,0.4,0l0.4-0.4
          C11.5,5.7,11.5,5.6,11.4,5.4z`)
        .attr('fill', 'gray')
        .attr('pointer-events', 'none')

      up_arrow
        .attr('transform', (d,i)=>{
          var x_translate = TOPIC_RADIUS - 12 + X_OFFSET;
          var y_translate = TOPIC_RADIUS + 150 * i - 23 + Y_OFFSET;
          var scale = 2;
          if(d.type==='SUBTOPIC'){
            scale = 1.3;
              x_translate = TOPIC_RADIUS - 7 + X_OFFSET;
              y_translate = TOPIC_RADIUS + 150 * i - 12 + Y_OFFSET;
          }

          return `translate(${x_translate},${y_translate}) scale(${scale})`
        })

        // render down arrow
        var down_arrow = this.svg.selectAll('.down_arrow').data(data);
        down_arrow.enter().append('path')
          .attr('d', `M0.1,0.9l5.4,5.4c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1
  	         l5.4-5.4c0.1-0.1,0.1-0.3,0-0.4L11,0c-0.1-0.1-0.3-0.1-0.4,0L5.8,4.8L0.9,0C0.8-0.1,0.6-0.1,0.5,0L0.1,0.4C0,0.6,0,0.7,0.1,0.9z`)
          .attr('fill', 'gray')
          .attr('pointer-events', 'none')

        down_arrow
          .attr('transform', (d,i)=>{
            var x_translate = TOPIC_RADIUS - 12 + X_OFFSET;
            var y_translate = TOPIC_RADIUS + 150 * i + 10 + Y_OFFSET;
            var scale = 2;
            if(d.type==='SUBTOPIC'){
              scale = 1.3;
                x_translate = TOPIC_RADIUS - 7 + X_OFFSET;
                y_translate = TOPIC_RADIUS + 150 * i + 5 + Y_OFFSET;
            }
            return `translate(${x_translate},${y_translate}) scale(${scale})`
          })
    }

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
      .attr('x', TOPIC_RADIUS*2 + 10 + X_OFFSET) //50 is margin between text and node
    topic_name
      .attr('class', 'topic_name')
      .attr('y', (data, i) => (TOPIC_RADIUS + i * NODES_DISTANCE + Y_OFFSET))
      .text(d=>(`${d.description}`))

    topic_name.exit().remove();

    var votes = this.svg.selectAll('.votes').data(data);
    votes.enter().append('text')
      .attr('x', TOPIC_RADIUS*2 + 10 + X_OFFSET) //50 is margin between text and node
      .attr('fill', 'gray')
    votes
      .attr('class', 'votes')
      .attr('y', (data, i) => (TOPIC_RADIUS + i * NODES_DISTANCE + 25 + Y_OFFSET))
      .text(d=>(`I got it: ${d.upvotes} I don't understand: ${d.downvotes}`))

    votes.exit().remove();

    // renderD3s the white number that's showing the number of questions inside the blue circle
    var question_number = this.svg.selectAll('.question_number').data(data);
    question_number.enter().append('text')
      .attr('fill', 'white');
    // for hardcoding the position of the number to be at the center of circle
    var x_offset = 0 + X_OFFSET;
    var y_offset = 5 + Y_OFFSET;
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

  // shouldComponentUpdate() {
  //   return false; // This prevents future re-renders of this component
  // }

  componentDidUpdate(){
    console.log('did update');
    this.renderD3(this.props.allNodes);
  }

  componentDidMount(){
    var svg_height = (this.props.allNodes.length -1) * NODES_DISTANCE + 2 * TOPIC_RADIUS + 5 + Y_OFFSET;
    this.svg
      .attr('width', 400)
      .attr('height', svg_height)

    var line = this.svg.append('line')
      .attr('x1', TOPIC_RADIUS + X_OFFSET)
      .attr('y1', TOPIC_RADIUS)
      .attr('x2', TOPIC_RADIUS + X_OFFSET)
      .attr('stroke', 'gray')
      .attr('stroke-width', '3')

    // var use = this.svg.append('use')
    //   .attr('xlink:href', '.questions_count')

    this.renderD3(this.props.allNodes);
  }

  render(){
    return(
      <div>
        <svg ref={(elem) => { this.svg = d3.select(elem); }} />
      </div>
    )
  }
}
