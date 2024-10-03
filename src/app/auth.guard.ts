import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLoginService } from './Services/auth-login.service';

export const authGuard: CanActivateFn = (route, state) => {
   const authService= inject(AuthLoginService);
   const router=inject(Router)

   const token=authService.getToken()
   if(token){
   //  router.navigateByUrl("/products")
    return true
   }
   else{
    router.navigateByUrl('/login');
    return false
   }
  }
