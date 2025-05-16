import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {  MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HeaderComponent,
    MatTooltipModule,
    CommonModule,
    MatSnackBarModule,
    
    
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Kontaktformular-Daten:', this.contactForm.value);

      this.snackBar.open('Nachricht erfolgreich gesendet!', 'Schließen', {
        duration: 4000,
        panelClass: ['snackbar-success'],
      });

      this.contactForm.reset();
      this.submitted = false;
    }
  }
}
