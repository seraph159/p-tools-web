import React, {useState} from 'react';
import CardXS from '../../components/card-xs/card-xs.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import  Modal, {ModalBody, ModalHeader} from '../../components/modal/modal.component';
import { Button } from '../../components/button/button.component';
import { BiCheck, BiX, BiPlus } from "react-icons/bi";
import EdiText from 'react-editext'

import './collections.scss';


function Collections() {

  const colList = [
    {
      name: "Search Engine Collection",
      items: [
        {
          id: 619,
          name: "google",
          link: "http://google.com"
        },
        {
          id: 620,
          name: "bing",
          link: "http://bing.com"
        },
        {
          id: 621,
          name: "yahoo",
          link: "http://yahoo.com"
        }
    ]

},
    {
      name: "Video Platforms",
      items: [
          {
          id:786,    
          name: "youtube",
          link: "http://youtube.com"
        },
        {
          id:787,  
          name: "vimeo",
          link: "http://vimeo.com"
        },
        {
          id:788,
          name: "dailymotion",
          link: "http://dailymotion.com"
        },
        {
          id:789,
          name: "vudu",
          link: "http://vudu.com"
        },
        {
          id:790,
          name: "smiloo",
          link: "http://smiloo.com"
        },
        {
          id:791,
          name: "jacket",
          link: "http://jacket.com"
        },
        {
          id:792,
          name: "collagen",
          link: "http://collagenforus.com"
        }
      ]
    },
    {
      name: "Social Medias",
      items: [
        {
          id:566,
          name: "myspace",
          link: "http://myspace.com"
        },
        {
          id:567,
          name: "facebook",
          link: "http://facebook.com"
        },
        {
          id:568,
          name: "twitter",
          link: "http://twitter.com"
        }
    ]

    }
  ]

  const [colFull, setColFull] = useState(colList)
  const [colEnable, setcolEnable] = useState(true)
  const [open, setOpen] = useState(false)

  const handleColEnable = (e) => {
      setcolEnable(e);
  }

  const handleColFull = (e) => {
      console.log("delete triggered", e)
      console.log("colFull triggered", colFull)
      setColFull([...e]);
  }


  const onSave = (e) => {

    setColFull((prevState)=>
      [...prevState, {
        name: e,
        items: []
      }]
    )

    setcolEnable(true)
    setOpen(false);
  }

  const onOpenModal = (e) => {
      setOpen(true);
}

const onCloseModal = () => {
      setOpen(false);
}
  
  return (
    <div className="collections-container-main">
    <div className="collections-container">
      <CardXS colFull={colFull} colEnable={colEnable} handleColEnable={handleColEnable} handleColFull={handleColFull}/>
      <div className='btn-sidebar-container'>
      <Button
        onClick={onOpenModal}
        type="button"
        buttonStyle="btn--danger--solid"
        buttonSize="btn--medium"
      >
       <BiPlus /> New Collection
      </Button>
      </div>
      <Sidebar />
    </div>
    <Modal show={open} setShow={onCloseModal}>
    <ModalHeader>
        Add New Collection
    </ModalHeader>
    <ModalBody>
        <div className="colist-modal-container">
                    <div className="colist-body">
                        <div className="col-inner-middle">
                        Collection Name:
                        <EdiText
                            type='text'
                            onSave={onSave}
                            editing={open}
                            validationMessage="Please type at least 3 characters."
                            validation={val => val.length >= 3}
                            editButtonClassName="custom-edit-button"
                            editContainerClassName="custom-edit-view-container"
                            saveButtonClassName='custom-edit-save-button'
                            saveButtonContent={<BiCheck style={{color: 'green'}}/>}
                            cancelButtonContent={<BiX style={{color: 'red'}}/>}
                            cancelButtonClassName='custom-edit-cancel-button'
                        />        
                        </div>
                
                    </div>
        </div>
   
    </ModalBody>
    </Modal>
    </div>
  )
}


export default Collections;



