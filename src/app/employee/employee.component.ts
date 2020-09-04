import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_EMPLOYEE } from './employee.request';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: Observable<any>;
  constructor(private apollo: Apollo) {

  }

  ngOnInit(): void {
    console.log("INIT")
    this.employees = this.apollo.watchQuery({
       query: GET_EMPLOYEE
    })
    .valueChanges.pipe(
      map((result: any)=>{
        console.log("Result: " , result.data.employees); 
        return result.data.employees;
       })
    );
   
   
  }
}
