import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(
    private _domSanitizer: DomSanitizer
  ) {}

  transform(img: any): any {
    const domImg = `background-image: url('${img}');`;
    return this._domSanitizer.bypassSecurityTrustStyle(domImg);
  }

}
