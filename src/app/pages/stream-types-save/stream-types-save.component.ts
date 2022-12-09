import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamType } from 'src/app/model/stream-type/stream-type';
import { StreamTypeService } from 'src/core/services/stream-type/stream-type.service';

@Component({
  selector: 'app-stream-type-save',
  templateUrl: './stream-types-save.component.html',
  styleUrls: ['./stream-types-save.component.scss']
})
export class StreamTypeSaveComponent implements OnInit {
  
  title!: string;
  id!: string | null;
  formStreamType: FormGroup;

  constructor( private streamTypeService: StreamTypeService, private router: Router, private activatedRoute: ActivatedRoute ) {
    this.formStreamType = new FormGroup({
      name: new FormControl('', Validators.required),
      stream_type: new FormControl('', Validators.required)
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
  }
  
  saveStreamType(){
    if (this.formStreamType.invalid) {
      return;
    }

    const streamType: StreamType = {
      name: this.formStreamType.value.name,
      points_reward: this.formStreamType.value.stream_type
    }

    if (this.id === null) {
      this.addStreamType(streamType);
    } else {
      this.updateStreamType(this.id, streamType);
    }
  }

  updateStreamType(id: string, streamType: StreamType){
    this.streamTypeService.updateStreamType(id, streamType).then(() => {
      console.log('Tipo de Stream actualizado con éxito');
      this.router.navigate(['/app/stream-types']);
    }).catch(error => { 
      console.log(error);
    });
  }

  addStreamType(streamType: StreamType){
    this.streamTypeService.addStreamType(streamType).then(() => {
      console.log('Tipo de Stream registrado con éxito');
      this.router.navigate(['/app/stream-types']);
    }).catch(error => { 
      console.log(error);
    });
  }

  isEdit() {
    if(this.id != null ) {
      this.title = "Editar Tipo de Stream"
      this.streamTypeService.getStreamType(this.id).subscribe(data => {
        console.log(data.payload.data()['name']);
        this.formStreamType.setValue({
          name: data.payload.data()['name'],
          stream_type: data.payload.data()['stream_type']
        });
      });
    } else {
      this.title = 'Agregar Tipo de Stream'
    }
  }
}
 