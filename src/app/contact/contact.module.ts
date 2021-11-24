import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';


@NgModule({
  declarations: [
    ContactsComponent,
    ContactDetailsComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class ContactModule { }
