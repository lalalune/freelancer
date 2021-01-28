import { EffectTypes } from "./EffectTypes"
import { Recruit, Draw, Discard, Profit, Steal, Spend } from "./CardEffectFunctions"
import { CardTypes } from "./CardTypes"

export const CardEffects = {
    "DRAW": {
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            { amount: 1, cost: 0 }, // 1
            { amount: 2, cost: 2 }, // 2
            { amount: 3, cost: 4 } // 3
        ],
        synergy: 1,
        description: "Draw ${AMT} card(s).",
        function: Draw
    },
    "DISCARD": {
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire],
        type: EffectTypes.OnActivate,
        levels: [
            { amount: 1, cost: -2 }, // 1
            { amount: 2, cost: -4 }, // 2
            { amount: 3, cost: -6 } // 3
        ],
        synergy: 1,
        description: "Discard ${AMT} card(s).",
        function: Discard
    },
    "PROFIT": {
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            { amount: 1, cost: 1 }, // 1
            { amount: 2, cost: 3 }, // 2
            { amount: 3, cost: 5 } // 3
        ],
        synergy: 1,
        description: "Gain ${AMT} coin(s).",
        function: Profit
    },
    "SPEND": {
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            { amount: 1, cost: -2 }, // 1
            { amount: 2, cost: -4 }, // 2
            { amount: 3, cost: -6 } // 3
        ],
        synergy: 1,
        description: "Gain ${AMT} coin(s).",
        function: Spend
    },
    "STEAL": {
        allowedCardTypes: [CardTypes.Hire, CardTypes.Wares],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            { amount: 1, cost: 3 }, // 1
            { amount: 2, cost: 6 } // 2
        ],
        synergy: 1,
        description: "Opponent loses ${AMT} coin(s) and you gain ${AMT} coin(s).",
        function: Steal
    },
    "RECRUIT": {
        allowedCardTypes: [CardTypes.Hire, CardTypes.Lead, CardTypes.Wares],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            { amount: 1, cost: 3 }, // 1
            { amount: 2, cost: 6 } // 2
        ],
        synergy: 1,
        description: "Transfer ownership of up to ${AMT} permanents from your opponent to you.",
        function: Recruit
    },
}
