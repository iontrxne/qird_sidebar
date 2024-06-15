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

//Данные из полей selected

  selectedPersonalityValue: string | null = null;
  selectedGender: string | null = null;
  selectedDoctor: string | null = null;
  selectedSpecialization: string | null = null;
  selectedReferringDoctor: string | null = null;
  selectedChannel: string | null = null;
  selectedService: string | null = null;
  selectedStartTime: string | null = null;
  selectedEndTime: string | null = null;

//Смена личности гражданина

  onChangePersonality(value: string) {
    this.selectedPersonalityValue = value;
  }

// Проверка на валидность

  formControls = {
    lastName: new FormControl(null, Validators.pattern('^[А-Яа-яЁё\s]+$')),
    firstName: new FormControl(null, Validators.pattern('^[А-Яа-яЁё\s]+$')),
    patronymic: new FormControl(null, Validators.pattern('^[А-Яа-яЁё\s]+$')),
    telephone: new FormControl(null, Validators.minLength(10)),
    additionalTelephone: new FormControl('', Validators.minLength(10)),
    birthdayDate: new FormControl(null, Validators.pattern('')), // Надо сделать проверку на наличие букв
    admissionDate: new FormControl(null, Validators.pattern('')), // Надо сделать проверку на наличие букв
    visitPurpose: new FormControl(null, Validators.minLength(1)),
  };

// Очистка значения полей

  clearDateField() {
    this.formControls.admissionDate.setValue(null);
  }

  clearBirthdayField() {
    this.formControls.birthdayDate.setValue(null);
  }

//Данные из форм
  createAdmission() {
    const formData = {
      personData: {
        personality: this.selectedPersonalityValue,
        lastName: this.formControls.lastName.value,
        firstName: this.formControls.firstName.value,
        patronymic: this.formControls.patronymic.value,
        birthdayDate: this.formControls.birthdayDate.value,
        gender: this.selectedGender,
        telephone: {
          mainTelephone: this.formControls.telephone.value,
          additionalTelephone: this.formControls.additionalTelephone.value,
        },
      },
      admissionData: {
        admissionDate: this.formControls.admissionDate.value,
        startTime: this.selectedStartTime,
        endTime: this.selectedEndTime,
        service: this.selectedService
      },
      doctorData: {
        doctor: this.selectedDoctor,
        specialization: this.selectedSpecialization,
        referringDoctor: this.selectedReferringDoctor,
        channel: this.selectedChannel,
        visitPurpose: this.formControls.visitPurpose.value,
      },
    };

    console.log('Создана запись:', formData);
  }

// Кнопка записи

  SubmitButtonIsVisible: boolean = true

  onChangeButtonVisible() {
    this.SubmitButtonIsVisible = !this.SubmitButtonIsVisible
  }
}