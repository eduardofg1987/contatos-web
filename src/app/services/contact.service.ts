import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact } from '../models/contact.model';
import { AddEditContact } from '../models/add-edit-contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiRoot: string;

  constructor(public http: HttpClient) {
    this.apiRoot = environment.api_url;
  }

  getContacts(): Observable<any> {
    return this.http.get<Contact[]>(this.apiRoot + 'contato');
  }

  getContact(id: number): Observable<any> {
    return this.http.get<Contact>(this.apiRoot + 'contato/' + id);
  }

  addContact(addEditContact: AddEditContact): Observable<any> {
    return this.http.post<Contact>(this.apiRoot + 'contato/', addEditContact);
  }

  editContact(id: number, addEditContact: AddEditContact): Observable<any> {
    return this.http.put<Contact>(this.apiRoot + 'contato/' + id, addEditContact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<Contact>(this.apiRoot + 'contato/' + id);
  }
}
