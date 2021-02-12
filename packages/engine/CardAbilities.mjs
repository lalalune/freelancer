import { EffectTypes } from "./EffectTypes.mjs"
import { CardTypes } from "./CardTypes.mjs"

export const PositiveAbilities = [
    {
        name: "Draw",
        rarityFactor: 1.0,
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            {
                amount: 1, cost: 0,
                names: {
                    [CardTypes.Lead]: "Lead1Draw",
                    [CardTypes.Hire]: "Hire1Draw",
                    [CardTypes.Wares]: "Wares1Draw",
                    [CardTypes.Circumstance]: "Circ1Draw",
                    [CardTypes.Hustle]: "Hustle1Draw"
                }
            }, // 1
            {
                amount: 2, cost: 2,
                names: {
                    [CardTypes.Lead]: "Lead2Draw",
                    [CardTypes.Hire]: "Hire2Draw",
                    [CardTypes.Wares]: "Wares2Draw",
                    [CardTypes.Circumstance]: "Circ2Draw",
                    [CardTypes.Hustle]: "Hustle2Draw"
                }
            }, // 2
            {
                amount: 3, cost: 4,
                names: {
                    [CardTypes.Lead]: "Lead3Draw",
                    [CardTypes.Hire]: "Hire3Draw",
                    [CardTypes.Wares]: "Wares3Draw",
                    [CardTypes.Circumstance]: "Circ3Draw",
                    [CardTypes.Hustle]: "Hustle3Draw"
                }
            } // 3
        ],
        synergy: 1,
        description: "Draw ${AMT} card(s).",
        function: (amount, player) => {
            // Draw amount cards for player, no interaction from user required
        }
    },
    {
        name: "Profit",
        rarityFactor: 1.0,
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            {
                amount: 1, cost: 1, names: {
                    [CardTypes.Lead]: "Lead1Profit",
                    [CardTypes.Hire]: "Hire1Profit",
                    [CardTypes.Wares]: "Wares1Profit",
                    [CardTypes.Circumstance]: "Circ1Profit",
                    [CardTypes.Hustle]: "Hustle1Profit"
                }
            }, // 1
            {
                amount: 2, cost: 3, names: {
                    [CardTypes.Lead]: "Lead2Profit",
                    [CardTypes.Hire]: "Hire2Profit",
                    [CardTypes.Wares]: "Wares2Profit",
                    [CardTypes.Circumstance]: "Circ2Profit",
                    [CardTypes.Hustle]: "Hustle2Profit"
                }
            }, // 2
            {
                amount: 3, cost: 5, names: {
                    [CardTypes.Lead]: "Lead3Profit",
                    [CardTypes.Hire]: "Hire3Profit",
                    [CardTypes.Wares]: "Wares3Profit",
                    [CardTypes.Circumstance]: "Circ3Profitw",
                    [CardTypes.Hustle]: "Hustle3Profit"
                }
            } // 3
        ],
        synergy: 1,
        description: "Gain ${AMT} coin(s).",
        function: (amount, player) => {
            // Give amount coins to player
        }
    },
    {
        name: "Steal",
        rarityFactor: 1.0,
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            {
                amount: 1, cost: 3, names: {
                    [CardTypes.Lead]: "Lead1Steal",
                    [CardTypes.Hire]: "Hire1Steal",
                    [CardTypes.Wares]: "Wares1Steal",
                    [CardTypes.Circumstance]: "Circ1Steal",
                    [CardTypes.Hustle]: "Hustle1Steal"
                }
            }, // 1
            {
                amount: 2, cost: 6, names: {
                    [CardTypes.Lead]: "Lead2Steal",
                    [CardTypes.Hire]: "Hire2Steal",
                    [CardTypes.Wares]: "Wares2Steal",
                    [CardTypes.Circumstance]: "Circ2Steal",
                    [CardTypes.Hustle]: "Hustle2Steal"
                }
            } // 2
        ],
        synergy: 1,
        description: "Opponent loses ${AMT} coin(s) and you gain ${AMT} coin(s).",
        function: (amount, player) => {
            // Take amount coins from opponent and give to this player
        }
    },
    {
        name: "Recruit",
        rarityFactor: 0.5,
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            { amount: 1, cost: 3, names: {
                [CardTypes.Lead]: "Lead1Recruit",
                [CardTypes.Hire]: "Hire1Recruit",
                [CardTypes.Wares]: "Wares1Recruit",
                [CardTypes.Circumstance]: "Circ1Recruit",
                [CardTypes.Hustle]: "Hustle1Recruit"
            } }, // 1
            { amount: 2, cost: 6, names: {
                [CardTypes.Lead]: "Lead2Recruit",
                [CardTypes.Hire]: "Hire2Recruit",
                [CardTypes.Wares]: "Wares2Recruit",
                [CardTypes.Circumstance]: "Circ2Recruit",
                [CardTypes.Hustle]: "Hustle2Recruit"
            } } // 2
        ],
        synergy: 1,
        description: "Transfer ownership of up to ${AMT} permanents from your opponent to you.",
        function: (amount, player) => {
            // Owning player selects up to amount hires from opponent (they are always going to take as many as are avaiable)
            // Change over and move cards onto player's side
        }
    },
]

