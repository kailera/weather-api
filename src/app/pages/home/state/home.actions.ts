import { createAction, props } from "@ngrx/store";
import { Bookmark } from "src/app/shared/models/bookmark.model";

export const loadCurrentWeather = createAction(
    '[Home] LoadCurrentWeather', // componente que dispara a action
    props <{ query:string }>() // propriedade que o componente passa para a action passar para o reducer
)

export const loadCurrentWeatherById = createAction(
    '[Home] Load Current Action By ID',
    props<{ id: string }>(),
);

export const loadCurrentWeatherSuccess = createAction(
    '[Weather API] LoadCurrentWeatherSuccess',
    props <{entity: any}> (),
);


export const loadCurrentWeatherFailed = createAction(
    '[Weather API] LoadCurrentWeatherFailed'
);

export const toogleBookmark = createAction(
    '[Home] ToogleBookmark',
    props<{entity: Bookmark}>(),
)

export const clearHomeState = createAction('[Home] Clear Home State');
