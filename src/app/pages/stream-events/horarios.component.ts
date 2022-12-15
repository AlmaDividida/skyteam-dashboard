import { Component, OnInit } from '@angular/core';
import { MbscEventcalendarOptions, MbscCalendarEvent, localeEs } from '@mobiscroll/angular';
import { FormControl } from '@angular/forms';
import { GroupService } from 'src/core/services/group/group.service';
import { StreamEventService } from 'src/core/services/stream-event/stream-event.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {
  
  groups!: any[];

  id_group!: FormControl;

  stream_events!: MbscCalendarEvent[];

  eventSettings: MbscEventcalendarOptions;

  constructor( private groupService: GroupService, private streamEventService: StreamEventService ) {
    this.id_group = new FormControl();

    this.eventSettings = {
      locale: localeEs,
      theme: 'windows',
      themeVariant: 'light',
      clickToCreate: false,
      dragToCreate: false,
      dragToMove: false,
      dragToResize: false,
      eventDelete: false,
      view: {
        schedule: { 
          type: 'week',
          startTime: '10:00',
          endTime: '24:00',
          allDay: false
        }
      },
      onEventClick: (event) => {
        window.open(event.event['description'], "_blank");
      }
    };
  }

  ngOnInit(): void {
    this.getGroups();
    this.getStreamEvents();
  }

  getStreamers(){

  }

  getStreamEvents() {
    this.streamEventService.getAllStreamEvents().subscribe(response => {
      this.stream_events = [];
      response.map((r: any) => {
        this.stream_events.push({
          id: r.payload.doc.id,
          ...r.payload.doc.data()
        });
      });
    })
  }

  getGroups() {
    this.groupService.getAllGroups().subscribe(response => {
      this.groups = [];
      response.map((r: any) => {
        this.groups.push({
          id: r.payload.doc.id,
          ...r.payload.doc.data()
        });
      });
    });
  }

}