export const NegativeAbilities = [
    {
        name: "Discard",
        rarityFactor: 1.0,
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
        type: EffectTypes.OnActivate,
        levels: [
            {
                amount: 1, cost: 2, names: {
                    [CardTypes.Lead]: "Lead1Discard",
                    [CardTypes.Hire]: "Hire1Discard",
                    [CardTypes.Wares]: "Wares1Discard",
                    [CardTypes.Circumstance]: "Circ1Discard",
                    [CardTypes.Hustle]: "Hustle1Discard"
                }
            }, // 1
            {
                amount: 2, cost: 4, names: {
                    [CardTypes.Lead]: "Lead2Discard",
                    [CardTypes.Hire]: "Hire2Discard",
                    [CardTypes.Wares]: "Wares2Discard",
                    [CardTypes.Circumstance]: "Circ2Discard",
                    [CardTypes.Hustle]: "Hustle2Discard"
                }
            }, // 2
            {
                amount: 3, cost: 6, names: {
                    [CardTypes.Lead]: "Lead3Discard",
                    [CardTypes.Hire]: "Hire3Discard",
                    [CardTypes.Wares]: "Wares3Discard",
                    [CardTypes.Circumstance]: "Circ3Discard",
                    [CardTypes.Hustle]: "Hustle3Discard"
                }
            } // 3
        ],
        synergy: 1,
        description: "Discard ${AMT} card(s).",
        function: (amount, player) => {
            // ask player to select amount cards from their hand
            // call discardFromHand on these cards
        }
    },
    {
        name: "Spend",
        rarityFactor: 1.0,
        allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
        type: EffectTypes.OnActivate, // On activate is called like "on play" on leads and wares
        levels: [
            {
                amount: 1, cost: 1, names: {
                    [CardTypes.Lead]: "Lead1Spend",
                    [CardTypes.Hire]: "Hire1Spend",
                    [CardTypes.Wares]: "Wares1Spend",
                    [CardTypes.Circumstance]: "Circ1Spend",
                    [CardTypes.Hustle]: "Hustle1Spend"
                }
            }, // 1
            {
                amount: 2, cost: 3, names: {
                    [CardTypes.Lead]: "Lead2Spend",
                    [CardTypes.Hire]: "Hire2Spend",
                    [CardTypes.Wares]: "Wares2Spend",
                    [CardTypes.Circumstance]: "Circ2Spend",
                    [CardTypes.Hustle]: "Hustle2Spend"
                }
            }, // 2
            {
                amount: 3, cost: 6, names: {
                    [CardTypes.Lead]: "Lead3Spend",
                    [CardTypes.Hire]: "Hire3Spend",
                    [CardTypes.Wares]: "Wares3Spend",
                    [CardTypes.Circumstance]: "Circ3Spend",
                    [CardTypes.Hustle]: "Hustle3Spend"
                }
            } // 3
        ],
        synergy: 1,
        description: "Lose ${AMT} coin(s).",
        function: (amount, player) => {
            // Player loses amount coins
        }
    },
]

export const CardAbilities = {
    PositiveAbilities,
    NegativeAbilities
}

export default CardAbilities;