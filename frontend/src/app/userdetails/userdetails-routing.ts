import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdetailsComponent } from './userdetails.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path: 'userdetail',component:UserdetailsComponent,
    children: [
      { path: '', component: UserprofileComponent, data: { title: 'userprofile' }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule {
}
