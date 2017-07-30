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
      label="Cancel"
      primary={true}
      onClick={() => this.handleClose()}
    />,
    <FlatButton
      label="Create"
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
        <div onClick={this.handleOpen.bind(this)} className="btn">Add a new Topic</div>
        <Dialog
          title="Create a new topic"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}>
          <div className="input-field col s12">
  <select>
    <option value="" disabled defaultValue>Choose your option</option>
    <option value="1">Topic</option>
    <option value="2">Sub-Topic</option>
  </select>
</div>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                  <input id="coure" type="text" className="validate" onChange={(e)=> this.updateCourse(e)}/>
                  <label htmlFor="coure">Topic Title</label>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s10 offset-s1">
                <div onClick={(e)=> this.redirect(e)} className="btn signup-button">Create</div>
                </div>
              </div>
            </form>
          </div>
        </Dialog>
        <div className="canvas-container">
          <h2>The shareable code is: {this.props.shareableCode}</h2>
          <VoiceRecorder />
          <Canvas socket={this.props.socket}/>
        </div>
      </div>
    )
  }
}
