import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  chevronForwardOutline,
  alertCircleOutline,
  logoApple,
} from 'ionicons/icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule],
})
export class SignInPage implements OnInit {
  email = '';
  password = '';

  emailFocused = false;
  passFocused = false;
  showPassword = false;
  isLoading = false;
  errorMsg = '';

  constructor(private router: Router) {
    addIcons({
      arrowBackOutline,
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      chevronForwardOutline,
      alertCircleOutline,
      logoApple,
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl('/login');
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  forgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }
  goToRegister() {
    this.router.navigateByUrl('/register');
  }
  loginGoogle() {
    console.log('Google sign in'); /* TODO: Firebase/OAuth */
  }
  loginApple() {
    console.log('Apple sign in'); /* TODO: Apple Sign-In */
  }

  async signIn() {
    this.errorMsg = '';

    if (!this.email.trim()) {
      this.errorMsg = 'Please enter your email address.';
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.errorMsg = 'Please enter a valid email address.';
      return;
    }
    if (!this.password) {
      this.errorMsg = 'Please enter your password.';
      return;
    }

    this.isLoading = true;
    try {
      // TODO: gantikan dengan auth service sebenar
      // await this.authService.signIn(this.email, this.password);
      await this.mockSignIn();
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (err: any) {
      this.errorMsg = err?.message ?? 'Sign in failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private isValidEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  // Buang method ni bila auth service dah ready
  private mockSignIn(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.email === 'test@nura.app' && this.password === 'password'
          ? resolve()
          : reject({ message: 'Incorrect email or password.' });
      }, 1500);
    });
  }
}
