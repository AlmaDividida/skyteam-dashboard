import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  activeSideBar: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
    this.activeSideBar = true;
  }

  switchSidebarStatus($event: any) {
    this.activeSideBar = $event;
    console.log("click")
  }

}
