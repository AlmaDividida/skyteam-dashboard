import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Group } from 'src/app/model/group/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private firestore: AngularFirestore) {}

  getAllGroups(): Observable<any> {
    return this.firestore.collection('groups').snapshotChanges();
  }

  getGroup(id: string): Observable<any> {
    return this.firestore.collection('groups').doc(id).snapshotChanges();
  }

  addGroup(group: Group): Promise<any> {
    return this.firestore.collection('groups').add(group);
  }

  deleteGroup(id: string): Promise<any> {
    return this.firestore.collection('groups').doc(id).delete();
  }

  updateGroup(id: string, group: Group): Promise<any> {
    return this.firestore.collection('groups').doc(id).update(group);
  }
}
