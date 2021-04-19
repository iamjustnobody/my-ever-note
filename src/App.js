import logo from './logo.svg';
import './App.css';
import React from 'react';
import {SidebarComponent} from './sidebar/sidebar';
import {EditorComponent} from './editor/editor';

const firebase =require('firebase');
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      allnotes:null,
      selectedNodeIndex:null,
    }; //selectedNote
  }
  render(){ console.log("hehe",this.state.selectedNodeIndex);
      if(this.state.selectedNodeIndex!=null) {
          return (
              <div className='app-container'>
                  <SidebarComponent notes={this.state.allnotes} addANote={this.addANote}
                                    selectedIndex={this.state.selectedNodeIndex}
                                    changeIndex={this.changeSelectedNodeIndex} deleteANote={this.deleteANote}/>

                  <EditorComponent notes={this.state.allnotes} selectedIndex={this.state.selectedNodeIndex}
                                   updateNote={this.updateNote}/>

              </div>
          );////{this.props.selectedNote}
      }else{
          return (
              <div className='app-container'>
                  <SidebarComponent notes={this.state.allnotes} addANote={this.addANote}
                                    selectedIndex={this.state.selectedNodeIndex}
                                    changeIndex={this.changeSelectedNodeIndex} deleteANote={this.deleteANote}/>
              </div>
          );
      }
  }
  componentDidMount = () =>{
    firebase.default.firestore().collection("everNotes").onSnapshot(
        serverUpdate=>{
          const updatedNotes=serverUpdate.docs.map(
              _doc=>{
                const data=_doc.data();
                data['id']=_doc.id;
                return data;
              }
          );
          console.log(updatedNotes);
          this.setState({allnotes:updatedNotes});
        }
    )
  }
  addANote= async (n)=>{
     // this.setState({allnotes:[...this.state.allnotes,n],});
      this.setState(prevState => ({allnotes:[...prevState.allnotes,n],}));
      //db
      const newFromDB = await firebase.default
          .firestore()
          .collection('everNotes')
          .add({
              title: n.title,
              body: n.body,
              timestamp: firebase.default.firestore.FieldValue.serverTimestamp()
          });
      const newID = newFromDB.id;
  //    await this.setState({ notes: [...this.state.notes, note] });
      const newNoteIndex = this.state.allnotes.indexOf(this.state.allnotes.filter(_note => _note.id === newID)[0]);
       await this.setState({ selectedNoteIndex: newID });
  }
  updateNote = (n,i) => {
      this.setState(this.state.allnotes.map((_note,index)=>{
          if(index===i){
              return n;
          }
          return _note;
      }));
      firebase.default
          .firestore()
          .collection('everNotes')
          .doc(this.state.allnotes[this.state.selectedNodeIndex].id)
          .update({
              title: n.title,
              body: n.body,
              timestamp: firebase.default.firestore.FieldValue.serverTimestamp()
          }); //doc(id) //doc(this.state.selectedNodeIndex)
  }
  changeSelectedNodeIndex = async(_index) =>{
      await this.setState({selectedNodeIndex:_index,});
      console.log(_index,this.state.selectedNodeIndex,this.state.allnotes[this.state.selectedNodeIndex]);
      //this.state.allnotes[_index]
  }

  deleteANote =(n) =>{

  }
}

export default App;
