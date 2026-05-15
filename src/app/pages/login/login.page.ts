import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  globeOutline,
  chevronDownOutline,
  chevronForwardOutline,
  sunnyOutline,
  lockClosedOutline,
  logoApple,
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule],
})
export class LoginPage implements OnInit {
  selectedLang = 'English';
  langOptions = ['English', 'Bahasa Melayu', 'العربية'];

  constructor(private router: Router) {
    addIcons({
      globeOutline,
      chevronDownOutline,
      chevronForwardOutline,
      sunnyOutline,
      lockClosedOutline,
      logoApple,
    });
  }

  ngOnInit() {}

  toggleLang() {
    const idx = this.langOptions.indexOf(this.selectedLang);
    this.selectedLang = this.langOptions[(idx + 1) % this.langOptions.length];
  }

  createAccount() {
    this.router.navigateByUrl('/register');
  }

  signIn() {
    this.router.navigateByUrl('/signin');
  }

  loginGoogle() {
    // TODO: integrate Google OAuth / Firebase Auth
    console.log('Google login');
  }

  loginApple() {
    // TODO: integrate Apple Sign-In
    console.log('Apple login');
  }
}
