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
        title:'',//props.notes[this.props.selectedIndex].title,
        content:'',//this.props.notes[props.selectedIndex].body,
        id:'',//props.notes[this.props.selectedIndex].id,
        //props.notes[this.props.selectedIndex].id,//this.props.selectedIndex,
        // or w/o this (opt) here
        // as constructor's got all props already & constructor's THIS
    } //id
}

//diff: first click firsttime choose which note/index
  componentDidMount = () => {
      console.log('idindex when mount ',this.state.id,this.props.selectedIndex)
      if(this.props.selectedIndex!=null){console.log(this.props.notes[this.props.selectedIndex].id)}
      this.setState({
            title: this.props.notes[this.props.selectedIndex].title,
            content: this.props.notes[this.props.selectedIndex].body,
            id:this.props.notes[this.props.selectedIndex].id,
            //this.props.notes[this.props.selectedIndex].id, this.props.selectedIndex,
        });
    }
    componentDidUpdate = () => {
        console.log('idindex when update ',this.state.id,this.props.selectedIndex)
        if(this.props.selectedIndex!=null){console.log(this.props.notes[this.props.selectedIndex].id)}
        if(this.state.id!==this.props.notes[this.props.selectedIndex].id) {
            //if(this.state.id!==this.props.selectedIndex) {
                this.setState({
                    title: this.props.notes[this.props.selectedIndex].title,
                    content: this.props.notes[this.props.selectedIndex].body,
                    id: this.props.notes[this.props.selectedIndex].id,
                    //this.props.selectedIndex,this.props.notes[this.props.selectedIndex].id,
                });

        }
    }//use id to check selectednote.id; and componentdidupdate to update id
    // as to / follow selectednote.id as we have updated selectedindex but selectedindex not inside render in edit.js


    render(){
 //   const {classes}=this.props; //<input value={this.state.title} //<ReactQuill value={this.state.content}
        //<input value={this.props.notes[this.props.selectedIndex].title} //<ReactQuill value={this.props.notes[this.props.selectedIndex].body}
        //so componentdidmount
    /*    return (
            <div className={styles(createMuiTheme({palette:{background:{paper:purple[500],},},})).editorContainer}>
                <input value={this.state.title} onChange={(e)=>{this.updateContent(e.target.value,this.state.content);}}  placeholder="enter your title..."/>
                <ReactQuill value={this.state.content} onChange={(e)=>{this.updateContent(this.state.title,e);}}>

                </ReactQuill>
            </div>
        ); //{this.props.selectedNote} //{this.props.notes.filter(_id => _id===this.props.selectedIndex).body}
    */

        return (
        <div className={this.props.classes.editorContainer}>
            <BorderColorIcon className={this.props.classes.editIcon}></BorderColorIcon>
            <input className={this.props.classes.titleInput} placeholder='Note title...'
                   value={this.state.title ? this.state.title : ''}
                onChange={(e) => this.updateContent(e.target.value,this.props.notes[this.props.selectedIndex].body)}>
            </input>
            <ReactQuill value={this.state.content}
                        onChange={(e)=>{console.log("e",e);this.updateContent(this.props.notes[this.props.selectedIndex].title,e)}}>
            </ReactQuill>
        </div>
        )
    } //alternatively this.updateContent(e.target.value,this.state.content) this.updateContent(this.state.title,e
//value={this.state.title ? this.state.title : ''} //yes
    //value={this.state.content} //yes but better not to use belows
    //value={this.props.notes[this.props.selectedIndex].title}
    //value={this.props.notes[this.props.selectedIndex].body}
    ////value={this.props.notes[this.state.id].title}
    ////value={this.props.notes[this.state.id].body}

    updateContent = async (subject,text) =>{
        console.log('tt',subject,'tt2',this.state.title,'tt3',this.props.notes[this.props.selectedIndex].title)
        console.log('oo',text,'oo2',this.state.content,'oo3',this.props.notes[this.props.selectedIndex].body)
        await this.setState({title:subject,content:text,});
        this.updateDB();
        //  this.props.updateNote({title:this.state.title,body:this.state.content},this.props.selectedIndex);
        //this.props.updateNote({title:subject,body:text},this.props.selectedIndex);//subject or text could be e.target.value
    }
    updateNotes=async ()=>{ console.log('idindex ',this.state.id,this.props.selectedIndex)
        //await this.props.updateNote({title:this.state.title,body:this.state.content},this.props.selectedIndex);
        //await this.props.updateNote({title:this.state.title,body:this.state.content},this.state.id);//need componentdidupdate to update id when changing index/select
        //also need to change updateNote fn argument type in appJs as this is id whilst above & below are index
        await this.props.updateNote({title:this.state.title,body:this.state.content},
            this.props.notes.indexOf(this.props.notes.filter(_note=>_note.id===this.state.id)[0]));//need componentdidupdate to update id when changing index/select
        //await this.props.updateNote({title:this.state.title,body:this.state.content},
        //    this.props.notes.indexOf(this.props.notes.filter((_note,_index)=>_index===this.props.selectedIndex)[0]));

        //await this.setState({title:'',content:"",});
    }
    updateDB = debounce(()=>{console.log('updating db...');this.updateNotes();},1500);
  //  updateDB = debounce(this.updateNotes,1500);
}

//EditorComponent.propTypes ={};

export default withStyles(styles,{withTheme:true})(EditorComponent);
