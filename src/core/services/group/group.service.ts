import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Group } from 'src/app/model/group/group';
import { Schedule } from 'src/app/model/schedule/schedule';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private firestore: AngularFirestore) {}

  getAllGroups(): Observable<any> {
    return this.firestore.collection('groups').snapshotChanges();
  }

  addGroup(group: Group): Promise<any> {
    let response = this.firestore.collection('groups').add(group)
      .then( (docRef) => {
        this.generateSchedule().forEach(schedule => {
          this.firestore.collection('groups').doc(docRef.id).collection('schedules').doc(schedule.day + schedule.time).set(schedule);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
    return response;
  }

  addScheduler(id: string): Promise<any> {
    return this.firestore.collection('groups').doc(id).collection('schedules').add(this.generateSchedule);
  }

  getGroup(id: string): Observable<any> {
    return this.firestore.collection('groups').doc(id).snapshotChanges();
  }

  deleteGroup(id: string): Promise<any> {
    return this.firestore.collection('groups').doc(id).delete();
  }

  updateGroup(id: string, group: Group): Promise<any> {
    return this.firestore.collection('groups').doc(id).update(group);
  }

  generateSchedule() {
    const days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const times: number[] = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let schedules: Schedule[] = [];
    days.map(d => {
      times.map(t => {
        const schedule: Schedule = {
          day: d,
          stream: null,
          time: t
        }
        schedules.push(schedule);
      });
    });
    return schedules;
  }
}
