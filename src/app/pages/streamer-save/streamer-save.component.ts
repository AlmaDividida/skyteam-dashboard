import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Streamer } from 'src/app/model/streamer/streamer';
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

  constructor( private streamerService: StreamerService, private router: Router, private activatedRoute: ActivatedRoute ) {
    this.formStreamer = new FormGroup({
      name: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required),
      channel: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required),
      schedule: new FormControl('', Validators.required),
      email: new FormControl(''),
      whatsapp: new FormControl(''),
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
  }
  
  saveStreamer(){
    if (this.formStreamer.invalid) {
      return;
    }

    const streamer: Streamer = {
      name: this.formStreamer.value.name,
      group: this.formStreamer.value.group,
      channel: this.formStreamer.value.channel,
      points: this.formStreamer.value.points,
      schedule: this.formStreamer.value.schedule,
      email: this.formStreamer.value.email,
      whatsapp: this.formStreamer.value.whatsapp,
    }

    if (this.id === null) {
      this.addStreamer(streamer);
    } else {
      this.updateStreamer(this.id, streamer);
    }
  }

  updateStreamer(id: string, streamer: Streamer){
    this.streamerService.updateStreamer(id, streamer).then(() => {
      console.log('Streamer actualizado con éxito');
      this.router.navigate(['/app/streamers']);
    }).catch(error => { 
      console.log(error);
    });
  }

  addStreamer(streamer: Streamer){
    this.streamerService.saveStreamer(streamer).then(() => {
      console.log('Streamer registrado con éxito');
      this.router.navigate(['/app/groups']);
    }).catch(error => { 
      console.log(error);
    });
  }

  isEdit() {
    if(this.id != null ) {
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
 