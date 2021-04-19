import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helper';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import styles from "./editor-style";
import {Edit} from "@material-ui/icons";
import PropTypes from 'prop-types';
import purple from "@material-ui/core/colors/purple";


export class EditorComponent extends React.Component{
constructor(props) {
    super(props);
    console.log(this);
    this.state={
        title:"",
        content:"",
        id:"",
    } //id
}

    componentDidMount = () => {
        this.setState({
            title: this.props.notes[this.props.selectedIndex].title,
            content: this.props.notes[this.props.selectedIndex].body,
            id:this.props.notes[this.props.selectedIndex].id,
        });
    }
    componentDidUpdate = () => {
        if(this.state.id!==this.props.notes[this.props.selectedIndex].id) { //if(this.state.id!==this.props.selectedIndex) {
        this.setState({
            title: this.props.notes[this.props.selectedIndex].title,
            content: this.props.notes[this.props.selectedIndex].body,
            id: this.props.notes[this.props.selectedIndex].id,
        });
    }
    }//use id to check selectednote.id; and componentdidupdate to update id
    // as to / follow selectednote.id as we have updated selectedindex but selectedindex not inside render in edit.js
    render(){
 //   const {classes}=this.props; //<input value={this.state.title} //<ReactQuill value={this.state.content}
        //<input value={this.props.notes[this.props.selectedIndex].title} //<ReactQuill value={this.props.notes[this.props.selectedIndex].body}
        //so componentdidmount
        return (
            <div className={styles(createMuiTheme({palette:{background:{paper:purple[500],},},})).editorContainer}>
                <input value={this.state.title} onChange={(e)=>{this.updateContent(e.target.value,this.state.content);}}  placeholder="enter your title..."/>
                <ReactQuill value={this.state.content} onChange={(e)=>{this.updateContent(this.state.title,e);}}>

                </ReactQuill>
            </div>
        ); //{this.props.selectedNote} //{this.props.notes.filter(_id => _id===this.props.selectedIndex).body}
    }

    updateContent = async (subject,text) =>{
    await this.setState({title:subject,content:text,});
    this.updateDB();
  //  this.props.updateNote({title:this.state.title,body:this.state.content},this.props.selectedIndex);
    //this.props.updateNote({title:subject,body:text},this.props.selectedIndex);//subject or text could be e.target.value
}
updateNotes=()=>{
    this.props.updateNote({title:this.state.title,body:this.state.content},this.props.selectedIndex);
}
    updateDB = debounce(()=>{console.log('updating db...');this.updateNotes();},1500);
  //  updateDB = debounce(this.updateNotes,1500);
}

EditorComponent.propTypes ={};

export default withStyles(styles,{withTheme:true})(EditorComponent);
