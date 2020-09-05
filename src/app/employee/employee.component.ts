import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_EMPLOYEE } from './employee.request';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../models/employee';
declare let $ :any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  public employees: Observable<any>;
  public userData: User;
  public employeeDataReq: Employee = {};
  public employeeSeleted: Employee ={};
  
  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private employeeService: EmployeeService
  ) {}
  @ViewChild('content') contentModal: any;
  ngOnInit(): void {
   
    this.userData = this.authService.getCurrentUser();
    this.employees = this.apollo
      .watchQuery({
        query: GET_EMPLOYEE,
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.employees;
        })
      );
  }

  addEmployee(data) {

    let payload: Employee = {};
    let isFilled = true;
    const createAlertEmp = document.getElementById(
      'createAlertEmp'
    ) as HTMLElement;
    Array.from(data.elements).forEach((element: HTMLElement) => {
      if (element['value']) {
        payload[element['name']] = element['value'];
      } else {
        createAlertEmp.style.display = 'block';
        isFilled = false;
      }
    });

    if (isFilled) {
      payload.age = Number(payload.age);
      this.employeeService.createEmployee(payload);
    }
  }

  openEditModal(data:Employee){
    console.log("openEditModal " , data)
    $('#staticEditEmploye').modal();
    this.employeeSeleted = {...data};
  }

  editEmployee(data:Employee){
    console.log( "editEmployee: ",this.employeeSeleted )
    this.employeeService.editEmployee(this.employeeSeleted);
  }
}
