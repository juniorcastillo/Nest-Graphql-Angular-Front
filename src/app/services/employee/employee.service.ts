import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Employee } from 'src/app/models/employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}
  /**
   * createEmployee
   * @param payload Employee
   */
  async createEmployee(payload: Employee) {
    const req = `name: "${payload.name}", lastname: "${payload.lastname}" , age: ${payload.age} 
      , occupation: "${payload.occupation}" , address: "${payload.address}"`;
    const CREATE_EMPLOYEE = gql`
      mutation{
         createemployee(input: {${req}} ) {
            name
            lastname
            age
            occupation
            address
            id
          } 
      }`;

    this.apollo
      .mutate({
        mutation: CREATE_EMPLOYEE,
      })
      .subscribe((res) => {
        location.reload();
      });
  }

  editEmployee(payload: Employee) {
    const req = `name: "${payload.name}", lastname: "${payload.lastname}" , age: ${payload.age} 
    , occupation: "${payload.occupation}" , address: "${payload.address}"`;
    console.log("UPDATE_EMPLOYEE req:" , req)
    const UPDATE_EMPLOYEE = gql`
    mutation{
      updateemployee(id: "${payload.id}", input:{${req}} ) {
          name
          lastname
          age
          occupation
          address
          id
        } 
    }`;
  console.log("UPDATE_EMPLOYEE " , UPDATE_EMPLOYEE)
    this.apollo
      .mutate({
        mutation: UPDATE_EMPLOYEE,
      })
      .subscribe((res) => {
        location.reload();
      });
  }
}
