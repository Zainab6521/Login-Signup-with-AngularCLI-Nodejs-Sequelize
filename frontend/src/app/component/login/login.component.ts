import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  router: Router;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email: '',
      password: ''
    })
  }
submit(): void{
  this.http.post('http://localhost:3000/v1/api/login-user', this.loginForm.getRawValue(), {withCredentials: true})
  .subscribe(res =>this.router.navigate(['/home'])
  )
}
}
