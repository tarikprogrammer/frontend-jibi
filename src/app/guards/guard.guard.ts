import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthAgentService} from "../services/authAgent/auth-agent.service";

export const AuthGuard = ()=>{
  const auth=inject(AuthAgentService);
  const router=inject(Router)
  const logged = sessionStorage.getItem('currentAgent');
  if(logged==null){
    router.navigateByUrl('/login');
    return false;
  }
  return true;

}
