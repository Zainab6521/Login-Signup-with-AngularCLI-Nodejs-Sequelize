import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regform: FormGroup ;

  constructor(
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router: Router 
    ) { }

  ngOnInit(): void {
    this.regform =  this.formBuilder.group( {
      name : '',
      email : '',
      password : '',
    })
  }
  submit(): void {
    this.http.post('http://localhost:3000/v1/api/register-user', this.regform?.getRawValue())
    .subscribe( res=> this.router.navigate(['/login'])
    );
    this.regform.reset();
  }
}



