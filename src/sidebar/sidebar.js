
import React from 'react';
import {createMuiTheme, withStyles} from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebaritemComponent from '../sidebarItem/sidebar-item';
import styles from "./sidebar-style";
import ReactQuill from "react-quill";
import purple from "@material-ui/core/colors/purple";

export class SidebarComponent extends React.Component{


    constructor(props) {
        super(props);
        this.state={
            addNewNote:false,
            title:"",
        }
    }

    render() { //onClick={() => {this.props.changeIndex(_index)}} inside of SidebaritemComponent
        const { classes } = this.props;
        if(this.props.notes) {
        return <div className={classes.sidebarContainer}>
                <Button className={classes.newNoteBtn} onClick={() => {
                    this.setState(preState => ({addNewNote: !preState.addNewNote}))
                }}>{this.state.addNewNote?"Cancel":"Create a new note!"}
                </Button>
                {this.state.addNewNote==false?null:
                    <div>
                        <input type='text' className={classes.newNoteInput} placeholder='Enter note title'
                               onChange={(e) => {
                                   this.setState({title: e.target.value,})
                               }}/>
                        <Button className={classes.newNoteSubmitBtn} onClick={() => {
                            this.submitNewNote()
                        }}>Submit!
                        </Button>
                    </div>}
                {this.props.notes?(
                <List>
                    {this.props.notes.map((_note, _index) => {
                        return (<div key={_index}>
                            <SidebaritemComponent index={_index} selectedIndex={this.props.selectedIndex} note={_note}
                                                  changeKey={this.props.changeIndex} deleteNote={this.props.deleteANote}/>
                            <Divider></Divider>
                        </div>
                        );
                    })}
                </List>
                ):null}
            </div>
    }
        else
            return <div></div>
}
    submitNewNote =() =>{
        this.props.addANote({title:this.state.title,body:"",});
        this.setState({addNewNote:!this.state.addNewNote,}); //false
    }

}

export default withStyles(styles)(SidebarComponent);

//<div className={styles(createMuiTheme({palette: {background: {paper: purple[500],},},})).editorContainer}>
//className={styles(createMuiTheme({palette: {background: {paper: purple[500],},},})).editorContainer}

/*
if(this.props.notes) {
        return this.state.addNewNote === false ?
            (<div className={classes.sidebarContainer}>
                <Button className={classes.newNoteBtn} onClick={() => {
                    this.setState(preState => ({addNewNote: !preState.addNewNote}))
                }}>create a new note
                </Button>
                {this.props.notes?(
                <List>
                    {this.props.notes.map((_note, _index) => {
                        return (<div key={_index}>
                            <SidebaritemComponent index={_index} selectedIndex={this.props.selectedIndex} note={_note}
                                                  changeKey={this.props.changeIndex} deleteNote={this.props.deleteANote}/>
                            <Divider></Divider>
                        </div>
                        );
                    })}
                </List>
                ):null}
            </div>)
            : (<div
                className={classes.sidebarContainer}>
                <Button className={classes.newNoteBtn} onClick={() => {
                    this.setState(preState => ({addNewNote: !preState.addNewNote}))
                }}>cancle
                </Button>
                <input type='text' className={classes.newNoteInput} placeholder='Enter note title'
                       onChange={(e) => {
                    this.setState({title: e.target.value,})
                }}/>
                <Button className={classes.newNoteSubmitBtn} onClick={() => {
                    this.submitNewNote()
                }}>submit
                </Button>
            </div>);
    }
        else
            return <div></div>
 */