const Alignments = {
  WhiteHat: 1,
  NeutralWhiteHat: .5,
  Neutral: 0,
  NeutralBlackHat: -.5,
  BlackHat: -1
}

const AbilityTypes = {
  Coin: "Coin",
  Draw: "Draw",
  Discard: "Discard",
  Permanent: "Permanent"
};

const CardTypes = {
  Hire: "Hire",
  Lead: "Lead",
  Hustle: "Hustle",
  Wares: "Wares",
  Circumstance: "Circumstance"
};

const EffectTypes = {
  WhenPlayed: "WhenPlayed",
  WhenDestroyed: "WhenDestroyed",
  OnPlayerTurn: "OnPlayerTurn",
  OnOpponentTurn: "OnOpponentTurn",
  OnActivate: "OnActivate",
};

const Legendaries = {
  [CardTypes.Hire]: [
    { name: "Avaer", alignment: Alignments.BlackHat },
    { name: "Metavly", alignment: Alignments.NeutralWhiteHat },
    { name: "r00kieblue", alignment: Alignments.NeutralBlackHat },
    { name: "Jin", alignment: Alignments.Neutral },
    { name: "Ra1nwolf", alignment: Alignments.WhiteHat }
  ],
  [CardTypes.Wares]: [
    { name: "Zero Day", alignment: Alignments.BlackHat },
    { name: "H.R.2.0", alignment: Alignments.NeutralWhiteHat },
    { name: "H4XL4V", alignment: Alignments.NeutralBlackHat },
    { name: "0x", alignment: Alignments.Neutral },
    { name: "Wolfra1n", alignment: Alignments.WhiteHat }
  ],
  [CardTypes.Hustle]: [
    { name: "Zero Day", alignment: Alignments.BlackHat },
    { name: "H.R.2.0", alignment: Alignments.NeutralWhiteHat },
    { name: "Sharkade", alignment: Alignments.NeutralBlackHat },
    { name: "MoebiUS", alignment: Alignments.Neutral },
    { name: "Gran Stadia", alignment: Alignments.WhiteHat }
  ],
  [CardTypes.Lead]: [
    { name: "Grand Stadium", alignment: Alignments.BlackHat },
    { name: "Grand Stadium1", alignment: Alignments.NeutralWhiteHat },
    { name: "Grand Stadium2", alignment: Alignments.NeutralBlackHat },
    { name: "Grand Stadium3", alignment: Alignments.Neutral },
    { name: "Grand Stadium4", alignment: Alignments.WhiteHat }
  ],
  [CardTypes.Circumstance]: [
    { name: "Circumstance1", alignment: Alignments.BlackHat },
    { name: "Circumstance2", alignment: Alignments.NeutralWhiteHat },
    { name: "Circumstance3", alignment: Alignments.NeutralBlackHat },
    { name: "Circumstance4", alignment: Alignments.Neutral },
    { name: "Circumstance5", alignment: Alignments.WhiteHat }
  ],
  }
  
