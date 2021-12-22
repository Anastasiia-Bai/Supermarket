import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {

    public constructor(private router: Router) {}

    public canActivate(): boolean {
        const role = sessionStorage.getItem("role");
        if(role == "ADMIN" || role == "CUSTOMER") {
            return true;
        }
        this.router.navigateByUrl("");
        return false;
    }
}