import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/model/group/group';
import { Streamer } from 'src/app/model/streamer/streamer';
import { GroupService } from 'src/core/services/group/group.service';
import { ScheduleService } from 'src/core/services/schedule/schedule.service';
import { StreamerService } from 'src/core/services/streamer/streamer.service';

@Component({
  selector: 'app-streamer-save',
  templateUrl: './streamer-save.component.html',
  styleUrls: ['./streamer-save.component.scss']
})
export class StreamerSaveComponent implements OnInit {

  title!: string;
  groups!: any[];
  schedules!: any[];
  scheduleHeaders!: string[];
  id!: string | null;
  formStreamer: FormGroup;

  constructor(private streamerService: StreamerService, private router: Router, private activatedRoute: ActivatedRoute, private groupService: GroupService, private scheduleService: ScheduleService) {
    this.scheduleHeaders = this.generateScheduleHeaders();

    this.formStreamer = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      group: new FormControl(null, Validators.required),
      twitch_url: new FormControl('https://www.twitch.tv/', Validators.required),
      email: new FormControl('', Validators.email),
      whatsapp: new FormControl('', Validators.pattern('[- +()0-9]+')),
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
    this.getGroups();
    this.formStreamer.get('group')?.valueChanges.subscribe( response => {
      this.getSchedule(response);
    });
    this.formStreamer.get('username')?.valueChanges.subscribe( response=> {
      this.formStreamer.controls['twitch_url'].setValue('https://www.twitch.tv/' + response.toString().toLocaleLowerCase())
    });
  }

  generateScheduleHeaders(){
    return ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  }

  getGroups() {
    this.groupService.getAllGroups().subscribe(response => {
      this.groups = [];
      response.map((r: any) => {
        this.groups.push({
          id: r.payload.doc.id,
          ...r.payload.doc.data()
        });
      })
    });
  }

  getSchedule(id_group: string) {
    this.scheduleService.getAllSchedules(id_group).subscribe(response => {
      this.schedules = [];
      response.map((r: any) => {
        this.schedules.push({
          id: r.payload.doc.id,
          ...r.payload.doc.data()
        });
      })
    });
  }

  saveStreamer() {
    if (this.formStreamer.invalid) {
      return;
    }

    const streamer: Streamer = {
      name: this.formStreamer.value.name,
      email: this.formStreamer.value.email,
      whatsapp: this.formStreamer.value.whatsapp,
      points: 0,
    }

    if (this.id === null) {
      this.addStreamer(streamer);
    } else {
      this.updateStreamer(this.id, streamer);
    }
  }

  updateStreamer(id: string, streamer: Streamer) {
    this.streamerService.updateStreamer(id, streamer).then(() => {
      console.log('Streamer actualizado con éxito');
      this.router.navigate(['/app/streamers']);
    }).catch(error => {
      console.log(error);
    });
  }

  addStreamer(streamer: Streamer) {
    this.streamerService.saveStreamer(streamer).then(() => {
      console.log('Streamer registrado con éxito');
      this.router.navigate(['/app/groups']);
    }).catch(error => {
      console.log(error);
    });
  }

  isEdit() {
    if (this.id != null) {
      this.title = "Editar Streamer"
      this.streamerService.getStreamer(this.id).subscribe(data => {
        console.log(data.payload.data()['name']);
        this.formStreamer.setValue({
          name: data.payload.data()['name'],
          group: data.payload.data()['group'],
          channel: data.payload.data()['channel'],
          points: data.payload.data()['points'],
          schedule: data.payload.data()['schedule'],
          email: data.payload.data()['email'],
          whatsapp: data.payload.data()['whatsapp'],
        });
      });
    } else {
      this.title = 'Agregar Streamer'
    }
  }
}
