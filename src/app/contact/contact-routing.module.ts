import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component'
import { ContactDetailsComponent } from './contact-details/contact-details.component'

const routes: Routes = [
  { path: '', component : ContactsComponent },
  { path: ':id', component : ContactDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
