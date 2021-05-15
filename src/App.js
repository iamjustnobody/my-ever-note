import logo from './logo.svg';
import './App.css';
import React from 'react';
import SidebarComponent from './sidebar/sidebar'; //NOT import {SidebarComponent}
//import {EditorComponent} from './editor/editor';//this.props.classes wil be undefined in editorJs
import EditorComponent from "./editor/editor";

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
    firebase.default.firestore().collection("everNotes")
        .orderBy('createdTimestamp')
        .onSnapshot(
        serverUpdate=>{
          const updatedNotes=serverUpdate.docs.map(
              _doc=>{
                const data=_doc.data();
                data['id']=_doc.id;
                return data;
              }
          );
          console.log(updatedNotes); //however updatedNotes from firestore will be re-ordered based on ??;
            //different order of array elements compared to new allnotes array in addANote fn
          this.setState({allnotes:updatedNotes});
        }
    )
  }
  addANote= async (n)=>{

      await this.setState({allnotes:[...this.state.allnotes,n],});
      //await this.setState(prevState => ({allnotes:[...prevState.allnotes,n],}));
      //  await this.setState(prevState => {console.log('prevnotes',prevState.allnotes); return ({allnotes:[...prevState.allnotes,n],})});
      console.log('allnewnotes',this.state.allnotes)

      //db
      const newFromDB = await firebase.default
          .firestore()
          .collection('everNotes')
          .add({
              title: n.title,
              body: n.body,
              createdTimestamp: firebase.default.firestore.FieldValue.serverTimestamp()
          });
      const newID = newFromDB.id;
//after add to firebase above, onsnapchange in componentdidmount will be called (allnotes set state with allupdatednotes (incl newnote) in db)
      //so if setstate(allnotes) placed after newffromdb (not b4 newfromdb as its now) then allnotes.length+1 as allnotes incl two/dup newnotes which will then be merged to one ele
      // so size returned to allnotes.length
      const newNoteIndex = this.state.allnotes.indexOf(this.state.allnotes.filter(_note => _note.id === newID)[0]);
       console.log('newnoteidindex ',newID,newNoteIndex,this.state.selectedNodeIndex)
      await this.setState({ selectedNodeIndex: newNoteIndex});
       console.log('lala',this.state.selectedNodeIndex)
  }
  updateNote = async (n,i) => {
      await this.setState(this.state.allnotes.map((_note,index)=>{
          if(index===i){ //i is index
          //if(_note.id===i){// if is is noteid passed onto i here from editor js
              return n;
          }
          return _note;
      }));
      firebase.default
          .firestore()
          .collection('everNotes')
          //.doc(this.state.allnotes[this.state.selectedNodeIndex].id)
          .doc(this.state.allnotes[i].id)//i is index
          //.doc(i)//i if noteid passed onto i here
          .update({
              title: n.title,
              body: n.body,
              updatedTimestamp: firebase.default.firestore.FieldValue.serverTimestamp()
          }); //doc(id) //doc(this.state.selectedNodeIndex)
  }
  changeSelectedNodeIndex = async(_index) =>{
      await this.setState({selectedNodeIndex:_index,});
      console.log(_index,this.state.selectedNodeIndex,this.state.allnotes[this.state.selectedNodeIndex]);
      //this.state.allnotes[_index]
  }

  deleteANote = async (n) =>{
      const nindex=this.state.allnotes.indexOf(n)
      if(this.state.allnotes.length==1){this.setState({selectedNodeIndex:null})}
      else if(this.state.selectedNodeIndex!=null&&this.state.selectedNodeIndex==nindex){//there's one note selected (none unselected) & remove selected
          if(nindex==this.state.allnotes.length-1){this.setState({selectedNodeIndex:nindex-1})} //move forward
          else{this.setState({selectedNodeIndex:nindex})} //select next one but not nindex+1 still nindex;
          // as following ones will all be reindex-1
      }
      else if(this.state.selectedNodeIndex!=null&&this.state.selectedNodeIndex>nindex) {
          this.setState({selectedNodeIndex:this.state.selectedNodeIndex-1})
      }
    //set index state could be placed b4 or after set allnotes state
      await this.setState({ allnotes: this.state.allnotes.filter(_note => _note.id !== n.id) });
      //await this.setState({ allnotes: this.state.allnotes.filter(_note => _note !== n) });
      //await this.setState({ allnotes: this.state.allnotes.filter((_note,_index) => _index !== nindex) });
    console.log('deletenote ',nindex,this.state.selectedNodeIndex)

      firebase.default
          .firestore()
          .collection('everNotes')
          .doc(n.id)
          .delete();

  }
}

export default App;
