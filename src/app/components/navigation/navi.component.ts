import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
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

  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
    this.authService.logout();
    this.toastr.info("Logged out succesfully!")
  }
}
