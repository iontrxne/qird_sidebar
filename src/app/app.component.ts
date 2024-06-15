import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMAT } from './adapters/date.adapter';
import { FormsModule, FormControl, Validators, ReactiveFormsModule} from "@angular/forms";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


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
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMAT},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    provideNgxMask()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

//Смена личности гражданина
  selectedPersonalityValue: string = '';

  onChangePersonality(value: string) {
    this.selectedPersonalityValue = value;
  }

// Проверка на валидность

  formControls = {
    lastName: new FormControl('', Validators.pattern('^[А-Яа-яЁё\s]+$')),
    firstName: new FormControl('', Validators.pattern('^[А-Яа-яЁё\s]+$')),
    patronymic: new FormControl('', Validators.pattern('^[А-Яа-яЁё\s]+$')),
    telephone: new FormControl('', [Validators.pattern('^[0-9 ]*$'), Validators.minLength(10)]),
    additionalTelephone: new FormControl('', [Validators.pattern('^[0-9 ]*$'), Validators.minLength(10)]),
    birthdayDate: new FormControl('', 
    //Validators.pattern('^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$')
    )
  };
}