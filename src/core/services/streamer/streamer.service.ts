import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Streamer } from 'src/app/model/streamer/streamer';

@Injectable({
  providedIn: 'root'
})
export class StreamerService {

  constructor( private firestore: AngularFirestore ) {}

  getAllStreamers(): Observable <any> {
    return this.firestore.collection('streamer').snapshotChanges();
  }

  saveStreamer( streamer: Streamer ): Promise<any> {
    return this.firestore.collection('streamer').add(streamer);
  }

  getStreamer( id: string ): Observable <any> {
    return this.firestore.collection('streamer').doc(id).snapshotChanges();
  }

  deleteStreamer( id: string ): Promise<any> {
    return this.firestore.collection('streamer').doc(id).delete();
  }

  updateStreamer( id: string, Streamer: Streamer ): Promise<any> {
    return this.firestore.collection('streamer').doc(id).update(Streamer);
  }
}
