import React, { useState, useEffect, useRef } from 'react';
import {CardAbilities} from '../../engine/CardAbilities';

export default ({ currentAbilities }) => {
    var detailTable = Object.keys(CardAbilities).map(function(abilityLabel) {
        var details = CardAbilities[abilityLabel];
        var abilityColor = 'font-green';
        var costDetails = details.levels.map((data, key)=>{
            var cost = parseInt(data.cost);
            if(cost<0)abilityColor='font-red';
            else if(cost===0)abilityColor='font-yellow';
            else abilityColor = 'font-green';
            console.log(abilityLabel+" "+data.amount);

            return <div className="bottom-right-mint-card-row-2 text-center" key={key}>
                <p className={`bottom-right-mint-card-circle 
                            ${abilityColor} 
                            ${currentAbilities.some(e=>e.abilityName===abilityLabel+" "+data.amount)&&'blue-shadow'}`}>
                    {cost>0?"+"+cost:cost}
                </p>
            </div>;
        })
        return <div className="bottom-right-mint-card-body pt-4 text-left">
            <div className="bottom-right-mint-card-row-1 text-left">
                <p className={`font-size-17 ${abilityColor}`}>{abilityLabel}</p>
                <p className="font-size-9">{details.description}</p>
            </div>
            <div className="bottom-right-mint-card-row-2 text-center">
                <p className="bottom-right-mint-card-circle font-green">+{details.synergy}</p>
            </div>
            {costDetails}
        </div>
    });

    return(
        <div className="col-4">
            <div className="bottom-right-mint-card">
                <div className="bottom-right-mint-card-head">
                    <p className="bottom-right-mint-card-row-1 text-left">Ability</p>
                    <p className="bottom-right-mint-card-row-2">SYN</p>
                    <p className="bottom-right-mint-card-row-2">1</p>
                    <p className="bottom-right-mint-card-row-2">2</p>
                    <p className="bottom-right-mint-card-row-2">3</p>
                </div>
                {detailTable}
            </div>
        </div>
    );
}