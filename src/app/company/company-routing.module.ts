import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component'
import { CompanyDetailsComponent } from './company-details/company-details.component'

const routes: Routes = [
  { path: '', component : CompaniesComponent },
  { path: ':id', component : CompanyDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
