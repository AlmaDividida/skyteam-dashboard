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

  id_group!: string | null;

  id_streamer!: string | null;

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
      username: new FormControl('', Validators.required),
      group: new FormControl(null, Validators.required),
      twitch_url: new FormControl('https://www.twitch.tv/', Validators.required),
      email: new FormControl('', Validators.email),
      whatsapp: new FormControl('', Validators.pattern('[- +()0-9]+')),
      points: new FormControl(0),
    });
    this.id_group = this.activatedRoute.snapshot.paramMap.get('id_group');
    this.id_streamer = this.activatedRoute.snapshot.paramMap.get('id_streamer');
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
      username: this.formStreamer.value.username,
      twitch_url: this.formStreamer.value.twitch_url,
      email: this.formStreamer.value.email,
      whatsapp: this.formStreamer.value.whatsapp,
      points: this.formStreamer.value.points,
    }

    if (this.id_streamer === null) {
      this.addStreamer( this.formStreamer.value.group, streamer );
    } else {
      this.updateStreamer( this.formStreamer.value.group, this.id_streamer, streamer );
    }
  }

  updateStreamer(id_group: string, id_streamer: string, streamer: Streamer) {
    this.streamerService.updateStreamer(id_group, id_streamer, streamer ).then(() => {
      console.log('Streamer actualizado con éxito');
      this.router.navigate(['/app/streamers']);
    }).catch(error => {
      console.log(error);
    });
  }

  addStreamer(id_group: string, streamer: Streamer) {
    this.streamerService.saveStreamer(id_group, streamer ).then(() => {
      console.log('Streamer registrado con éxito');
      this.router.navigate(['/app/streamers']);
    }).catch(error => {
      console.log(error);
    });
  }

  isEdit() {
    if (this.id_group != null && this.id_streamer != null) {
      this.title = "Editar Streamer";
      this.streamerService.getStreamer(this.id_group, this.id_streamer).subscribe(data => {
        this.formStreamer.setValue({
          username: data.payload.data()['username'],
          twitch_url: data.payload.data()['twitch_url'],
          email: data.payload.data()['email'],
          whatsapp: data.payload.data()['whatsapp'],
          group: this.id_group,
          points: data.payload.data()['points'],
        });
      });
    } else {
      this.title = 'Agregar Streamer'
    }
  }
}
