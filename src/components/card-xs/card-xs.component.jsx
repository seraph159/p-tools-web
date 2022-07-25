import React, { Component } from 'react';
import "./card-xs.styles.scss";
import  Modal, {ModalBody, ModalHeader} from '../modal/modal.component';
import {Button} from '../button/button.component'
import EdiText from 'react-editext'
import { BiCheck, BiX, BiPlus } from "react-icons/bi";
import { v4 as uuid } from 'uuid';



class CardXS extends Component {

collectionItem;

constructor(props) {
  super(props)

  this.state = {
     
     open: false,
     openNum: 0,
     coListNum: 0,
     cardsNumber: 40,
     editingName: -1,
     editingLink: -1
    }
}


onOpenModal = (e) => {
    console.log(e.target.getAttribute('value'))
    this.setState({ open: true, openNum: e.target.getAttribute('value')});
}

onCloseModal = () => {
    this.setState({ open: false});
}


handleDelete = (e) => {
    const num = parseInt(e.target.getAttribute('value'));
    const newSet = this.collectionItem;
    let colSet = this.collectionItem;
    let len =  colSet[this.state.openNum].items.length-1;
    colSet = colSet[this.state.openNum].items.splice(num,1);

    console.log("length: " + newSet.length);

    
    if(len === 0){
        newSet.splice(this.state.openNum, 1);
        console.log("openNum: " + this.state.openNum)

        if(newSet.length === 0){
            console.log("iopenNum: " + this.state.openNum + "len " + newSet.length)
            this.props.handleColFull([])
            this.props.handleColEnable(false);
        } else if (this.state.openNum === "0"){
            this.props.handleColFull(newSet)
            this.setState((prevState, props)=> ({
            open: false}), 
            ()=>{ console.log(this.state.open)})
        }
        else{
            this.props.handleColFull(newSet)
            this.setState((prevState, props)=> ({
            open: false, 
            openNum: parseInt(prevState.openNum) - 1}), 
            ()=>{ console.log(this.state.open)})
    }}
    else {
        this.props.handleColFull(newSet)
    }

}

handleNewItem = (e) => {
    const colSet = this.collectionItem;
    const newKey = uuid();


    const len = this.collectionItem[this.state.openNum].items.length ;
    console.log("len " + len)
    const newSet = this.collectionItem[this.state.openNum].items.push({
        id: newKey,
        name: "",
        link: ""
      });
    

    this.props.handleColFull(colSet);
    

    this.setState({coListNum:len, editingLink: newKey, editingName: newKey});
}

onSaveName = (e) => {

    const colSet = this.collectionItem;
    const newSet = this.collectionItem[this.state.openNum].items[this.state.coListNum];

    console.log("this collistnum: " + this.state.coListNum)
    newSet.name = e;

    this.props.handleColFull(colSet);
    this.setState({editingName:-1});
}

onSaveLink = (e) => {

    const colSet = this.collectionItem;
    const newSet = this.collectionItem[this.state.openNum].items[this.state.coListNum];

    newSet.link = e;

    this.props.handleColFull(colSet);

    this.setState({editingLink:-1});
}

handleEdit = (e) => {
    this.setState({
        editingName:  e.target.getAttribute('data-key'),
        editingLink:  e.target.getAttribute('data-key'),
        coListNum: e.target.getAttribute('value')
    })
}

cardsNumberFunction = async () => {
    const screenWidth = await window.innerWidth;
    const screenHeight = await window.innerHeight;
    let screenValue = 30;
    
    if(screenWidth < 576){ //Mobile Screens extra small
        screenValue =  15; //10 cards
    } else if (screenWidth >= 576 && screenWidth < 768) { //small
        if(screenHeight < 550)
            screenValue =  10;
        else if(screenHeight < 670)
            screenValue =  20; //100 cards
        else if(screenHeight < 768)
            screenValue =  25;
        else if(screenHeight < 1090)
            screenValue =  30; 
    } else if (screenWidth >= 768 && screenWidth < 992) { //medium
        if(screenHeight < 550)
            screenValue =  10;
        else if(screenHeight < 670)
            screenValue =  20; //100 cards
        else if(screenHeight < 768)
            screenValue =  30;
        else if(screenHeight < 1090)
            screenValue =  40; 
    } else if (screenWidth >= 992 && screenWidth < 1200) { //large
        if(screenHeight < 550)
            screenValue =  22;
        else if(screenHeight < 670)
            screenValue =  33; //100 cards
        else if(screenHeight < 768)
            screenValue =  44;
        else if(screenHeight < 1090)
            screenValue =  55; //40 cards
    } else if (screenWidth >= 1200) { //extra-large
        if(screenHeight < 550)
            screenValue =  22;
        else if(screenHeight < 670)
            screenValue =  44; //100 cards
        else if(screenHeight < 768)
            screenValue =  55;
        else if(screenHeight < 1090)
            screenValue =  66;
    }


    if(this.state.cardsNumber !== screenValue){
     await this.setState((prevState, currentProps) => ({
        cardsNumber: screenValue
      }));

    }
}

componentDidUpdate(){
    console.log("updated !!")
    console.log("flagcolEnabel " + this.props.colEnable)
    console.log("flagcolList " + this.colList)
}

componentDidMount() { 

    window.addEventListener('resize', this.cardsNumberFunction);

}

componentWillUnmount() {
    
    window.removeEventListener('resize', this.cardsNumberFunction);
}

render() {

    const newSet = this.props.colFull;
    this.collectionItem = [...newSet]
    return (
    <>
    {
    (this.props.colEnable !== false) &&
    <div className="card-xs-main-container">

        {newSet.map((ele, idx) => {
        return(<div className="card-xs-container" key={idx}>
            <div className="card-xs-container-inner" onClick={this.onOpenModal} value={idx}>
            <div className="card-xs-body" value={idx}>
                {
                
                ele.items.slice(0, 4).map((ele1,idx2) =>{
                return (
                <div className="card-xs-inner" value={idx} key={idx2 * 5855}>
                    <div className="card-xs-inner-title" value={idx}>
                    {ele1.name.charAt(0).toUpperCase()}
                    </div>
                </div>)
                })
            }
            </div>
            
            <div className="card-xs-title" value={idx}>
                {ele.name}
            </div>
        </div>
      </div>
        )})}
    </div>}  
    {(this.props.colEnable !== false) &&
    <Modal show={this.state.open} setShow={this.onCloseModal}>
    <ModalHeader>
        {newSet[this.state.openNum].name}
    </ModalHeader>
    <ModalBody>
        <div className="colist-modal-container">
                    {
                    
                    newSet[this.state.openNum].items.map((ele1,idx) =>{
                    return (
                    <div className="colist-body">
                        <div className="colist-inner-title">
                        {ele1.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="colist-inner-middle">
                        <EdiText
                            type='text'
                            setValue={idx}
                            value={ele1.name}
                            onSave={this.onSaveName}
                            editing={this.state.editingName == ele1.id}
                            editButtonClassName="custom-edit-button"
                            editContainerClassName="custom-edit-view-container"
                            saveButtonClassName='custom-edit-save-button'
                            saveButtonContent={<BiCheck style={{color: 'green'}}/>}
                            cancelButtonContent={<BiX style={{color: 'red'}}/>}
                            cancelButtonClassName='custom-edit-cancel-button'
                            inputProps={{placeholder: "Enter name"}}
                            validationMessage="Please type at least 3 characters."
                            validation={val => val.length >= 3}
                        />
                        <EdiText
                            type='text'
                            setValue={idx}
                            value={ele1.link}
                            onSave={this.onSaveLink}
                            editing={this.state.editingLink == ele1.id }
                            editButtonClassName="custom-edit-button"
                            viewContainerClassName="custom-edit-view-container"
                            saveButtonClassName='custom-edit-save-button'
                            saveButtonContent={<BiCheck style={{color: 'green'}}/>}
                            cancelButtonContent={<BiX style={{color: 'red'}}/>}
                            cancelButtonClassName='custom-edit-cancel-button'
                            inputProps={{placeholder: "Enter link"}}
                            validationMessage="Please type at least 3 characters."
                            validation={val => val.length >= 3}
                        />
                        
                        {/* <span>{ele1.name}</span>
                        <div>{ele1.link}</div> */}
                        </div>
                        <div className="colist-inner-last">
                        <div className="edit-btn" data-key={ele1.id} value={idx} onClick={this.handleEdit}>Edit</div>
                        <div className="del-btn" data-key={ele1.id} value={idx} onClick={this.handleDelete}>Delete</div>
                        </div>
                    </div>)
                    })
                }
                <div className='btn-modal-new-item'>
                <Button

                    onClick={this.handleNewItem}
                    type="button"
                    buttonStyle="btn--danger--solid"
                    buttonSize="btn--medium"
                >
                <BiPlus /> New Item
                </Button>
                </div>
        </div>
   
    </ModalBody>
    </Modal>}
    </>
    )
  }
}

export default CardXS;