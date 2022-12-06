import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from 'src/app/model/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor( private httpClient: HttpClient ) {
  }

  deleteGroup(group: Group) {
  }

  saveGroup( group: Group ) {
    this.httpClient.put('https://skyteam-dashboard-backend-default-rtdb.firebaseio.com/group-data.json', group).subscribe(
      response => console.log("Se ha guardado el grupo: ", response),
      error => console.log("Error", error)
    );
  }

  getAllGroups() {
    return this.httpClient.get('https://skyteam-dashboard-backend-default-rtdb.firebaseio.com/group-data.json');
  }
}
