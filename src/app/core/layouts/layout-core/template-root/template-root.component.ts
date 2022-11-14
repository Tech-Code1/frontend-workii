import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-root',
  templateUrl: './template-root.component.html',
  styleUrls: ['./template-root.component.scss'],
})
export class TemplateRootComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