const PositiveAbilities = [
  {
    name: "Draw",
    abilityType: AbilityTypes.Draw,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate,
    alignment: Alignments.Neutral,
    levels: [
      {
        amount: 1, cost: 0,
        names: {
          [CardTypes.Lead]: { adjective: "Promising", noun: "Prospect", of: "of Stuff"},
          [CardTypes.Hire]: { adjective: "Novice", noun: "Maker", of: "of Stuff" },
          [CardTypes.Wares]: { adjective: "Copypasta", noun: "Script", of: "of Stuff" },
          [CardTypes.Circumstance]:  { adjective: "Hopeful", noun: "Circumstance", of: "of Stuff" },
          [CardTypes.Hustle]:  { adjective: "Intimate", noun: "Card Game", of: "of Stuff" }
        }
      },
      {
        amount: 2, cost: 2,
        names: {
          [CardTypes.Lead]: { adjective: "Lucrative", noun: "Prospect", of: "of Stuff"},
          [CardTypes.Hire]: { adjective: "Industrious", noun: "Engineer", of: "of Stuff" },
          [CardTypes.Wares]: { adjective: "Automated", noun: "Chatbot", of: "of Stuff" },
          [CardTypes.Circumstance]:  { adjective: "Hopeful", noun: "Circumstance", of: "of Stuff" },
          [CardTypes.Hustle]:  { adjective: "Popular", noun: "Community", of: "of Stuff" }
        }
      },
      {
        amount: 3, cost: 4,
        names: {
          [CardTypes.Lead]: { adjective: "Rewarding", noun: "Prospect", of: "of Stuff"},
          [CardTypes.Hire]: { adjective: "Industrious", noun: "Architect", of: "of Stuff" },
          [CardTypes.Wares]: { adjective: "Automated", noun: "Chatbot", of: "of Stuff" },
          [CardTypes.Circumstance]:  { adjective: "Hopeful", noun: "Circumstance", of: "of Stuff" },
          [CardTypes.Hustle]:  { adjective: "Popular", noun: "Arena", of: "of Stuff" }
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
    abilityType: AbilityTypes.Coin,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate,
    alignment: Alignments.WhiteHat,
    levels: [
      {
        amount: 1, cost: 1, names: {
          [CardTypes.Lead]: { adjective: "Rewarding1", noun: "Prospect1", of: "of Stuff"},
          [CardTypes.Hire]: { adjective: "Industrious1", noun: "Architect1", of: "of Stuff" },
          [CardTypes.Hustle]:  { adjective: "Popular1", noun: "Arena1", of: "of Stuff" }
        }
      },
      {
        amount: 2, cost: 3, names: {
          [CardTypes.Lead]: { adjective: "Rewarding2", noun: "Prospect2", of: "of Stuff"},
          [CardTypes.Hire]: { adjective: "Industrious2", noun: "Architect2", of: "of Stuff" },
          [CardTypes.Hustle]:  { adjective: "Popular2", noun: "Arena2", of: "of Stuff" }
        }
      },
      {
        amount: 3, cost: 5, names: {
          [CardTypes.Lead]: { adjective: "Rewarding3", noun: "Prospect3", of: "of Stuff"},
          [CardTypes.Hire]: { adjective: "Industrious3", noun: "Architect3", of: "of Stuff" },
          [CardTypes.Hustle]:  { adjective: "Popular3", noun: "Arena3", of: "of Stuff" }
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
    abilityType: AbilityTypes.Coin,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Hire, CardTypes.Wares],
    effectType: EffectTypes.OnActivate,
    alignment: Alignments.BlackHat,
    levels: [
      {
        amount: 1, cost: 3, names: {
          [CardTypes.Hire]: { adjective: "Industrious4", noun: "Architect4", of: "of Stuff4" },
          [CardTypes.Wares]: { adjective: "Automated4", noun: "Chatbot4", of: "of Stuff4" },
        }
      },
      {
        amount: 2, cost: 6, names: {
          [CardTypes.Hire]: { adjective: "Industrious5", noun: "Architect5", of: "of Stuff5" },
          [CardTypes.Wares]: { adjective: "Automated5", noun: "Chatbot5", of: "of Stuff5" },
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
    abilityType: AbilityTypes.Permanent,
    rarityFactor: 0.5,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares],
    effectType: EffectTypes.OnActivate,
    alignment: Alignments.NeutralBlackHat,
    levels: [
      {
        amount: 1, cost: 3, names: {
          [CardTypes.Lead]: { adjective: "Rewarding6", noun: "Prospect6", of: "of Stuff6"},
          [CardTypes.Hire]: { adjective: "Industrious6", noun: "Architect6", of: "of Stuff6" },
          [CardTypes.Wares]: { adjective: "Automated6", noun: "Chatbot6", of: "of Stuff6" },
        }
      },
      {
        amount: 2, cost: 6, names: {
          [CardTypes.Lead]: { adjective: "Rewarding7", noun: "Prospect7", of: "of Stuff7"},
          [CardTypes.Hire]: { adjective: "Industrious7", noun: "Architect7", of: "of Stuff7" },
          [CardTypes.Wares]: { adjective: "Automated7", noun: "Chatbot7", of: "of Stuff7" },
        }
      } // 2
    ],
    synergy: 1,
    description: "Transfer ownership of up to ${AMT} permanents from your opponent to you.",
    function: (amount, player) => {
      // Owning player selects up to amount hires from opponent (they are always going to take as many as are avaiable)
      // Change over and move cards onto player's side
    }
  },
];

const NegativeAbilities = [
  {
    name: "Discard",
    abilityType: AbilityTypes.Discard,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate,
    alignment: Alignments.Neutral,
    levels: [
      {
        amount: 1, cost: 2, names: {
          [CardTypes.Lead]: { adjective: "Promising8", noun: "Prospect8", of: "of Stuff8"},
          [CardTypes.Hire]: { adjective: "Novice8", noun: "Maker8", of: "of Stuff81" },
          [CardTypes.Wares]: { adjective: "Copypasta8", noun: "Script8", of: "of Stuff82" },
          [CardTypes.Circumstance]:  { adjective: "Hopeful8", noun: "Circumstance8", of: "of Stuff83" },
          [CardTypes.Hustle]:  { adjective: "Intimate8", noun: "Card Game8", of: "of Stuff84" }
        }
      },
      {
        amount: 2, cost: 4, names: {
          [CardTypes.Lead]: { adjective: "Promising9", noun: "Prospect9", of: "of Stuff9"},
          [CardTypes.Hire]: { adjective: "Novice9", noun: "Maker9", of: "of Stuff91" },
          [CardTypes.Wares]: { adjective: "Copypasta9", noun: "Script9", of: "of Stuff92" },
          [CardTypes.Circumstance]:  { adjective: "Hopeful9", noun: "Circumstance9", of: "of Stuff93" },
          [CardTypes.Hustle]:  { adjective: "Intimate9", noun: "Card Game9", of: "of Stuff94" }
        }
      },
      {
        amount: 3, cost: 6, names: {
          [CardTypes.Lead]: { adjective: "Promising10", noun: "Prospect10", of: "of Stuff10"},
          [CardTypes.Hire]: { adjective: "Novice10", noun: "Maker10", of: "of Stuff101" },
          [CardTypes.Wares]: { adjective: "Copypasta10", noun: "Script10", of: "of Stuff102" },
          [CardTypes.Circumstance]:  { adjective: "Hopeful10", noun: "Circumstance10", of: "of Stuff103" },
          [CardTypes.Hustle]:  { adjective: "Intimate10", noun: "Card Game10", of: "of Stuff104" }
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
    abilityType: AbilityTypes.Coin,
    alignment: Alignments.NeutralWhiteHat,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate,
    levels: [
      {
        amount: 1, cost: 1, names: {
          [CardTypes.Lead]: { adjective: "Expensive11", noun: "Prospect11", of: "of Stuff11"},
          [CardTypes.Hire]: { adjective: "Expensive111", noun: "Maker11", of: "of Stuff11" },
          [CardTypes.Wares]: { adjective: "Expensive112", noun: "Script11", of: "of Stuff112" },
          [CardTypes.Hustle]:  { adjective: "Expensive113", noun: "Game11", of: "of Stuff113" }
        }
      },
      {
        amount: 2, cost: 4, names: {
          [CardTypes.Lead]: { adjective: "Expensive12", noun: "Prospect12", of: "of Stuff12"},
          [CardTypes.Hire]: { adjective: "Expensive121", noun: "Maker12", of: "of Stuff121" },
          [CardTypes.Wares]: { adjective: "Expensive122", noun: "Script12", of: "of Stuff122" },
          [CardTypes.Hustle]:  { adjective: "Expensive123", noun: "Game12", of: "of Stuff123" }
        }
      },
      {
        amount: 3, cost: 6, names: {
          [CardTypes.Lead]: { adjective: "Expensive13", noun: "Prospect13", of: "of Stuff13"},
          [CardTypes.Hire]: { adjective: "Expensive131", noun: "Maker13", of: "of Stuff131" },
          [CardTypes.Wares]: { adjective: "Expensive132", noun: "Script13", of: "of Stuff132" },
          [CardTypes.Hustle]:  { adjective: "Expensive133", noun: "Game13", of: "of Stuff133" }
        }
      },
      {
        amount: 4, cost: 8, names: {
          [CardTypes.Lead]: { adjective: "Promising14", noun: "Prospect14", of: "of Stuff14"},
          [CardTypes.Hire]: { adjective: "Novice14", noun: "Maker14", of: "of Stuff14" },
          [CardTypes.Wares]: { adjective: "Copypasta14", noun: "Script14", of: "of Stuff14" },
          [CardTypes.Hustle]:  { adjective: "Intimate14", noun: "Card Game14", of: "of Stuff14" }
        }
      } // 4
    ],
    synergy: 1,
    description: "Lose ${AMT} coin(s).",
    function: (amount, player) => {
      // Player loses amount coins
    }
  },
  {
    name: "Fine",
    abilityType: AbilityTypes.Coin,
    alignment: Alignments.NeutralBlackHat,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Wares, CardTypes.Circumstance, CardTypes.Hustle],
    effectType: EffectTypes.OnActivate,
    levels: [
      {
        amount: 1, cost: 1, names: {
          [CardTypes.Wares]: { adjective: "Infringing1", noun: "Fine1", of: "of Stuff01" },
          [CardTypes.Circumstance]:  { adjective: "Infringing2", noun: "Fine2", of: "of Stuff02" },
          [CardTypes.Hustle]:  { adjective: "Infringing3", noun: "Fine3", of: "of Stuff03" }
        }
      },
      {
        amount: 2, cost: 3, names: {
          [CardTypes.Wares]: { adjective: "Infringing4", noun: "Fine4", of: "of Stuff04" },
          [CardTypes.Circumstance]:  { adjective: "Infringing5", noun: "Fine5", of: "of Stuff05" },
          [CardTypes.Hustle]:  { adjective: "Infringing6", noun: "Fine6", of: "of Stuff06" }
        }
      },
      {
        amount: 3, cost: 5, names: {
          [CardTypes.Wares]: { adjective: "Infringing7", noun: "Fine7", of: "of Stuff07" },
          [CardTypes.Circumstance]:  { adjective: "Infringing8", noun: "Fine8", of: "of Stuff08" },
          [CardTypes.Hustle]:  { adjective: "Infringing9", noun: "Fine9", of: "of Stuff09" }
        }
      },
      {
        amount: 5, cost: 8, names: {
          [CardTypes.Wares]: { adjective: "Infringing10", noun: "Fine10", of: "of Stuff001" },
          [CardTypes.Circumstance]:  { adjective: "Infringing11", noun: "Fine11", of: "of Stuff002" },
          [CardTypes.Hustle]:  { adjective: "Infringing12", noun: "Fine12", of: "of Stuff003" }
        }
      } // 3
    ],
    synergy: 1,
    description: "Lose ${AMT} coin(s).",
    function: (amount, player) => {
      // Player loses amount coins
    }
  },
];

const GameData = {
  PositiveAbilities,
  NegativeAbilities,
  AbilityTypes,
  CardTypes,
  EffectTypes,
  Legendaries
}

export default GameData;