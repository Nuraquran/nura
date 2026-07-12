// src/app/pages/sign-in/sign-in.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonIcon,
  ToastController,
} from '@ionic/angular/standalone';
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
  closeCircleOutline,
  checkmarkCircleOutline,
  closeOutline,
} from 'ionicons/icons';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, ReactiveFormsModule],
})
export class SignInPage implements OnInit {
  form!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supabase: SupabaseService,
    private toastCtrl: ToastController,
  ) {
    addIcons({
      arrowBackOutline,
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      chevronForwardOutline,
      alertCircleOutline,
      logoApple,
      closeCircleOutline,
      checkmarkCircleOutline,
      closeOutline,
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.form.get('email')!;
  }
  get password() {
    return this.form.get('password')!;
  }

  get emailError(): string {
    if (!this.email.touched) return '';
    if (this.email.hasError('required')) return 'Email is required.';
    if (this.email.hasError('email')) return 'Enter a valid email address.';
    return '';
  }

  get passwordError(): string {
    if (!this.password.touched) return '';
    if (this.password.hasError('required')) return 'Password is required.';
    if (this.password.hasError('minlength'))
      return 'Password must be at least 6 characters.';
    return '';
  }

  // ── Toast — dark pill popup macam The Noor ─────────────────────────────────
  private async showToast(
    message: string,
    type: 'error' | 'success' = 'error',
  ) {
    try {
      await this.toastCtrl.dismiss();
    } catch {}

    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      cssClass: `nura-toast nura-toast--${type}`,
      icon:
        type === 'error' ? 'close-circle-outline' : 'checkmark-circle-outline',
      buttons: [{ icon: 'close-outline', role: 'cancel' }],
    });
    await toast.present();
  }

  // ── Actions ────────────────────────────────────────────────────────────────
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

  async signIn() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      await this.showToast('Please fill in all fields correctly.');
      return;
    }
    this.isLoading = true;
    try {
      await this.supabase.signIn(this.email.value.trim(), this.password.value);
      await this.showToast('Welcome back!', 'success');
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (err: any) {
      const msg = err?.message ?? '';
      if (msg.includes('Invalid login credentials')) {
        await this.showToast('Incorrect email or password.');
      } else if (msg.includes('Email not confirmed')) {
        await this.showToast('Please verify your email first.');
      } else {
        await this.showToast('Sign in failed. Please try again.');
      }
    } finally {
      this.isLoading = false;
    }
  }

  async loginGoogle() {
    try {
      await this.supabase.signInWithGoogle();
    } catch {
      await this.showToast('Google sign in failed.');
    }
  }

  async loginApple() {
    try {
      await this.supabase.signInWithApple();
    } catch {
      await this.showToast('Apple sign in failed.');
    }
  }
}
