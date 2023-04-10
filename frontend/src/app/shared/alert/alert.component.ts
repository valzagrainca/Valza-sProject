import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnChanges {
  @Input()
  message!: string;
  @Input()
  success!: boolean;

  private timer: any;

  ngOnChanges(): void {
    if (this.message) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.clearMessage();
      }, 2000); // 5000 milliseconds = 5 seconds
    }
  }

  clearMessage(): void{
    this.message='';
  }
}
