import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Group } from 'src/app/model/group/group';
import { Schedule } from 'src/app/model/schedule/schedule';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private firestore: AngularFirestore, private scheduleService:  ScheduleService) {}

  getAllGroups(): Observable<any> {
    return this.firestore.collection('groups').snapshotChanges();
  }

  getGroup(id: string): Observable<any> {
    return this.firestore.collection('groups').doc(id).snapshotChanges();
  }

  addGroup(group: Group): Promise<any> {
    let response = this.firestore.collection('groups').add(group)
      .then( (group) => {
        this.scheduleService.addSchedules(group.id);
      })
      .catch(function (error) {
        console.error(error);
      });
    return response;
  }

  deleteGroup(id: string): Promise<any> {
    return this.firestore.collection('groups').doc(id).delete();
  }

  updateGroup(id: string, group: Group): Promise<any> {
    return this.firestore.collection('groups').doc(id).update(group);
  }
}
