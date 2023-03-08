import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHardwareComponent } from './add-hardware/add-hardware.component';
import { AddSoftwareComponent } from './add-software/add-software.component';
import { HardwareConfirmComponent } from './admin-confirm/hardware-confirm/hardware-confirm.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AssetFilteredListComponent } from './admin-filtered-lists/asset-filtered-list/asset-filtered-list.component';
import { HardwareFilteredListComponent } from './admin-filtered-lists/hardware-filtered-list/hardware-filtered-list.component';
import { AdminHardwareListComponent } from './admin-hardware-list/admin-hardware-list.component';
import { ApprovedHardwareListComponent } from './admin-hardware-requests/approved-hardware-list/approved-hardware-list.component';
import { OpenHardwareListComponent } from './admin-hardware-requests/open-hardware-list/open-hardware-list.component';
import { ApprovedSoftwareListComponent } from './admin-software-requests/approved-software-list/approved-software-list.component';
import { OpenSoftwareListComponent } from './admin-software-requests/open-software-list/open-software-list.component';
import { AuthguardService } from './authentication/authguard.service';
import { HardwareCancelConfirmComponent } from './cancel-confirm/hardware-cancel-confirm/hardware-cancel-confirm.component';
import { ConfirmHardwareRequestComponent } from './confirm-hardware-request/confirm-hardware-request.component';
import { HardwareEditViewComponent } from './edit-view/hardware-edit-view/hardware-edit-view.component';
import { SoftwareEditViewComponent } from './edit-view/software-edit-view/software-edit-view.component';
import { HardwareEditComponent } from './edit/hardware-edit/hardware-edit.component';
import { SoftwareEditComponent } from './edit/software-edit/software-edit.component';
import { ApprovedHardwareRequestComponent } from './hardware-request-lists/approved-hardware-request/approved-hardware-request.component';
import { CancelledHardwareRequestComponent } from './hardware-request-lists/cancelled-hardware-request/cancelled-hardware-request.component';
import { OpenHardwareRequestComponent } from './hardware-request-lists/open-hardware-request/open-hardware-request.component';
import { ReleasedHardwareRequestComponent } from './hardware-request-lists/released-hardware-request/released-hardware-request.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HardwareRejectConfirmComponent } from './reject-confirm/hardware-reject-confirm/hardware-reject-confirm.component';
import { HardwareReleaseConfirmComponent } from './release-confirm/hardware-release-confirm/hardware-release-confirm.component';
import { SoftwareListComponent } from './software-list/software-list.component';
import { ApprovedSoftwareRequestComponent } from './software-request-lists/approved-software-request/approved-software-request.component';
import { CancelledSoftwareRequestComponent } from './software-request-lists/cancelled-software-request/cancelled-software-request.component';
import { OpenSoftwareRequestComponent } from './software-request-lists/open-software-request/open-software-request.component';
import { ReleasedSoftwareRequestComponent } from './software-request-lists/released-software-request/released-software-request.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHardwareListComponent } from './user-hardware-list/user-hardware-list.component';
import { UserSoftwareListComponent } from './user-software-list/user-software-list.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'home',component: HomeComponent,canActivate:[AuthguardService],
    children: [
      {path: 'admin/dashboard',component: AdminDashboardComponent, canActivate: [AuthguardService],
      data: {
        role: 'ADMIN'
      }},
      {path: 'admin/hardware-list',component: AdminHardwareListComponent},
      {path: 'admin/software-list',component: SoftwareListComponent},
      {path:'admin/software-filtered-list',component:AssetFilteredListComponent},
      {path:'admin/hardware-flitered-list',component:HardwareFilteredListComponent},
      {path:'add-hardware',component:AddHardwareComponent},
      {path:'add-software',component:AddSoftwareComponent},
      {path:'software-edit',component:SoftwareEditComponent},
      {path:'hardware-edit',component:HardwareEditComponent},
      {path:'software-view',component:SoftwareEditViewComponent},
      {path:'hardware-view',component:HardwareEditViewComponent},
      {path:'admin/hardware-open-requests',component:OpenHardwareListComponent},
      {path:'admin/software-open-requests',component: OpenSoftwareListComponent},
      {path:'admin/hardware-approved-requests',component: ApprovedHardwareListComponent},
      {path:'admin/software-approved-requests',component: ApprovedSoftwareListComponent},
      {path: 'user/dashboard',component: UserDashboardComponent, canActivate: [AuthguardService],
      data: {
        role: 'USER'
      }},
      {path:'user/hardware-list',component: UserHardwareListComponent,canActivate: [AuthguardService],data:{role: 'USER'}},
      {path:'user/software-list',component: UserSoftwareListComponent},
      {path:'user/software-open-requests',component: OpenSoftwareRequestComponent},
      {path:'user/hardware-open-requests',component:OpenHardwareRequestComponent},
      {path:'user/software-cancel-requests',component:CancelledSoftwareRequestComponent},
      {path:'user/hardware-cancel-requests',component:CancelledHardwareRequestComponent},
      {path:'user/software-approve-requests',component:ApprovedSoftwareRequestComponent},
      {path:'user/hardware-approve-requests',component:ApprovedHardwareRequestComponent},
      {path:'user/software-release-requests',component:ReleasedSoftwareRequestComponent},
      {path:'user/hardware-release-requests',component:ReleasedHardwareRequestComponent}


    ]
  },
  {path: 'adminconfirmapprove-hardware/:id/:user/:assetId/:assetType',component: HardwareConfirmComponent,canActivate: [AuthguardService],
  data: {
    role: 'ADMIN'
  }},
  {path: 'admin-hardware-reject-confirm/:id/:assetType',component: HardwareRejectConfirmComponent,canActivate: [AuthguardService],
  data: {
    role: 'ADMIN'
  }},

  {path: 'hardwareconfirmopen/:id/:assetType',component: ConfirmHardwareRequestComponent,canActivate: [AuthguardService],
  data: {
    role: 'USER'
  }},
  {path:'hardwareconfirmcancel/:id/:type',component:HardwareCancelConfirmComponent,canActivate: [AuthguardService],
  data: {
    role: 'USER'
  }}
  ,
  {path:'hardwareconfirmrelease/:id/:type',component:HardwareReleaseConfirmComponent,canActivate: [AuthguardService],
  data: {
    role: 'USER'
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
