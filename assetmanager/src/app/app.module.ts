import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';
import { Breadcrumb, BreadcrumbModule } from 'angular-crumbs';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxSmartModalModule,NgxSmartModalService } from 'ngx-smart-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthguardService } from './authentication/authguard.service';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AssetCategoryWidgetComponent } from './asset-category-widget/asset-category-widget.component';
import { HardwareGraphComponent } from './hardware-graph/hardware-graph.component';
import { SoftwareGraphComponent } from './software-graph/software-graph.component';
import { LicenseExpireWidgetComponent } from './license-expire-widget/license-expire-widget.component';
import { AdminHardwareListComponent } from './admin-hardware-list/admin-hardware-list.component';
import { SoftwareListComponent } from './software-list/software-list.component';
import { AddHardwareComponent } from './add-hardware/add-hardware.component';
import { AddSoftwareComponent } from './add-software/add-software.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HasRoleDirective } from './has-role.directive';
import { UserHardwareListComponent } from './user-hardware-list/user-hardware-list.component';
import { UserSoftwareListComponent } from './user-software-list/user-software-list.component';
import { OpenSoftwareRequestComponent } from './software-request-lists/open-software-request/open-software-request.component';
import { CancelledSoftwareRequestComponent } from './software-request-lists/cancelled-software-request/cancelled-software-request.component';
import { ApprovedSoftwareRequestComponent } from './software-request-lists/approved-software-request/approved-software-request.component';
import { ReleasedSoftwareRequestComponent } from './software-request-lists/released-software-request/released-software-request.component';
import { OpenHardwareRequestComponent } from './hardware-request-lists/open-hardware-request/open-hardware-request.component';
import { CancelledHardwareRequestComponent } from './hardware-request-lists/cancelled-hardware-request/cancelled-hardware-request.component';
import { ApprovedHardwareRequestComponent } from './hardware-request-lists/approved-hardware-request/approved-hardware-request.component';
import { ReleasedHardwareRequestComponent } from './hardware-request-lists/released-hardware-request/released-hardware-request.component';
import { ConfirmHardwareRequestComponent } from './confirm-hardware-request/confirm-hardware-request.component';
import { HardwareCancelConfirmComponent } from './cancel-confirm/hardware-cancel-confirm/hardware-cancel-confirm.component';
import { HardwareReleaseConfirmComponent } from './release-confirm/hardware-release-confirm/hardware-release-confirm.component';
import { OpenHardwareListComponent } from './admin-hardware-requests/open-hardware-list/open-hardware-list.component';
import { ApprovedHardwareListComponent } from './admin-hardware-requests/approved-hardware-list/approved-hardware-list.component';
import { ApprovedSoftwareListComponent } from './admin-software-requests/approved-software-list/approved-software-list.component';
import { OpenSoftwareListComponent } from './admin-software-requests/open-software-list/open-software-list.component';
import { HardwareConfirmComponent } from './admin-confirm/hardware-confirm/hardware-confirm.component';
import { HardwareRejectConfirmComponent } from './reject-confirm/hardware-reject-confirm/hardware-reject-confirm.component';
import { HardwareEditComponent } from './edit/hardware-edit/hardware-edit.component';
import { SoftwareEditComponent } from './edit/software-edit/software-edit.component';
import { HardwareEditViewComponent } from './edit-view/hardware-edit-view/hardware-edit-view.component';
import { SoftwareEditViewComponent } from './edit-view/software-edit-view/software-edit-view.component';
import { AssetFilteredListComponent } from './admin-filtered-lists/asset-filtered-list/asset-filtered-list.component';
import { HardwareFilteredListComponent } from './admin-filtered-lists/hardware-filtered-list/hardware-filtered-list.component';



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        HeaderComponent,
        NavigationComponent,
        AdminDashboardComponent,
        AssetCategoryWidgetComponent,
        HardwareGraphComponent,
        SoftwareGraphComponent,
        LicenseExpireWidgetComponent,
        AdminHardwareListComponent,
        SoftwareListComponent,
        AddHardwareComponent,
        AddSoftwareComponent,
        UserDashboardComponent,
        HasRoleDirective,
        UserHardwareListComponent,
        UserSoftwareListComponent,
        OpenSoftwareRequestComponent,
        CancelledSoftwareRequestComponent,
        ApprovedSoftwareRequestComponent,
        ReleasedSoftwareRequestComponent,
        OpenHardwareRequestComponent,
        CancelledHardwareRequestComponent,
        ApprovedHardwareRequestComponent,
        ReleasedHardwareRequestComponent,
        ConfirmHardwareRequestComponent,
        HardwareCancelConfirmComponent,
        HardwareReleaseConfirmComponent,
        OpenHardwareListComponent,
        ApprovedHardwareListComponent,
        ApprovedSoftwareListComponent,
        OpenSoftwareListComponent,
        HardwareConfirmComponent,
        HardwareRejectConfirmComponent,
        HardwareEditComponent,
        SoftwareEditComponent,
        HardwareEditViewComponent,
        SoftwareEditViewComponent,
        AssetFilteredListComponent,
        HardwareFilteredListComponent,
    ],
    providers: [
        AuthguardService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        NgxSmartModalService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule,
        NgChartsModule,
        BreadcrumbModule,
        MatDialogModule,
        NgxSmartModalModule.forRoot()
        
        
    ],


})
export class AppModule { }
