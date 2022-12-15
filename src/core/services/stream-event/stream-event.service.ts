import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamEventService {

  constructor( private firestore: AngularFirestore ) {}

  getAllStreamEvents(): Observable <any> {
    return this.firestore.collectionGroup('stream_events').snapshotChanges();
  }
}
