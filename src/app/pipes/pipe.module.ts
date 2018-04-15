import { NgModule }  from '@angular/core';
import {ArraySortPipe } from './array-sort-pipe/array-sort.pipe';
import {SpaceReplacerPipe} from './space-replacer-pipe/space-replacer.pipe';
@NgModule({
    imports:        [],
    declarations:   [ArraySortPipe , SpaceReplacerPipe],
    exports:        [ArraySortPipe , SpaceReplacerPipe],
})

export class PipeModule {

  static forRoot() {
     return {
         ngModule: PipeModule,
         providers: [],
     };
  }
} 