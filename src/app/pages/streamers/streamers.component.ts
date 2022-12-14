import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Streamer } from 'src/app/model/streamer/streamer';
import { GroupService } from 'src/core/services/group/group.service';
import { StreamerService } from 'src/core/services/streamer/streamer.service';

@Component({
  selector: 'app-streamers',
  templateUrl: './streamers.component.html',
  styleUrls: ['./streamers.component.scss']
})
export class StreamersComponent implements AfterViewInit {

  groups!: any[];
  id_group!: FormControl;
  streamers!: Streamer[];
  displayedColumns: string[] = ['username', 'twitch_url', 'email', 'whatsapp', 'points', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private streamerService: StreamerService, private groupService: GroupService ) {
    this.id_group = new FormControl();
  }

  @ViewChild(MatSort) sort!: MatSort;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.getGroups();
    this.getStreamers();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getStreamers(){
    if (this.id_group.value == null) {
      return;
    }
    this.streamerService.getAllStreamers( this.id_group.value ).subscribe(response => {
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
    });
  }

  getGroups() {
    this.groupService.getAllGroups().subscribe(response => {
      this.groups = [];
      response.map((r: any) => {
        this.groups.push({
          id: r.payload.doc.id,
          ...r.payload.doc.data()
        });
      });
    });
  }

  deleteStreamer( id: string ){
    this.streamerService.deleteStreamer(this.id_group.value, id).then(() => { 
      console.log("Grupo eliminado con éxito");
    }). catch(error => {
      console.log(error);
    });
  }
}
