import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthAgentService} from "../services/authAgent/auth-agent.service";

export const AuthGuard = ()=>{
  const auth=inject(AuthAgentService);
  const router=inject(Router)
  if(!auth.isLogin){
    router.navigateByUrl('/login');
    return false;
  }
  return true;

}
