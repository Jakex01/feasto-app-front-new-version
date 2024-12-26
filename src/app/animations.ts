
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [ // void => *
    style({ opacity: 0 }),
    animate('0.5s', style({ opacity: 1 }))
  ]),
  transition(':leave', [ // * => void
    animate('0.5s', style({ opacity: 0 }))
  ])
]);
