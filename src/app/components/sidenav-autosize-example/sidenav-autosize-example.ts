import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'sidenav-autosize-example',
  templateUrl: 'sidenav-autosize-example.html',
  styleUrls: ['sidenav-autosize-example.css'],
})
export class SidenavAutosizeExample implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isExpanded = true;
  showSubmenu: boolean = false;
  showSubmenu2: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showSubSubMenu2: boolean = false;

  ngOnInit(): void {
    this.isShowing = false;
    this.isExpanded = false;
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
