import { Pipe } from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Pipe({
    name: 'spaceReplacer'
})
export class SpaceReplacerPipe extends DecimalPipe {

  transform(value: any, digits?: string): string {
        return super.transform(value, digits).replace(/,/g, ' ');
    }
}