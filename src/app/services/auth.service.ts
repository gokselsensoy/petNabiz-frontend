import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/entities/loginModel';
import { Observable, tap } from 'rxjs';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { User } from '../models/entities/user';
import { RegisterModel } from '../models/entities/registerModel';
import { ConfirmCode } from '../models/entities/confirmCodeModel';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { UserInfo } from '../models/entities/userInfo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { TokenModel } from '../models/entities/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44328/api/auth/"
  private authToken: string | null = null;

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private localStorage: LocalStorageService) { }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }

    return false;
  }

  login(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user)

  }

  register(newUser: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'register'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, newUser)
      // .pipe(
      //   tap(response => {
      //     // Kayıt başarılı olduğunda JWT token'ını alıp localStorage'a ekleyin
      //     if (response.success) {
      //       localStorage.setItem('token', response.data.token);
      //       // Kullanıcı bilgilerini isteğe bağlı olarak localStorage'a ekleyebilirsiniz
      //       localStorage.setItem('userInfo', JSON.stringify(response.data));
      //     }
      //   })
      // );
  }

  confirmCode(confirmCode: ConfirmCode): Observable<SingleResponseModel<ConfirmCode>> {
    let newPath = this.apiUrl + 'confirmcode'
    return this.httpClient.post<SingleResponseModel<ConfirmCode>>(newPath, confirmCode)
  }


  //BURDAKİ İKİ REQUESTTEN DATA ALAMIYORUM
  //BACKENDDE BAŞKA DENEMELER YAPTIM SONRA ESKİ HALİNE DÖNDÜRDÜM

  getregistermail(): Observable<string> {
    let newPath = this.apiUrl + 'registermail'
    return this.httpClient.get<string>(newPath)
  }

  getuserinfos(): Observable<UserInfo> {
    let newPath = this.apiUrl + 'getuserinfo'
    return this.httpClient.get<UserInfo>(newPath);
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
