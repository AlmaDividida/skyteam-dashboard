import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StreamType } from 'src/app/model/stream-type/stream-type';
import { StreamTypeService } from 'src/core/services/stream-type/stream-type.service';

@Component({
  selector: 'app-stream-types',
  templateUrl: './stream-types.component.html',
  styleUrls: ['./stream-types.component.scss']
})
export class StreamTypesComponent implements AfterViewInit {

  streamTypes!: StreamType[];
  displayedColumns: string[] = ['name', 'points_reward', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private streamTypeService: StreamTypeService) {}

  @ViewChild(MatSort) sort!: MatSort;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.streamTypeService.getAllStreamTypes().subscribe(response => {
      this.streamTypes = [];
      response.map((r: any) => {
        this.streamTypes.push({
          id: r.payload.doc.id,
          ...r.payload.doc.data()
        })
      })
      this.dataSource = new MatTableDataSource(this.streamTypes);
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

  deleteStreamType( id: string ){
    this.streamTypeService.deleteStreamType(id).then(() => { 
      console.log("Tipo de Stream eliminado con éxito");
    }). catch(error => {
      console.log(error);
    });
  }
  
}
