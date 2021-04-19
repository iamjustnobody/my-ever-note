
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helper';
import styles from "./sidebar-item-style";
import {Divider} from "@material-ui/core";

class SidebaritemComponent extends React.Component{


    render(){
        return (
            <div>
                <div onClick={() => {
                    this.props.changeKey(this.props.index)
                }}>
                    <div>{this.props.note.title}</div>
                    <div>{this.props.note.body}</div>
                </div>
                <button onClick={this.props.deleteNote}>delete this note</button>
                <Divider></Divider>
            </div>
        );
    }

}

export default withStyles(styles)(SidebaritemComponent);