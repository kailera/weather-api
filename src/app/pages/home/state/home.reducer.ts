import { createReducer, Action, on } from "@ngrx/store"

import * as fromHomeActions from './home.actions' // pegando a acao que contem a prop
export interface HomeState{
    entity:any,
    loading: boolean,
    error: boolean
}

export const HomeInitialState: HomeState  = { 
    entity: undefined,
    loading: false,
    error: false
}

// pego a prop passada com a action e o state, e atualizo esse state com a prop (vuala!!!)
const reducer = createReducer(
    HomeInitialState, 
    on(fromHomeActions.clearHomeState, () => HomeInitialState),
    on(fromHomeActions.loadCurrentWeather,
       fromHomeActions.loadCurrentWeatherById,
        state => ({ // aqui eu nao quero q a query fique armazenada na store
        ...state,
        loading:true,
        error:false
    })),
    on(fromHomeActions.loadCurrentWeatherSuccess, (state, { entity})=>({ //com sucess, armazena a query (entity) na store, nao preciso atualizar o erro pois ele ja foi atualizado na action anterior
        ...state,
        entity,
        loading: false
    })),
    on(fromHomeActions.loadCurrentWeatherFailed, state =>({ // atualizo meu estado, mas nao passo entity, e seto o erro pra true
        ...state,
        loading:false,
        error:true
    }))
);

export function homeReducer (state: HomeState | undefined, action: Action): HomeState{
    return reducer(state, action)
}