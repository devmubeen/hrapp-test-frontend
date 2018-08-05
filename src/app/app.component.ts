import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  employeeForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  END_POINT = "http://localhost:5000/api/";
  headers: Headers = new Headers();
  options: any;

  branches = [];
  employees = [];

  constructor(private fb: FormBuilder, private http: Http) {

    this.headers.append('Content-Type', 'application/json');
    this.options = new RequestOptions();
    this.options.headers = this.headers;
   }

  ngOnInit() {


    this.employeeForm = this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.compose([Validators.required])],
      'email' : ['', Validators.pattern(this.emailPattern)],
      'password' : ['', Validators.required],
      'branch': ['DEFAULT', Validators.required]
    });


    this.getBranches();
    this.getEmployees();

   

  }


  getBranches(){

     this.http.get(this.END_POINT + 'branch', this.options)
    .subscribe((response: Response) => {

      this.branches = response.json().data; 
      console.log(this.branches);

    });


  }


  addEmployee(values){

    console.log(values);
    this.http.post(this.END_POINT + 'emp',values, this.options)
    .subscribe((response: Response) => {
        let resp = response.json();
        console.log(resp);
        if(resp.success == true){
          this.getEmployees();
          this.employeeForm = this.fb.group({
            'firstname': ['', Validators.required],
            'lastname': ['', Validators.compose([Validators.required])],
            'email' : ['', Validators.pattern(this.emailPattern)],
            'password' : ['', Validators.required],
            'branch': ['DEFAULT', Validators.required]
          });

        }
        else{

          alert('Error Occured');
        }
        

    });
    
  }


  getEmployees(){

    this.http.get(this.END_POINT + 'emp', this.options)
    .subscribe((response: Response) => {

      this.employees = response.json().data; 
      console.log(this.employees);

    });


  }

  
}
