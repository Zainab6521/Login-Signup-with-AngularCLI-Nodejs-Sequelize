import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/v1/api/get-user/:id', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.message = `Hi, ${res.name}`;
        },
        (err) => {
          this.message = "You are not Logged In.";
        }
      );
  }
}
