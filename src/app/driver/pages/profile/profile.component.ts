import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private driverService: DriverService) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      vehicleType: ['', Validators.required],
      modelName: ['', Validators.required]
    });

    this.driverService.getProfile().subscribe(profile => {
      this.profileForm.patchValue(profile);
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.driverService.updateProfile(this.profileForm.value).subscribe(() => {
        alert('تم تحديث الملف الشخصي بنجاح');
      });
    }
  }
}
