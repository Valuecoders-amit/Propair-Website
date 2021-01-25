import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit {

  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;

  constructor() { }

  ngOnInit() {
  }

  
}
