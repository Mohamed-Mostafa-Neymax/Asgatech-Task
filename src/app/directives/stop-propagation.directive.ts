import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: "[stop-propagation]",
    standalone: true
})
export class StopPropagation {
    @HostListener("click", ["$event"]) public onClick(event: any): void {
        event.stopPropagation();
    }
}