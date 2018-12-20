import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private dataservice: DataService) { }

  ngOnInit() {
  }

  toLogin()
  {
	this.router.navigate(['login']);
  }  
  
  toUser()
  {
	this.router.navigate(['createuser']);
  }
}
