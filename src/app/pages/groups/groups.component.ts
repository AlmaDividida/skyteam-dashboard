import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/model/group/group';
import { GroupService } from 'src/core/services/group/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements AfterViewInit {

  groups!: Group[];
  displayedColumns: string[] = ['name', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private groupService: GroupService) {}

  @ViewChild(MatSort) sort!: MatSort;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.groupService.getAllGroups().subscribe(response => {
      this.groups = [];
      response.map((r: any) => {
        this.groups.push({
          id: r.payload.doc.id,
          ...r.payload.doc.data()
        })
      })
      this.dataSource = new MatTableDataSource(this.groups);
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

  deleteGroup( id: string ){
    this.groupService.deleteGroup(id).then(() => { 
      console.log("Grupo eliminado con éxito");
    }). catch(error => {
      console.log(error);
    });
  }
}
