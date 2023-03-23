import { Injectable } from '@angular/core';
import { IUserRole } from "../dbo/permissions"
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class PermissionsService { 

  private userRoles: BehaviorSubject<IUserRole[]> = new BehaviorSubject<IUserRole[]>([]);
  private rolePermissions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  userRoles$ = this.userRoles.asObservable();
  rolePermission$ = this.rolePermissions.asObservable();

  constructor() {
    this.loadUserRoles();
  }

  private loadUserRoles() {
    const userRoles: IUserRole[] = [
      { id: 1, name: 'Admin', description: 'Admin has all permission', permission: [] },
      { id: 2, name: 'Editor', description: 'Editor has only edit control permission. Editor does not have Button permission', permission: [] },
      { id: 3, name: 'Publisher', description: 'Publisher has only Button permission.', permission: [] },
      { id: 4, name: 'User', description: 'User has only view permission', permission: [] }
    ];
    this.loadRolePermission(userRoles);
    this.userRoles.next(userRoles);
  }

  private loadRolePermission(userRoles: IUserRole[]) {   
    for (const userRole of userRoles) {
      if (userRole.id == 1) {
        userRole.permission = ['scope.control', 'scope.button', 'scope.disable.button'];
      } else if (userRole.id == 2) {
        userRole.permission = ['scope.control'];
      } else if (userRole.id == 3) {
        userRole.permission = ['scope.button', 'scope.disable.button'];
      } else {
        userRole.permission = [];
      }
    }
  }

}
