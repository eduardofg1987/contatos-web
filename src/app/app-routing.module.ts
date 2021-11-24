import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'contatos'},
  {
    path: 'contatos',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'empresas',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
