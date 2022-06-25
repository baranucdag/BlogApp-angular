import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  constructor(private authService:AuthService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  //return true is user is authenticated
  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  //log out function
  logOut(){
    this.authService.logout();
    this.toastr.info("Logged out succesfully!")
  }

  //check if user is admin
  isAdmin(){
    if(this.authService.isAuthenticated()){
       if(this.authService.getCurrentRoles().includes("admin")){
    return true
   }
   else return false
    }else return false
  
  }
}
