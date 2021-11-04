import { DadosService } from './../dados.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private DadosService: DadosService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise( resolve =>{
      this.DadosService.getAuth().onAuthStateChanged(user => {
        if(!user) this.router.navigate(['login']);

        resolve(user ? true:false);
      })
    })
  }

}
