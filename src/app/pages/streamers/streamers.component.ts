import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Streamer } from 'src/app/model/streamer/streamer';
import { StreamerService } from 'src/core/services/streamer/streamer.service';

@Component({
  selector: 'app-streamers',
  templateUrl: './streamers.component.html',
  styleUrls: ['./streamers.component.scss']
})
export class StreamersComponent implements AfterViewInit {

  streamers!: Streamer[];
  displayedColumns: string[] = ['username', 'group', 'twitch_url', 'email', 'whatsapp', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private streamerService: StreamerService) {}

  @ViewChild(MatSort) sort!: MatSort;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.streamerService.getAllStreamers().subscribe(response => {
      this.streamers = [];
      response.map((r: any) => {
        this.streamers.push({
          id: r.payload.doc.id,
          ...r.payload.doc.data()
        })
      })
      this.dataSource = new MatTableDataSource(this.streamers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteStreamer( id: string ){
    this.streamerService.deleteStreamer(id).then(() => { 
      console.log("Grupo eliminado con éxito");
    }). catch(error => {
      console.log(error);
    });
  }

  saveStreamer( streamer: Streamer ){
    this.streamerService.saveStreamer(streamer);
  }

}
