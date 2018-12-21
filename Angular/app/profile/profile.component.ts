import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public arrCount = [0, 1, 2, 3];
  subs = new Subscription();
  
  constructor(private dataservice: DataService, private dragula: DragulaService, private http: HttpClient) { 
  	this.dragula.createGroup('mainTable', {
  		revertOnSpill: true,
  		direction: 'horizontal',
  		invalid: (el) => {
  			return el.id == 'author' || el.id == 'remove' || el.id == 'blank';
  		}
  	});

  	this.subs.add(
  		this.dragula.drop('mainTable').subscribe(
  			value => {
  				console.log(value);
  				var el = value['el'];
  				var target = value['target'];
  				var source = value['source'];

  				if(target['id'] == source['id'])
  				{
  					var offset = 0;

  					for(var i = 0; i < target['children'].length; i++)
  					{
  						if(i == 0 && target['children'][i]['id'] == 'author')
  						{
  							offset =1;
  							continue;
  						}

  						if(target['children'][i]['id'] == el['id'])
  						{
  							console.log(i - offset);
  							this.dataservice.moveGoal(source['id'], i - offset);
  							break;
  						}
  					}
  				} else
  				{
  					this.dataservice.changeOwner(source['id'], target['id']);
  				}
  			}
  		)
  	);

  	this.dataservice.username = sessionStorage.getItem('username');
  	this.dataservice.role = sessionStorage.getItem('role');
  	this.dataservice.authOptions = {
		headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + sessionStorage.getItem('token')})
	};
	this.http.get('http://127.0.0.1:8000/nathanoluwaseyiscrumy/api/scrumyusers/', this.dataservice.httpOptions).subscribe(
		data => {
			console.log(data);
			for(var i = 0; i < data['length']; i++)
			{
				data[i]['goalstatus_set'] = data[i]['goalstatus_set'].filter(s => s['visible']);
			}
			this.dataservice.users = data;
		},
		err => {
			this.dataservice.message = 'Unexpected Error!';
			console.log(err);
		}		
	);
  }

  editGoal(event)
  {
  	console.log(event);
  	var items = event.target.innerText.split(/\)\s(.+)/);
  	var goal_name = window.prompt('Editing the Task ID #' + items[0] + ':', items[1]);
  	if(goal_name == null || goal_name == '')
  	{
  		this.dataservice.message = 'Edit Canceled.';
  	} else
  	{
  		this.http.put('http://127.0.0.1:8000/nathanoluwaseyiscrumy/api/goalstatus/', JSON.stringify({'mode': 1, 'goal_id': items[0], 'new_name': goal_name}), this.dataservice.authOptions).subscribe(
  		data => {
  			this.dataservice.users = data['data'];
  			this.dataservice.message = data['message'];
  		},
  		err => {
  			console.error(err);
  			if(err['status'] == 401)
  			{
  				this.dataservice.message = 'Session Invalid or Expired. Please Login.';
  				this.dataservice.logout();
  			} else
  			{
  				this.dataservice.message = 'Unexpected Error!';
  			}
  		}
  	);
  	}

  }

  doNothing()
  {
  	
  }

  ngOnInit() {
  }

  addGoal()
  {
  	this.dataservice.addGoal();
  }

  logout()
  {
  	this.dataservice.message = 'Thank you for using nathanoluwaseyiscrumy!';
  	this.dataservice.logout();
  }

  ngOnDestroy()
  {
  	this.subs.unsubscribe();
  	this.dragula.destroy('mainTable');
  }
}
