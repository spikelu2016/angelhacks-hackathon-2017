import React from 'react'
import ProfessorQuestionsContainer from './professorQuestionsContainer'
import axios from 'axios'
import D3Nodes from '../components/d3nodes.js'
import VoiceRecorder from '../components/VoiceRecorder'
import Canvas from '../components/Canvas'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class ProfessorNodeContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allQuestions: {},
      questionsArr: [],
      topic: "",
      nodeId: "",
      open: false,
    }

    this.props.socket.on('newQuestionAdded', (data) => {
      const originalAllQuestions = this.state.allQuestions;
      originalAllQuestions[data.topic].push(data)
      this.setState({
        allQuestions: originalAllQuestions
      })
    })
  }

  handleOpen()  {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  componentDidMount() {
    const originalAllQuestions = this.state.allQuestions;
    for(let i = 0;  i < this.props.allNodes.length; i++){
      originalAllQuestions[this.props.allNodes[i].description] = this.props.allNodes[i].questions;
    }
    this.setState({
      allQuestions: originalAllQuestions
    })
  }

  nodeClicked(topic, index, nodeId) {
    const questionsArr = this.props.allNodes[index].questions;
    this.setState({
      questionsArr: questionsArr,
      topic: topic,
      nodeId: nodeId
    })
  }

  render() {
    const actions = [
     <FlatButton
       label="Close"
       primary={true}
       keyboardFocused={true}
       onClick={() => this.handleClose()}
     />,
   ];
    return(
      <div>
        <div className="node-container">

          <div className="card-row-1 student-card card-panel  white  card-panel-node">
            {/* {this.props.allNodes.map((item, index) => (
              <div><a href="#nav" key={index}  onClick={() => this.nodeClicked(item.description, index, item._id)}>{item.description}</a></div>))} */}
              <D3Nodes allNodes={this.props.allNodes} nodeClicked={(item, index)=>this.nodeClicked(item.description, index, item._id)} />
          </div>
      </div>
        <ProfessorQuestionsContainer className="StudentQuestionsContainer" socket={this.props.socket} questionsArr={this.state.questionsArr} topic={this.state.topic} nodeId={this.state.nodeId}/>

        <div className="canvas-container">
          <VoiceRecorder />
          <Canvas socket={this.props.socket}/>
          <RaisedButton id="getCode" label="Get Code" onClick={()=>this.handleOpen()} />
        <Dialog
          title=""
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={()=>this.handleClose()}
        >
          <h2>The shareable code is: {this.props.shareableCode}</h2></Dialog>
        </div>
      </div>
    )
  }
}
