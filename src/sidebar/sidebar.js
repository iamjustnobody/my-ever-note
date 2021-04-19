
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
        if(this.props.notes) {
        return this.state.addNewNote === false ?
            (<div className={styles(createMuiTheme({palette: {background: {paper: purple[500],},},})).editorContainer}>
                <div onClick={() => {
                    this.setState(preState => ({addNewNote: !preState.addNewNote}))
                }}>create a new note
                </div>
                {this.props.notes?(
                <div>
                    {this.props.notes.map((_note, _index) => {
                        return (<div key={_index}>
                            <SidebaritemComponent index={_index} selectedIndex={this.props.selectedIndex} note={_note}
                                                  changeKey={this.props.changeIndex} deleteNote={this.props.deleteANote}/>
                        </div>
                        );
                    })}
                </div>
                ):null}
            </div>)
            : (<div
                className={styles(createMuiTheme({palette: {background: {paper: purple[500],},},})).editorContainer}>
                <div onClick={() => {
                    this.setState(preState => ({addNewNote: !preState.addNewNote}))
                }}>cancle
                </div>
                <input placeholder="please enter..." onChange={(e) => {
                    this.setState({title: e.target.value,})
                }}/>
                <div onClick={() => {
                    this.submitNewNote()
                }}>submit
                </div>
            </div>);
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