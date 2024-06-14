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
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
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
  patronymic: new FormControl('', Validators.pattern('^[А-Яа-яЁё\s]+$'))
};

errorMessages = {
  lastName: signal(''),
  firstName: signal(''),
  patronymic: signal('')
};

constructor() {
  const controlsArray = Object.values(this.formControls).flatMap(control => [
    control.statusChanges,
    control.valueChanges
  ]);

  merge(...controlsArray)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessages());
}

updateErrorMessages() {
  (Object.keys(this.formControls) as (keyof typeof this.formControls)[]).forEach(key => {
    const control = this.formControls[key];
    const errorMessage = this.errorMessages[key];

    if (control.hasError('pattern')) {
      errorMessage.set('Введите корректные данные');
    } else {
      errorMessage.set('');
    }
  });
}
}