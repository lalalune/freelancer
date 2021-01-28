import { EffectTypes } from "./EffectTypes"
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
        function: (amount, player) => {
            // Draw amount cards for player, no interaction from user required
        }
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
        function: (amount, player) => {
            // ask player to select amount cards from their hand
            // call discardFromHand on these cards
        }
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
        function: (amount, player) => {
            // Give amount coins to player
        }
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
        function: (amount, player) => {
            // Player loses amount coins
        }
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
        function: (amount, player) => {
            // Take amount coins from opponent and give to this player
        }
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
        function: (amount, player) => {
            // Owning player selects up to amount hires from opponent (they are always going to take as many as are avaiable)
            // Change over and move cards onto player's side
        }
    },
}
