import { Component } from '@angular/core';
import { Customer } from '../../../../model/customer.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-customer-edit-account',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-edit-account.component.html',
  styleUrl: './customer-edit-account.component.scss',
})
export class CustomerEditAccountComponent {
  editForm!: FormGroup;

  Customer: Customer | null = null;
  editableCustomer: Partial<Customer> = {};

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();

    const storedCustomer = localStorage.getItem('currentUser');
    if (!storedCustomer) {
      this.router.navigate(['/login']);
      return;
    }

    const customersdata: Customer = JSON.parse(storedCustomer);
    this.customerService.getCustomers(customersdata.id).subscribe({
      next: (freshCustomer) => {
        this.Customer = freshCustomer;

        this.editForm.patchValue({
          name: freshCustomer.name,
          email: freshCustomer.email,
          phone: freshCustomer.phone,
          address: freshCustomer.address,
        });
      },
    });
  }

  saveChanges() {
    if (this.Customer && this.editForm.valid) {
      const updatedCustomer = { ...this.Customer, ...this.editForm.value };
      this.customerService
        .updateCustomer(String(this.Customer.id), updatedCustomer)
        .subscribe((updatedData) => {
          this.Customer = updatedData;
        });
    }

    this.router.navigate(['/customer-account']);
  }

  initForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'sucsses',
      detail: 'Edit Account Completed Successfully',
    });
  }
}
