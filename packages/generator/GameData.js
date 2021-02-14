const AbilityTypes = {
  // Positive abilities
  ENGINEER: "Engineer",
  RESEARCH: "Research",
  REHIRE: "Rehire",
  CAPITALIZE: "Capitalize",
  CANCEL: "Cancel",
  PROFIT: "Profit",
  RECRUIT: "Recruit",
  THEFT: "Theft",
  // Negative abilities
  SUBCONTRACT: "Subcontract",
  EXPENSE: "Expense",
  DOWNSIZE: "Downsize",
  ENTERTAIN: "Entertain",
  SPEND: "Spend",
  BAN: "Ban",
  INFLUENCE: "Influence",
  EXPLOIT: "Exploit"
};

const AbilityTypesFilter = {
  [AbilityTypes.PROFIT]: [
    AbilityTypes.THEFT, AbilityTypes.SUBCONTRACT, AbilityTypes.SPEND
  ],
  [AbilityTypes.THEFT]: [
    AbilityTypes.PROFIT, AbilityTypes.SUBCONTRACT, AbilityTypes.SPEND
  ],
  [AbilityTypes.SUBCONTRACT]: [
    AbilityTypes.PROFIT, AbilityTypes.THEFT, AbilityTypes.SPEND
  ],
  [AbilityTypes.SPEND]: [
    AbilityTypes.PROFIT, AbilityTypes.THEFT, AbilityTypes.SUBCONTRACT
  ]
}

const CardTypes = {
  Hire: "Hire",
  Lead: "Lead",
  Wares: "Wares",
  Equipment: "Equipment"
};

const PositiveAbilities = [
  // ENGINEER
  {
    type: AbilityTypes.ENGINEER,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "le0n", adjective: "Ambitious", singleNoun: "XR Developer", multiNoun: "Developer", postfix: "and Developer", description: "Draw ${AMT} card(s)." },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 2, cost: 2, synergy: 1, legendary: "Rowen Z", adjective: "Studious", singleNoun: "Network Engineer", multiNoun: "Engineer", postfix: "and Engineer", description: "Draw ${AMT} card(s)." },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 3, cost: 4, synergy: 1, legendary: "James Elmore", adjective: "Expert", singleNoun: "System Administrator", multiNoun: "SysAdmin", postfix: "and SysAdmin", description: "Draw ${AMT} card(s)." },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // RESEARCH
  {
    type: AbilityTypes.RESEARCH,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // REHIRE
  {
    type: AbilityTypes.REHIRE,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // CAPITALIZE
  {
    type: AbilityTypes.CAPITALIZE,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // CANCEL
  {
    type: AbilityTypes.CANCEL,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // PROFIT
  {
    type: AbilityTypes.PROFIT,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // RECRUIT
  {
    type: AbilityTypes.RECRUIT,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // THEFT
  {
    type: AbilityTypes.THEFT,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
];

const NegativeAbilities = [
  // SUBCONTRACT
  {
    type: AbilityTypes.SUBCONTRACT,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 2, cost: 2, synergy: 1, legendary: "Rowen Z", adjective: "Studious", singleNoun: "Network Engineer", multiNoun: "Engineer", postfix: "and Engineer", description: "Draw ${AMT} card(s)." },
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Hire]: { amount: 3, cost: 4, synergy: 1, legendary: "James Elmore", adjective: "Expert", singleNoun: "System Administrator", multiNoun: "SysAdmin", postfix: "and SysAdmin", description: "Draw ${AMT} card(s)." },
      } // 3
    ]
  },
  // EXPENSE
  {
    type: AbilityTypes.EXPENSE,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // DOWNSIZE
  {
    type: AbilityTypes.DOWNSIZE,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // ENTERTAIN
  {
    type: AbilityTypes.ENTERTAIN,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // SPEND
  {
    type: AbilityTypes.SPEND,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // BAN
  {
    type: AbilityTypes.BAN,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // INFLUENCE
  {
    type: AbilityTypes.INFLUENCE,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
  // EXPLOIT
  {
    type: AbilityTypes.EXPLOIT,
    rarityFactor: 1.0,
    allowedCardTypes: [CardTypes.Lead, CardTypes.Hire, CardTypes.Wares, CardTypes.Equipment],
    levels: [
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      },
      {
        [CardTypes.Hire]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Lead]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Wares]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
        [CardTypes.Equipment]: { amount: 1, cost: 0, synergy: 1, legendary: "", adjective: "", singleNoun: "", multiNoun: "", postfix: "", description: "" },
      } // 3
    ]
  },
];

const GameData = {
  PositiveAbilities,
  NegativeAbilities,
  AbilityTypes,
  CardTypes,
}

export default GameData;