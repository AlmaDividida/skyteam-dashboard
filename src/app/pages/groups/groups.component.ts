import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/model/group';
import { GroupService } from 'src/core/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id_group', 'name', 'streamers', 'action'];
  dataSource;

  constructor(private _liveAnnouncer: LiveAnnouncer, private groupService: GroupService) {

    let data;
    this.groupService.getAllGroups().subscribe(response => {
      data = response;
      console.log(response);
    })
    this.dataSource = new MatTableDataSource(data);

  }

  @ViewChild(MatSort) sort!: MatSort;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteGroup(group: Group){
    this.groupService.deleteGroup(group);
  }

  saveGroup(group: Group){
    this.groupService.saveGroup(group);
  }

}
