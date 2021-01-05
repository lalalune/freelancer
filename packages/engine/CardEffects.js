import { EffectTypes } from "./EffectTypes"
import { Recruit, Remove, Subcontract } from "./CardEffectFunctions"

export const CardEffects = {
    "RECRUIT": {
        allowedCardTypes: [CardTypes.Lead, CardTypes.Wares, CardTypes.Hire],
        type: EffectTypes.OnActivate,
        levels: {
            1: { amount: 1, cost: 4 },
            2: { amount: 2, cost: 6 },
            3: null
        },
        synergy: 2,
        description: "Change ownership of $AMT hire(s) from one user to another.",
        function: Recruit
    },
    "REMOVE": {
        allowedCardTypes: [CardTypes.Lead, CardTypes.Wares],
        type: EffectTypes.OnActivate,
        levels: {
            1: { amount: 1, cost: 3 },
            2: { amount: 2, cost: 5 },
            3: { amount: 3, cost: 6 }
        },
        synergy: 1,
        description: "Remove $AMT card from play for any user.",
        function: Remove
    },
    "SUBCONTRACT": {
        allowedCardTypes: [CardTypes.Lead, CardTypes.Wares, CardTypes.Hire, CardTypes.Wares],
        type: EffectTypes.OnActivate,
        levels: {
            1: { amount: 1, cost: -2 },
            2: { amount: 2, cost: -4 },
            3: { amount: 3, cost: -6 }
        },
        synergy: 1,
        description: "Give another user $AMT coin(s).",
        function: Subcontract
    },
}
