import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/entities/user';
import { UserForLogin } from 'src/app/models/entities/userForLogin';
import { UserInfo } from 'src/app/models/entities/userInfo';
import { VeterinaryClinic } from 'src/app/models/entities/veterinaryClinic';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { VeterinaryClinicService } from 'src/app/services/veterinary-clinic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  veterinaryClinics: VeterinaryClinic[];
  userInfo: UserInfo[];
  currentUser: UserForLogin;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();

    
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    if (this.loginForm.valid) {
      let user = Object.assign({}, this.loginForm.value);
      this.authService.login(user).subscribe({
        next: (successResponse) => {
          if (successResponse.data && successResponse.data.token) {
            this.localStorage.add("token", successResponse.data.token);
            this.authService.isLoggedIn = true;
            console.log(successResponse);
            this.getCurrentUser();
          } else {
            // Token alınamadı veya hatalı bir yapı varsa
            console.error("Invalid token structure in the response:", successResponse);
          }
        }, error: (errorResponse) => {
          this.authService.isLoggedIn = false;
          console.log(errorResponse);
        }
      })
    }
  }

  getUserInfo() {
    let token = this.localStorage.getItem("token");
    if (token != null) {    
      this.authService.getuserinfos().subscribe(response => {
      this.userInfo = response.data;
      console.log(response.data, token, 'token var');
    })
    } else {
      console.log('token yok');
    }
  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
    console.log(this.currentUser, 'bulduk');
  }

  // userInfo() {
  //   const userInfoFromLocalStorage = this.authService.getUserInfoFromLocalStorage();

  //   if (userInfoFromLocalStorage) {
  //     // Eğer localStorage'da kullanıcı bilgileri varsa, bunları kullanabilirsiniz
  //     console.log(userInfoFromLocalStorage);
  //   } else {
  //     // Eğer localStorage'da kullanıcı bilgileri yoksa, API'den al
  //     this.authService.getuserinfos().subscribe((userInfo) => {
  //       // Kullanıcı bilgilerini işle (örneğin, ekrana yazdır)
  //       console.log('userinfo:::', userInfo);
        
  //       // Kullanıcı bilgilerini localStorage'a kaydet
  //       localStorage.setItem('userInfo', JSON.stringify(userInfo));
  //     });
  //   }
  // }



}
