import React from 'react';
import  Modal, {ModalBody, ModalHeader} from '../../components/modal/modal.component';
import {Button} from '../../components/button/button.component'
import EdiText from 'react-editext';
import Sidebar from '../../components/sidebar/sidebar.component';
import { BiCheck, BiX, BiPlus } from "react-icons/bi";
import '../notes/notes.scss';
import CardSmall from '../../components/card-small/card-small.component';



class Notes extends React.Component {

  state = {
    notesItem:[],
    open: false,
    openNum: -1,
    inputLength: -1,
    noteComplete: false
}

tempNote = {};

//push dummy skeleton object for onClick New Note
onNoteClick = () => {
 this.tempNote = {
    name:"",
    data:""
  }

  this.setState({openNum: -1})
}

onOpenModal = () => {
  this.setState({ open: true});
}

onCloseModal = () => {
  this.setState({ open: false});
}

onSaveName = (e) => {

    let tempItem;

    if(this.state.openNum === -1){
    this.tempNote.name = e;
    tempItem =  JSON.parse(JSON.stringify(this.state.notesItem));
    console.log(tempItem === this.state.notesItem)
    tempItem = [...tempItem, this.tempNote];
    }
    else{
    tempItem =  [...this.state.notesItem]; //deep copy
    tempItem[this.state.openNum].name = e;
    tempItem = [...tempItem];

    }

    if(this.state.noteComplete)
      this.setState({ notesItem: tempItem, noteComplete: !this.state.noteComplete})
    else 
      this.setState({ noteComplete: !this.state.noteComplete})
}

onSaveText = (e) => {

  let tempItem;

    if(this.state.openNum === -1){
    this.tempNote.data = e;
    tempItem =  JSON.parse(JSON.stringify(this.state.notesItem));
    console.log(tempItem === this.state.notesItem)
    tempItem = [...tempItem, this.tempNote];
    }
    else{
    tempItem =  JSON.parse(JSON.stringify(this.state.notesItem)); //deep copy
    tempItem[this.state.openNum].data = e;
    tempItem = [...tempItem];
    }

  if(this.state.noteComplete)
    this.setState({ notesItem: tempItem, noteComplete: !this.state.noteComplete})
  else 
    this.setState({ noteComplete: !this.state.noteComplete})
}

onCancel = () => {
  this.setState({open:false})
}

onCardSmallClick = (e) => {

  const num = parseInt(e.target.getAttribute('value'));
  this.setState({openNum:num, open: true});
}

  render() {
    const notesItem = this.state.notesItem;
    return (
      <div className="notes-container-main">
      <div className="notes-container">
      <CardSmall onClick={this.onCardSmallClick} notesItem={notesItem}/>
      <div className='btn-sidebar-container'>
      <Button
        onClick={async() => {await this.onNoteClick();await this.onOpenModal()}}
        type="button"
        buttonStyle="btn--danger--solid"
        buttonSize="btn--medium"
      >
       <BiPlus /> New Note
      </Button>
      </div>
      <Sidebar />
    </div>

    <Modal show={this.state.open} setShow={this.onCloseModal}>
    <ModalHeader>
        { this.state.openNum === -1 ? "New Note" : notesItem[this.state.openNum].name
        }
    </ModalHeader>
    <ModalBody>
        <div className="notes-modal-container">
                        <div className="notes-inner-middle">
                        Note Name:
                        <EdiText
                            type='text'
                            setValue={25454}
                            value={this.state.openNum === -1 ? "" : notesItem[this.state.openNum].name}
                            onSave={this.onSaveName}
                            editing={this.state.open}
                            validationMessage="Please provide a name."
                            validation={val => val.length >= 1}
                            editButtonClassName={this.state.inputLength ? "custom-edit-button" : 'error'}
                            editContainerClassName="custom-edit-view-container"
                            saveButtonClassName='custom-edit-save-button'
                            saveButtonContent={<BiCheck style={{color: 'green'}}/>}
                            cancelButtonContent={<BiX style={{color: 'red'}}/>}
                            cancelButtonClassName='custom-edit-cancel-button'
                            inputProps={{placeholder: "Enter name"}}
                            onCancel={this.onCancel}
                        />
                        Note Content:
                        <EdiText
                            type='textarea'
                            setValue={5454}
                            value={this.state.openNum === -1 ? "" : notesItem[this.state.openNum].data}
                            onSave={this.onSaveText}
                            editing={this.state.open}
                            validationMessage="Please type at least 3 characters."
                            validation={val => val.length >= 3}
                            editButtonClassName="custom-edit-button"
                            viewContainerClassName="custom-edit-view-container"
                            saveButtonClassName='custom-edit-save-button'
                            saveButtonContent={<BiCheck style={{color: 'green'}}/>}
                            cancelButtonContent={<BiX style={{color: 'red'}}/>}
                            cancelButtonClassName='custom-edit-cancel-button'
                            inputProps={{placeholder: "Enter content",  rows: 5}}
                            onCancel={this.onCancel}
                        />
                    </div>
        </div>
   
    </ModalBody>
    </Modal>
    </div>
    )
  }
}

export default Notes;