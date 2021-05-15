
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helper';
import styles from "./sidebar-item-style";
import {Divider} from "@material-ui/core";

class SidebaritemComponent extends React.Component{

    removeNote=()=>{
        console.log('removeindex ',this.props.index);
        if(window.confirm(`Are you sure you want to delete: ${this.props.note.title}`))
            this.props.deleteNote(this.props.note)
    }

    render(){
        return (
            <div key={this.props.index}>
                <ListItem className={this.props.classes.listItem} alignItems='flex-start'
                          selected={this.props.selectedIndex===this.props.index}>
                    <div className={this.props.classes.textSection}
                        onClick={() => {console.log("hihi");this.props.changeKey(this.props.index)}}>
                        <ListItemText primary={this.props.note.title}
                            secondary={removeHTMLTags(this.props.note.body.substring(0, 30)) + '...'}></ListItemText>
                    </div>
                    <DeleteIcon className={this.props.classes.deleteIcon}
                                onClick={this.removeNote}>
                    </DeleteIcon>
                </ListItem>
            </div>
        );
    }

}

export default withStyles(styles)(SidebaritemComponent);
//onClick={this.props.deleteNote}>
/*
<div>
                <div onClick={() => {
                    this.props.changeKey(this.props.index)
                }}>
                    <div>{this.props.note.title}</div>
                    <div>{this.props.note.body}</div>
                </div>
                <div onClick={this.props.deleteNote}>delete this note</div>
                <Divider></Divider>
            </div>
 */