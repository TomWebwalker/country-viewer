import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [ // each time the binding value changes
    query(':leave', [
      stagger(100, [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 }),
      stagger(100, [
        animate('0.5s', style({ opacity: 1 }))
      ])
    ], { optional: true })
  ])
])

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

export const slideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px)' }),
    animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
])
