import { UserOperationClaimsComponent } from './admin/ClaimTransactions/user-operation-claims/user-operation-claims.component';
import { OperationClaimComponent } from './admin/ClaimTransactions/operation-claim/operation-claim.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { AdminGuard } from '../../core/guards/admin.guard';
import { UserListComponent } from './admin/user-list/user-list.component';
import { BlogListComponent } from './admin/blog-list/blog-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,canActivate:[AdminGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      { path: 'blogs', component: BlogListComponent },
      { path: 'users', component: UserListComponent },
      {path:'categories',component:CategoryListComponent},
      {path:'claims',component:OperationClaimComponent},
      {path:'authassigments',component:UserOperationClaimsComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
