import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState = createFeatureSelector('home'); // isso pega a home inteira,e não é interessante

// funcao que recebe a feature select inteira e seleciona partes dela, nesse caso o text

export const selectCurrentWeather = createSelector(
    selectHomeState,
    (homeState:HomeState) => homeState.entity
);


export const selectCurrentWeatherLoading = createSelector(
    selectHomeState,
    (homeState:HomeState) => homeState.loading
);


export const selectCurrentWeatherError = createSelector(
    selectHomeState,
    (homeState:HomeState) => homeState.error
);