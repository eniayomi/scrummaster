import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public arrCount = [0, 1, 2, 3];
  subs = new Subscription();
  
  constructor(private dataservice: DataService, private dragula: DragulaService) { 
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
  	)
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
