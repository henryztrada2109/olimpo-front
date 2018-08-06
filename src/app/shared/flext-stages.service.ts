import {Injectable} from '@angular/core';
import {FlextPostStage, StageDecoratorParams} from 'flext';
import {BusynessService} from 'busyness';

@Injectable()
export class FlextStagesService {
  constructor (private readonly busynessService: BusynessService) {}
  @FlextPostStage()
  onPost(decoratorParams: StageDecoratorParams) {
    const {stageValue} = decoratorParams;
    this.busynessService.next(stageValue);
  }
}
