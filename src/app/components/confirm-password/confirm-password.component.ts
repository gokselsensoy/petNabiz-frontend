import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmCode } from 'src/app/models/entities/confirmCodeModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit{
  confirmForm: FormGroup;


  constructor (
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
      this.createConfirmForm();
      this.getRegisterMail();
  }

  createConfirmForm() {
    this.confirmForm = this.formBuilder.group({
      email: ['', Validators.required],
      confirmCode: ['', Validators.required],
    })
  }

  confirm() {
    if (this.confirmForm.valid) {
      let confirmCode = Object.assign({}, this.confirmForm.value);
      this.authService.confirmCode(confirmCode).subscribe({
        next: (successResponse) => {
          this.router.navigate(["/login"]);
          console.log(successResponse)
        }, error: (errorResponse) => {
          console.log(errorResponse);
        }
      })
    }
  }

  getRegisterMail(): void {
    this.authService.getregistermail().subscribe({ next:
      (response: string) => {
        console.log('Register Mail:', response);
      },
      error : (errorResponse) => {
        console.error('API Hatası:', errorResponse);
      }
    });
  }

  // registerMail() {
  //   this.authService.getregistermail().subscribe(
  //     response => {
  //       if (response !== null) {
  //         console.log('API Yanıtı:', response);
  //       } else {
  //         console.error('API, beklenen değeri döndürmedi.');
  //       }
  //     },
  //     error => {
  //       console.error('API İsteği Hatası:', error);
  //     }
  //   );
  // }

}
