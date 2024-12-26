import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @ViewChild('nextSection') nextSection: ElementRef;

  scrollToNextSection(): void {
    this.nextSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
