import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  displayedColumns: string[] = ['nomeCompleto', 'email', 'telefone', 'empresa', 'actions'];
  contacts: Contact[] = [];

  constructor(private contactService: ContactService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(res => {
      this.contacts = res;
    },
    error => {
      this.snackBar.open(error.message, 'OK', {
        verticalPosition: 'top'
      });
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(res => {
      this.contacts = this.contacts.filter(o => o.id !== id);
    },
    error => {
      this.snackBar.open(error.message, 'OK', {
        verticalPosition: 'top'
      });
    });
  }

}
