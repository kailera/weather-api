import { createAction, props } from "@ngrx/store";
import { Units } from "../../models/units.model";

export const updateUnit = createAction(
    '[Config] Update Unit',
    props<{ unit: Units}>()
)