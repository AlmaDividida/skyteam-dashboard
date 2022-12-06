import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/model/group';
import { GroupService } from 'src/core/services/group.service';

@Component({
  selector: 'app-group-save',
  templateUrl: './group-save.component.html',
  styleUrls: ['./group-save.component.scss']
})
export class GroupSaveComponent implements OnInit {
  
  title!: string;
  id!: string | null;
  formGroup: FormGroup;

  constructor( private groupService: GroupService, private router: Router, private activatedRoute: ActivatedRoute ) {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    });
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit();
  }
  
  saveGroup(){
    if (this.formGroup.invalid) {
      return;
    }

    const group: Group = {
      name: this.formGroup.value.name,
      description: this.formGroup.value.description
    }

    if (this.id === null) {
      this.addGroup(group);
    } else {
      this.updateGroup(this.id, group);
    }
  }

  updateGroup(id: string, group: Group){
    this.groupService.updateGroup(id, group).then(() => {
      console.log('Grupo actualizado con éxito');
      this.router.navigate(['/app/groups']);
    }).catch(error => { 
      console.log(error);
    });
  }

  addGroup(group: Group){
    this.groupService.saveGroup(group).then(() => {
      console.log('Grupo registrado con éxito');
      this.router.navigate(['/app/groups']);
    }).catch(error => { 
      console.log(error);
    });
  }

  isEdit() {
    if(this.id != null ) {
      this.title = "Editar Grupo"
      this.groupService.getGroup(this.id).subscribe(data => {
        console.log(data.payload.data()['name']);
        this.formGroup.setValue({
          name: data.payload.data()['name'],
          description: data.payload.data()['description']
        });
      });
    } else {
      this.title = 'Agregar Grupo'
    }
  }
}
 