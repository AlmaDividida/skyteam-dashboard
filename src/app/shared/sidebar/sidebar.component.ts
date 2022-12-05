import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() activeSideBarEmit = new EventEmitter<boolean>();
  activeSideBar: boolean | undefined;

  constructor() {}

  ngOnInit(): void {
    this.activeSideBar = true;
  }

  switchSidebar() {
    this.activeSideBar = !this.activeSideBar;
    this.activeSideBarEmit.emit(this.activeSideBar);
  }

}
