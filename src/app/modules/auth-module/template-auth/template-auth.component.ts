import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-auth',
  templateUrl: './template-auth.component.html',
  styleUrls: ['./template-auth.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateAuthComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
