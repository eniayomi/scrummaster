import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public message;
  public goal_name;

  public login_username;
  public login_password;

  public createuser_username;
  public createuser_password;
  public createuser_rtpassword;
  public createuser_fullname;
  public createuser_usertype;

  public username;
  public role;
  public users;

  private httpOptions = {
  	headers : new HttpHeaders({'Content-Type': 'application/json'})
  };

  private authOptions;

  constructor(private http: HttpClient, private router: Router) { }

  createUser()
  {
  	this.http.post('http://127.0.0.1:8000/nathanoluwaseyiscrumy/api/scrumyusers/', JSON.stringify({'username': this.createuser_username, 'password': this.createuser_password, 'rtpassword': this.createuser_rtpassword, 'full_name': this.createuser_fullname, 'usertype': this.createuser_usertype}), this.httpOptions).subscribe(
		data => {
			this.message = data['message'];
			this.createuser_username = '';
			this.createuser_password = '';
			this.createuser_rtpassword = '';
			this.createuser_fullname = '';
			this.createuser_usertype = '';
		},
		err => {
			this.message = 'User Creation Failed! Unexpected Error!';
			console.error(err);
			this.createuser_username = '';
			this.createuser_password = '';
			this.createuser_rtpassword = '';
			this.createuser_fullname = '';
			this.createuser_usertype= '';
		}		
	);
  }

  login()
  {
  	this.http.post('http://127.0.0.1:8000/nathanoluwaseyiscrumy/api-token-auth/', JSON.stringify({'username': this.login_username, 'password': this.login_password}), this.httpOptions).subscribe(
		data => {
			this.username = this.login_username;
			this.role = data['role'];
			this.users = data['data'];
			this.message = data['message'];
			this.router.navigate(['profile']);
			this.login_username = '';
			this.login_password = '';
			console.log(data);

			this.authOptions = {
				headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'JWT ' + data['token']})
			};
		},
		err => {
			if(err['status'])
				this.message = 'Login Failed: Invalid Credentials.';
			else
				this.message = 'Login Failed! Unexpected Error!';
			console.error(err);
			this.login_username = '';
			this.login_password = '';
		}		
	);
  }

  addGoal()
  {
  	this.http.post('http://127.0.0.1:8000/nathanoluwaseyiscrumy/api/goalstatus/', JSON.stringify({'name': this.goal_name}), this.authOptions).subscribe(
  		data => {
  			this.users = data['data'];
  			this.message = data['message'];
  			this.goal_name = '';
  		},
  		err => {
  			console.error(err);
  			if(err['status'] == 401)
  			{
  				this.message = 'Session Invalid or Expired. Please Login.';
  				this.logout();
  			} else
  			{
  				this.message = 'Unexpected Error!';
  			}
  			this.goal_name = '';
  		}
  	);
  }

  logout()
  {
  	this.username = '';
  	this.role = '';
  	this.users = [];
  	this.router.navigate(['login']);
  }

  moveGoal(goal_id, to_id)
  {
  	this.http.patch('http://127.0.0.1:8000/nathanoluwaseyiscrumy/api/goalstatus/', JSON.stringify({'goal_id': goal_id, 'to_id': to_id}), this.authOptions).subscribe(
  		data => {
  			this.users = data['data'];
  			this.message = data['message'];
  		},
  		err => {
  			console.error(err);

  			if(err['status'] == 401)
  			{
  				this.message = 'Session Invalid or Expired. Please Login.';
  				this.logout();
  			} else
  			{
  				this.message = 'Unexpected Error!';
  			}
  		}
  	);			
  }

  changeOwner(from_id, to_id)
  {
  	this.http.put('http://127.0.0.1:8000/nathanoluwaseyiscrumy/api/goalstatus/', JSON.stringify({'from_id': from_id, 'to_id': to_id}), this.authOptions).subscribe(
  		data => {
  			this.users = data['data'];
  			this.message = data['message'];
  		},
  		err => {
  			console.error(err);
  			if(err['status'] == 401)
  			{
  				this.message = 'Session Invalid or Expired. Please Login.';
  				this.logout();
  			} else
  			{
  				this.message = 'Unexpected Error!';
  			}
  		}
  	);
  }
}

