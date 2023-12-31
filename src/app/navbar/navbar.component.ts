import { Component, OnInit } from '@angular/core';
import { SupaService } from '../supa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: SupaService,
  ) { }

  ngOnInit() {
  }


  signout(){
    this.auth.logout()
  }
}
