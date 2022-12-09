import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/model/group/group';
import { Streamer } from 'src/app/model/streamer/streamer';
import { GroupService } from 'src/core/services/group/group.service';
import { StreamerService } from 'src/core/services/streamer/streamer.service';

@Component({
  selector: 'app-streamer-save',
  templateUrl: './streamer-save.component.html',
  styleUrls: ['./streamer-save.component.scss']
})
export class StreamerSaveComponent implements OnInit {

  title!: string;

  id!: string | null;

  formStreamer: FormGroup;

  groups!: any[];

  maxSchedules!: number;

  scheduleCount!: number;

  schedules!: any[];

  scheduleHeaders!: string[];

  displayedColumns: string[] = ['horario', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  dataSource: any;

  constructor(
    private streamerService: StreamerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.scheduleCount = 0;
    this.maxSchedules = 2;

    this.formStreamer = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      group: new FormControl(null, Validators.required),
      twitch_url: new FormControl('https://www.twitch.tv/', Validators.required),
      email: new FormControl('', Validators.email),
      whatsapp: new FormControl('', Validators.pattern('[- +()0-9]+')),
      points: new FormControl(0),
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
    this.getGroups();
    this.formStreamer.get('username')?.valueChanges.subscribe(response => {
      this.formStreamer.controls['twitch_url'].setValue('https://www.twitch.tv/' + response.toString().toLocaleLowerCase())
    });
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

  saveStreamer() {
    if (this.formStreamer.invalid) {
      return;
    }

    const streamer: Streamer = {
      username: this.formStreamer.value.name,
      twitch_url: this.formStreamer.value.twitch_url,
      email: this.formStreamer.value.email,
      whatsapp: this.formStreamer.value.whatsapp,
      group: this.formStreamer.value.group,
      points: this.formStreamer.value.points,
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
      this.router.navigate(['/app/streamers']);
    }).catch(error => {
      console.log(error);
    });
  }

  isEdit() {
    if (this.id != null) {
      this.title = "Editar Streamer"
      this.streamerService.getStreamer(this.id).subscribe(data => {
        this.formStreamer.setValue({
          username: data.payload.data()['username'],
          twitch_url: data.payload.data()['twitch_url'],
          email: data.payload.data()['email'],
          whatsapp: data.payload.data()['whatsapp'],
          group: data.payload.data()['group'],
          points: data.payload.data()['points'],
        });
      });
    } else {
      this.title = 'Agregar Streamer'
    }
  }
}
