import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/entities/loginModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { RegisterModel } from '../models/entities/registerModel';
import { ConfirmCode } from '../models/entities/confirmCodeModel';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { UserInfo } from '../models/entities/userInfo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { TokenModel } from '../models/entities/tokenModel';
import { UserForLogin } from '../models/entities/userForLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44328/api/auth/"
  private authToken: string | null = null;

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private localStorage: LocalStorageService) { }

  private loggedIn = new BehaviorSubject<boolean>(this.isTokenExpired());

  public get loginStatus() {
    return this.loggedIn.asObservable();
  }

  public get isLoggedIn() {
    return this.loggedIn.getValue();
  }

  public set isLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  }

  private isTokenExpired(): boolean {
    let token = this.getToken();
    if (token !=null) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  private getToken(): string | null {
    return this.localStorage.getItem("token");
  }



  login(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user)

  }

  register(newUser: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'register'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, newUser)
  }

  confirmCode(confirmCode: ConfirmCode): Observable<SingleResponseModel<ConfirmCode>> {
    let newPath = this.apiUrl + 'confirmcode'
    return this.httpClient.post<SingleResponseModel<ConfirmCode>>(newPath, confirmCode)
  }


  getregistermail(): Observable<string> {
    let newPath = this.apiUrl + 'registermail'
    return this.httpClient.get<string>(newPath)
  }

  getuserinfos(): Observable<ListResponseModel<UserInfo>> {
      let newPath = this.apiUrl + 'getuserinfo'
      return this.httpClient.get<ListResponseModel<UserInfo>>(newPath);

}

getUser(): UserForLogin | undefined {
  let token = this.getToken();
  if (token != null) {
    let tokenDetails = Object.entries(this.jwtHelper.decodeToken(token));
    let user: UserForLogin = new UserForLogin;
    tokenDetails.forEach(detail => {
      switch (detail[0]) {
        case "email": {
          user.email = String(detail[1]);
          break;
        }
        case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
          user.name = String(detail[1]);
          break;
        }
        case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
          user.roles = detail[1] as Array<string>
          break;
        }
        case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
          user.id = Number(detail[1]);
        }
      }
    });
    if (!user.roles) {  //if the user does not have a role
      user.roles = [];
    }
    return user;
  }
  return undefined;
}



  // getUserInfoFromLocalStorage(): UserInfo | null {
  //   // Kullanıcı bilgilerini localStorage'dan al
  //   const userInfoString = localStorage.getItem('userInfo');
  //   if (userInfoString) {
  //     return JSON.parse(userInfoString);
  //   }
  //   return null;
  // }
}
