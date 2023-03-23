import { Component, OnInit } from '@angular/core';
import { IUserRole } from 'src/app/dbo/permissions';
import { PermissionsService } from 'src/app/services/permissions.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-sample-component',
  templateUrl: './sample-component.component.html',
  styleUrls: ['./sample-component.component.scss']
})
export class SampleComponentComponent implements OnInit {

  userRoles: IUserRole[] = [];
  displayedColumns: string[] = ['SNo', 'Role', 'Description'];
  options: string[] = ['India', 'US', 'Germany'];
  permissionForm: FormGroup;
  currentRoleId: number = 1;
  disableButton: boolean = false;  

  constructor(private permissionsService: PermissionsService, private fromBuilder: FormBuilder,
    private ngxPermissionsService: NgxPermissionsService) {

    this.permissionForm = this.fromBuilder.group({
      userRoles: new FormControl(this.currentRoleId, Validators.required),
      name: new FormControl('Bob', Validators.required),
      emailId: new FormControl('bob@test.com', [Validators.required, Validators.email]),
      gender: new FormControl('Male', Validators.required),
      country: new FormControl('India', Validators.required),
      age: new FormControl(true, Validators.required)
    });

  }

  ngOnInit() {
    this.permissionsService.userRoles$.subscribe((userRoles: IUserRole[]) => {
      this.userRoles = userRoles;
      this.loadPermission();
    });
  }

  onChangeUserRole(event: any) {
    this.currentRoleId = event.value;
    this.loadPermission();
  }

  loadPermission() {
    const userRole = this.userRoles.find(x => x.id === this.currentRoleId);
    if (userRole === undefined) { alert('Not able to find role'); return; }

    this.ngxPermissionsService.flushPermissions();
    this.ngxPermissionsService.loadPermissions(userRole.permission);

  }

  authorizedControl() {
    const controlNames = Object.keys(this.permissionForm.controls);
    for (const controlName of controlNames) {
      if (controlName === "userRoles") { continue; }
      this.permissionForm.get(controlName)?.enable();
    }
  }

  unauthorizedControl() {
    const controlNames = Object.keys(this.permissionForm.controls);
    for (const controlName of controlNames) {
      if (controlName === "userRoles") { continue; }
      this.permissionForm.get(controlName)?.disable();
      this.permissionForm.controls[controlName].disable();
    }
  }

  authorizedButton() {
    this.disableButton = false;
  }

  unauthorizedButton() {
    this.disableButton = true;
  } 

}
