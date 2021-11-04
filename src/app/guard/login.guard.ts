import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DadosService } from './../dados.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private DadosService: DadosService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise( resolve =>{
      this.DadosService.getAuth().onAuthStateChanged(user => {
        if(user) this.router.navigate(['principal']);

        resolve(!user ? true:false);
      })
    })
  }

}
