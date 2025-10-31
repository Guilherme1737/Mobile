import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonCheckbox,
  IonSpinner,
  ToastController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonText,
    IonCheckbox,
    IonSpinner
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.showToast('Por favor, preencha todos os campos corretamente', 'danger');
      return;
    }

    this.isLoading = true;
    const { email, password, rememberMe } = this.loginForm.value;

    try {
      // Simular chamada de API
      setTimeout(() => {
        this.isLoading = false;
        console.log('Login realizado:', { email, rememberMe });
        this.showToast('Login realizado com sucesso!', 'success');
        // this.router.navigate(['/home']);
      }, 2000);
    } catch (error) {
      this.isLoading = false;
      this.showToast('Erro ao fazer login. Tente novamente.', 'danger');
    }
  }

  onSignup() {
    this.showToast('Navegando para cadastro...', 'primary');
    // this.router.navigate(['/signup']);
  }

  onForgotPassword() {
    this.showToast('Navegando para recuperação de senha...', 'primary');
    // this.router.navigate(['/forgot-password']);
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'primary' = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
