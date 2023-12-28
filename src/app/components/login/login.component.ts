import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/entities/user';
import { UserInfo } from 'src/app/models/entities/userInfo';
import { VeterinaryClinic } from 'src/app/models/entities/veterinaryClinic';
import { AuthService } from 'src/app/services/auth.service';
import { VeterinaryClinicService } from 'src/app/services/veterinary-clinic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  veterinaryClinics: VeterinaryClinic[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.userInfo();
    
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    if (this.loginForm.valid) {
      let user = Object.assign({}, this.loginForm.value);
      this.authService.login(user).subscribe({
        next: (successResponse) => {
          // this.router.navigate([""]);
          console.log(successResponse)
        }, error: (errorResponse) => {
          console.log(errorResponse);
        }
      })
    }
  }

  userInfo() {
    this.authService.getuserinfos().subscribe(response => {
      console.log('response', response);
    })
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
