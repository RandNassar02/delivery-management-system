import { Component } from '@angular/core';
import { Customer } from '../../../../model/customer.model';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-customer-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss',
})
export class CustomerProfileComponent {
  editForm!: FormGroup;

  Customer: Customer | null = null;
  editableCustomer: Partial<Customer> = {};
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    ) {
      const storedCustomer = localStorage.getItem('currentUser');
      if (!storedCustomer) {
        this.router.navigate(['/login']);
        return;
      }
      const customersdata: Customer = JSON.parse(storedCustomer);
      this.customerService.getCustomers(customersdata.id).subscribe({
        next: (freshCustomer) => {
          this.Customer = freshCustomer;
        },
        error: () => {},
      });
    }
    this.initForm();
  }
  selectedImage: string | ArrayBuffer | null = null;
  showFileInput = true;

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.showFileInput = false;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }
  showEditSection = false;

  toggleEditSection() {
    if (!this.Customer) return;
    this.editForm.patchValue({
      name: this.Customer.name,
      email: this.Customer.email,
      phone: this.Customer.phone,
      address: this.Customer.address,
    });
    this.showEditSection = true;
  }

  cancelEdit() {
    this.showEditSection = false;
  }

  saveChanges() {
    if (this.Customer && this.editForm.valid) {
      const updatedCustomer = { ...this.Customer, ...this.editForm.value };
      this.customerService
        .updateCustomer(String(this.Customer.id), updatedCustomer)
        .subscribe((updatedData) => {
          this.Customer = updatedData;
          this.showEditSection = false;
        });
    }
  }
  initForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
