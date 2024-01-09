import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  confirmForm: FormGroup;
  userInfo: any;


  constructor (
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      this.createRegisterForm();
  }
  

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      tcid: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let newUser = Object.assign({}, this.registerForm.value);
      this.authService.register(newUser).subscribe({next: successResponse => {
        console.log(successResponse,"İşlem başarılı", "Giriş yapıldı");
        this.router.navigate(["/confirm"]);
      }, error : errorResponse => {
        console.log(errorResponse, "Kayıt başarısız");
      }
    })
    } else {
      console.log("Bilgilerinizden bazıları doğrulanamadı", "Formunuz hatalı");
    }
  }
}
