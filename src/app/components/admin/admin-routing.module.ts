import { AdminGuard } from './../../guards/admin.guard';
import { UserListComponent } from './admin/user-list/user-list.component';
import { BlogListComponent } from './admin/blog-list/blog-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,canActivate:[AdminGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      { path: 'blogs', component: BlogListComponent },
      { path: 'users', component: UserListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
