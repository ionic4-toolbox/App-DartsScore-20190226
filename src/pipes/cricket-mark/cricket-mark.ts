import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CricketMarkPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'cricketMark',
})
export class CricketMark implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number) {
    let imgUrl: string = ""
    switch(value) {
      case 0: imgUrl = "assets/img/cricket-0.svg"
        break
      case 1: imgUrl = "assets/img/cricket-1.svg"
        break
      case 2: imgUrl = "assets/img/cricket-2.svg"
        break
      case 3: imgUrl = "assets/img/cricket-3.svg"
        break
      default: imgUrl = "assets/img/cricket-3.svg"
        break
    }
    return imgUrl;
  }
}
