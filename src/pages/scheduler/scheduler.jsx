import React from 'react';
import  Modal, {ModalBody, ModalHeader} from '../../components/modal/modal.component';
import {Button} from '../../components/button/button.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import { BiCheck, BiX, BiPlus } from "react-icons/bi";
import '../scheduler/scheduler.scss';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import EdiText from 'react-editext'


class Scheduler extends React.Component {

  state = {
    events: [],
    open: false
  };

  /**
   * adding dragable properties to external events through javascript
   */
  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id
        };
      }
    });
  }

onOpenModal = (e) => {
    this.setState({open:true})
}

onCloseModal = () => {
  this.setState({open:false})
}

onSave = (e) => {
    const temp = [...this.state.events, { title: e, id: "1" }]
    this.setState({events: temp, open:false})
}

  /**
   * when we click on event we are displaying event details
   */
  eventClick = eventClick => {
    Alert.fire({
      title: eventClick.event.title,
      html:
        `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>` +
        eventClick.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
        eventClick.event.start +
        `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Remove Event",
      cancelButtonText: "Close"
    }).then(result => {
      if (result.value) {
        eventClick.event.remove(); // It will remove event from the calendar
        Alert.fire("Deleted!", "Your Event has been deleted.", "success");
      }
    });
  };

  render() {
    const open = this.state.open;
    return (
      <div className="scheduler-container-main">
      <div className="scheduler-container">
      <div className="events-container" id="external-events">
              <p align="center">
                <strong> Events</strong>
              </p>
              <hr></hr>
              {this.state.events.map(event => (
                <div
                  className="fc-event"
                  title={event.title}
                  data={event.id}
                  key={event.id}
                  align="center"
                >
                  {event.title}
                </div>
              ))}
              <Button

              onClick={this.onOpenModal}
              type="button"
              buttonStyle="btn--danger--solid"
              buttonSize="btn--medium"
              >
              <BiPlus /> New Event
              </Button>
            </div>
        <div className='fullcalendar-container'>
        <FullCalendar
                initialView="timeGridDay"
                defaultView="timeGridDay"
                header={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                rerenderDelay={10}
                eventDurationEditable={false}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarComponentRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                eventDrop={this.drop}
                // drop={this.drop}
                eventReceive={this.eventReceive}
                eventClick={this.eventClick}
                // selectable={true}
              />
        </div>
        <Sidebar />
      </div>
    <Modal show={this.state.open} setShow={this.onCloseModal}>
    <ModalHeader>
        Add New Event
    </ModalHeader>
    <ModalBody>
        <div className="colist-modal-contakiner">
                    <div className="colist-bkody">
                        <div className="col-inkner-middle">
                        Event Name:
                        <EdiText
                            type='text'
                            onSave={this.onSave}
                            editing={open}
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
}

export default Scheduler;