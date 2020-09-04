import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
declare let Swal;

@Injectable({ providedIn: 'root' })
export class AuthService {
  public userData: Observable<any>;
  constructor(private apollo: Apollo,  private router: Router) {}
  /**
   * login
   * @param username
   * @param pwd
   */
  login(username: string, pwd: string) {
    const payload = `username: "${username}"  , password:  "${pwd}"`;
    let userData: User = {};
    console.log(' payload ', payload);
    //Query const
    const GET_USER = gql`
        query {
          validateUser( ${payload}){
            access_token
            error
           }
        }`;
    //Request
    try {
      this.apollo
      .watchQuery({
        query: GET_USER,
      })
      .valueChanges.subscribe(res=>{
        console.log("res AUTH "  ,res);
        const data: any = res.data;
        this.validateUserResult(data?.validateUser[0]);
      });
    console.log("AUTH userData " ,userData )
    } catch (error) {
       console.log("error " , error)
    }

    //end request
  }

  /**
   * validateUserResult
   * @param result
   */
  validateUserResult(result) {
    if (result.error) {
      const errorData = JSON.parse(result.error);
      Swal.fire({
        icon: 'error',
        title: errorData.response.statusCode,
        text: errorData.response.error,
      });
    } else if (result?.access_token) {
      sessionStorage.setItem('token', result.access_token);
      console.log('userResult: ', jwt_decode(result.access_token));
      this.router.navigate(['/']);
     
    }
 
  }

 /**
  * getCurrentUser
  */
  getCurrentUser(): User {
    const token:string = sessionStorage.getItem('token');
    if(token){
      const user = jwt_decode(token);
      return user;
    }
    return {};
  }
}
