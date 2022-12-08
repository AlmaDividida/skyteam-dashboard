import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/model/schedule/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private firestore: AngularFirestore) {}

  getAllSchedules(id_group: string): Observable<any> {
    return this.firestore.collection('groups').doc(id_group).collection('schedules').snapshotChanges();
  }

  getSchedule(id_group: string, id_schedule: string): Observable<any> {
    return this.firestore.collection('groups').doc(id_group).collection('schedules').doc(id_schedule).snapshotChanges();
  }

  addSchedules(id_group: string): Schedule[] {
    let schedules: Schedule[] = this.generateSchedule();
    schedules.map(s => {
      this.firestore.collection('groups').doc(id_group).collection('schedules').doc(s.time + s.day).set(s);
    });
    return schedules;
  }

  addSchedule(id_group: string): Promise<any> {
    return this.firestore.collection('groups').doc(id_group).collection('schedules').add(this.generateSchedule);
  }

  deleteSchedule(id_group: string, id_schedule: string): Promise<any> {
    return this.firestore.collection('groups').doc(id_group).collection('schedules').doc(id_schedule).delete();
  }

  updateSchedule(id_group: string, id_schedule: string, schedule: Schedule): Promise<any> {
    return this.firestore.collection('groups').doc(id_group).collection('schedules').doc(id_schedule).update(schedule);
  }

  generateSchedule(): Schedule[] {
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
