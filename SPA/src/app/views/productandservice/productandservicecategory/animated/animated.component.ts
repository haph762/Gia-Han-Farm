import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated',
  templateUrl: './animated.component.html',
  styleUrls: ['./animated.component.scss']
})
export class AnimatedComponent implements AfterViewInit, OnChanges {
  @Input() duration: number;
  @Input() digit: number;
  @Input() steps: number;
  @ViewChild("animatedDigit") animatedDigit: ElementRef<HTMLInputElement>;

  animateCount() {
    if (!this.duration) {
      this.duration = 1000;
    }

    if (typeof this.digit === "number") {
      setTimeout(() => {

        this.counterFunc(this.digit, this.duration, this.animatedDigit);
      }, 1000)
    }
  }

  counterFunc(endValue, durationMs, element: ElementRef) {
    if (!this.steps) {
      this.steps = 12;
    }

    const stepCount = Math.abs(durationMs / this.steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    function step() {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      element.nativeElement.textContent = Math.abs(Math.floor(currentValue));

      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      }
    }

    step();
  }

  ngAfterViewInit() {
    if (this.digit) {
      this.animateCount();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["digit"]) {
      this.animateCount();
    }
  }
}
