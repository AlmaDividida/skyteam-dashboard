import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Streamer } from 'src/app/model/streamer/streamer';

@Injectable({
  providedIn: 'root'
})
export class StreamerService {

  constructor( private firestore: AngularFirestore ) {}

  getAllStreamers( id_group: string ): Observable <any> {
    return this.firestore.collection('groups').doc(id_group).collection('streamers').snapshotChanges();
  }

  saveStreamer( id_group: string, streamer: Streamer ): Promise<any> {
    return this.firestore.collection('groups').doc(id_group).collection('streamers').add(streamer);
  }

  getStreamer( id_group: string, id_streamer: string ): Observable <any> {
    return this.firestore.collection('groups').doc(id_group).collection('streamers').doc(id_streamer).snapshotChanges();
  }

  deleteStreamer( id_group: string, id_streamer: string): Promise<any> {
    return this.firestore.collection('groups').doc(id_group).collection('streamers').doc(id_streamer).delete();
  }

  updateStreamer( id_group: string, id_streamer: string, streamer: Streamer ): Promise<any> {
    return this.firestore.collection('groups').doc(id_group).collection('streamers').doc(id_streamer).update(streamer);
  }
}
