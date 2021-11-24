import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../../services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'telefone', 'tipo', 'endereco', 'actions'];
  companies: Company[] = [];

  constructor(private companyService: CompanyService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(res => {
      this.companies = res;
    },
      error => {
        this.snackBar.open(error.message, 'OK', {
          verticalPosition: 'top'
        });
      });
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id).subscribe(res => {
      this.companies = this.companies.filter(o => o.id !== id);
    },
      error => {
        this.snackBar.open(error.message, 'OK', {
          verticalPosition: 'top'
        });
      });
  }

}
