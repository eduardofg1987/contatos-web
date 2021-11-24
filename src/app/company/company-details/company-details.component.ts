import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddEditCompany } from 'src/app/models/add-edit-company.model';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from '../../services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  company: Company = new Company(0, '', '', '', '', '', '', '', '', '', '');
  companyId: number = 0;

  companyForm!: FormGroup;
  addEditCompany!: AddEditCompany

  isEdit: Boolean = false;

  constructor(private companyService: CompanyService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != 'nova-empresa') {
        this.isEdit = true;
        this.companyId = params['id'];
        this.getCompany(this.companyId);
      } else {
        this.companyForm = this.createForm();
      }
    });
  }

  getCompany(id: number) {
    this.companyService.getCompany(id).subscribe(res => {
      this.company = res;
      this.companyForm = this.createForm();
    },
      error => {
        this.snackBar.open(error.message, 'OK', {
          verticalPosition: 'top'
        });
      });
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.company.id],
      tipo: [this.company.tipo],
      nome: [this.company.nome],
      telefone: [this.company.telefone],
      enderecoLogradouro: [this.company.enderecoLogradouro],
      enderecoNumero: [this.company.enderecoNumero],
      enderecoComplemento: [this.company.enderecoComplemento],
      enderecoBairro: [this.company.enderecoBairro],
      enderecoCidade: [this.company.enderecoCidade],
      enderecoUf: [this.company.enderecoUf],
      enderecoCep: [this.company.enderecoCep]
    });
  }

  saveCompany(): void {
    this.addEditCompany = { ...this.companyForm.value };
    if (this.isEdit) {
      this.companyService.editCompany(this.companyId, this.addEditCompany).subscribe(res => {
        this.company = res;
        this.router.navigate(['/empresas']);
      },
        error => {
          this.snackBar.open(error.message, 'OK', {
            verticalPosition: 'top'
          });
        });
    } else {
      this.companyService.addCompany(this.addEditCompany).subscribe(res => {
        this.company = res;
        this.router.navigate(['/empresas']);
      },
        error => {
          this.snackBar.open(error.message, 'OK', {
            verticalPosition: 'top'
          });
        });
    }
  }

  getCep(event: Event) {
    let cep = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    this.companyService.getAddress(cep).subscribe(endereco => {
      this.companyForm.controls['enderecoLogradouro'].setValue(endereco.logradouro);
      this.companyForm.controls['enderecoComplemento'].setValue(endereco.complemento);
      this.companyForm.controls['enderecoBairro'].setValue(endereco.bairro);
      this.companyForm.controls['enderecoCidade'].setValue(endereco.localidade);
      this.companyForm.controls['enderecoUf'].setValue(endereco.uf);
    });
  }

}
