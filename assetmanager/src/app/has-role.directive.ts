import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoginService } from './authentication/login.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  role = this.authService.getRole()

  @Input()
  set appHasRole(role:string){

    if(this.authService.hasRole(role)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear()
    }

  }


  constructor(private authService: LoginService,private templateRef: TemplateRef<any>,private viewContainerRef: ViewContainerRef) { }

}
