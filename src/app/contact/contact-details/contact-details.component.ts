import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddEditContact } from 'src/app/models/add-edit-contact.model';
import { Contact } from 'src/app/models/contact.model';
import { Company } from 'src/app/models/company.model';
import { ContactService } from '../../services/contact.service';
import { CompanyService } from '../../services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  companies: Company[] = [];

  contact: Contact = new Contact(0, '', '', '', new Company(0, '', '', '', '', '', '', '', '', '', ''));
  contactId: number = 0;

  contactForm!: FormGroup;
  addEditContact!: AddEditContact;

  isEdit: Boolean = false;

  constructor(private contactService: ContactService,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.getCompanies();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != 'novo-contato') {
        this.isEdit = true;
        this.contactId = params['id'];
        this.getContact(this.contactId);
      } else {
        this.contactForm = this.createForm();
      }
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(res => {
      this.companies = res;
    },
      error => {
        this.snackBar.open(error.message, 'OK', {
          verticalPosition: 'top'
        });
      });
  }

  getContact(id: number) {
    this.contactService.getContact(id).subscribe(res => {
      this.contact = res;
      this.contactForm = this.createForm();
    },
      error => {
        this.snackBar.open(error.message, 'OK', {
          verticalPosition: 'top'
        });
      });
  }

  createForm(): FormGroup {
    return this.fb.group({
      nomeCompleto: [this.contact.nomeCompleto],
      email: [this.contact.email],
      telefone: [this.contact.telefone],
      empresa: [this.contact.empresa.id]
    });
  }

  saveContact(): void {
    this.addEditContact = { ...this.contactForm.value };
    if (this.isEdit) {
      this.contactService.editContact(this.contactId, this.addEditContact).subscribe(res => {
        this.contact = res;
        this.router.navigate(['/contatos']);
      },
        error => {
          this.snackBar.open(error.message, 'OK', {
            verticalPosition: 'top'
          });
        });
    } else {
      this.contactService.addContact(this.addEditContact).subscribe(res => {
        this.contact = res;
        this.router.navigate(['/contatos']);
      },
        error => {
          this.snackBar.open(error.message, 'OK', {
            verticalPosition: 'top'
          });
        });
    }
  }

}
