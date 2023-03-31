import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  loginForm!: FormGroup;
  errorMsg = ''
  token = ''
  successMessage = ''

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {



  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }




  onSubmit(): void {

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.successMessage = '';
      this.errorMsg = '';
      this.authService.login(email, password).subscribe(
        response => {
          this.successMessage = 'Iniciando sesion correctamente';
          localStorage.setItem('token', response.accesToken);
          localStorage.setItem('id_user', response.user.id); // Aquí se obtiene el ID del usuario
          this.router.navigateByUrl('/home');
        },
        error => {
          console.log('Error', error);
          this.errorMsg = error.error.error;
        }
      );
    }
  }
}


