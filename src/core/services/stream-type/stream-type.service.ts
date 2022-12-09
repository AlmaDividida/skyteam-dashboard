import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { StreamType } from 'src/app/model/stream-type/stream-type';

@Injectable({
  providedIn: 'root'
})
export class StreamTypeService {
  constructor(private firestore: AngularFirestore) {}

  getAllStreamTypes(): Observable<any> {
    return this.firestore.collection('stream_type').snapshotChanges();
  }

  getStreamType(id: string): Observable<any> {
    return this.firestore.collection('stream_type').doc(id).snapshotChanges();
  }

  addStreamType(group: StreamType): Promise<any> {
    return this.firestore.collection('stream_type').add(group);
  }

  deleteStreamType(id: string): Promise<any> {
    return this.firestore.collection('stream_type').doc(id).delete();
  }

  updateStreamType(id: string, group: StreamType): Promise<any> {
    return this.firestore.collection('stream_type').doc(id).update(group);
  }
}
