import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMAT } from './adapters/date.adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMAT},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}
  ],
})
export class AppComponent {
  genders = [
    {value: 'male', viewValue: 'Мужской'},
    {value: 'female', viewValue: 'Женский'},
  ];

  doctors = [
    {value: 'novikov a.v', viewValue: 'Новиков А.В.'},
    {value: 'smirnov v.e.', viewValue: 'Смирнов В.Е.'},
  ];

  specializations = [
    {value: 'andrologist', viewValue: 'Андролог'},
    {value: 'surgeon', viewValue: 'Хирург'},
  ];

  channels = [
    {value: 'social_networks', viewValue: 'Соц. сети'},
    {value: 'friends', viewValue: 'Друзья, знакомые'},
    {value: 'attending_physician', viewValue: 'Лечащий врач'},
    {value: 'advertisement', viewValue: 'Реклама'},
  ];

  services = [
    {value: 'сonsultation', viewValue: 'Консультация'},
  ];

  selectedPersonalityValue: string = '';

  onChangePersonality(value: string) {
    this.selectedPersonalityValue = value;
  }

};