import { Component, OnInit, Input } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-id-badge',
  templateUrl: './id-badge.component.html',
  styleUrls: ['./id-badge.component.scss']
})
export class IdBadgeComponent implements OnInit {
  @Input() name!: string;
  @Input() company!: string;
  @Input() trade!: string;
  @Input() idNumber!: string;
  @Input() profilePic!: string;

  @Input() codeValue!: string;
  title = 'app';
  errorLevel!: NgxQrcodeErrorCorrectionLevels.HIGH;
  elementType!: NgxQrcodeElementTypes.URL;

  constructor() { }

  ngOnInit(): void {
  }

}
