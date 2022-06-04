import { SharedModule } from './../shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { NavigationComponent } from './admin/navigation/navigation.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { BlogListComponent } from './admin/blog-list/blog-list.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OperationClaimComponent } from './admin/ClaimTransactions/operation-claim/operation-claim.component';
import { UserOperationClaimsComponent } from './admin/ClaimTransactions/user-operation-claims/user-operation-claims.component';
import { UserOperationClaimAddComponent } from './admin/ClaimTransactions/user-operation-claim-add/user-operation-claim-add.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavigationComponent,
    DashboardComponent,
    BlogListComponent,
    UserListComponent,
    CategoryListComponent,
    OperationClaimComponent,
    UserOperationClaimsComponent,
    UserOperationClaimAddComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
  ],
})
export class AdminModule {}
