import React, { useState, useEffect } from 'react';
import {CardAbilities} from '../../engine/CardAbilities';
import './style.css'

export default ({
  name,
  currentAbilities,
  description,
  addDescription,
  setName,
  setDescription,
  setAddDescription,
  setCurrentAbilities,
  uploadAgain,
  setSequence
})  => {
  const [showModal, setShowModal]=useState(false);
  const [sumCost, setSumCost]=useState(0);

  var allAbilities = [];
  Object.keys(CardAbilities).map(function(key) {
    CardAbilities[key].levels.forEach(levelElement => {
      allAbilities.push({
        abilityName: key+" "+levelElement.amount, 
        abilityCost:  levelElement.cost
      });
    });
    return;
  });

  const addAbility=(index)=>{
    var joined = currentAbilities.concat(allAbilities[index]);
    setSumCost( sumCost+allAbilities[index].abilityCost );
    console.log(sumCost+allAbilities[index].abilityCost);
    setCurrentAbilities(joined);
  }

  const removeAbility=(index,e)=>{
    e.stopPropagation();
    var removed = currentAbilities.filter((_, i) => i !== index);
    setSumCost( sumCost+currentAbilities[index].abilityCost);
    console.log(sumCost+currentAbilities[index].abilityCost);
    setCurrentAbilities(removed);
  }
        return(
            <div className="bottom-center-detail">
                <p className="right-bottom-txt font-wh-500">Name</p>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} 
                  className="mint-input right-bottom-txt"/>

                <p className="right-bottom-txt font-wh-500 mt-5 pt-5">Abilities</p>
                <div className="mint-input ability-input-div"
                  onClick={()=>setShowModal(!showModal)}>
                  {currentAbilities.map((ability, index)=>
                        <button className={`ability-btn ${ability.abilityCost<0?"font-red":(ability.abilityCost>0?"font-green":"font-yellow")}`} 
                            key={index}>
                                {ability.abilityName}
                                <span className="ability-close" onClick={(e)=>removeAbility(index,e)}>X</span>
                        </button>
                  )}
                </div>

                {showModal &&
                <div className="ability-list-div">
                  <p className="font-red">Your card needs to have a point cost of 0. Current cost is {sumCost}.</p>
                  {allAbilities.map((ability, index)=>{
                    return <button className={`ability-btn ${ability.abilityCost<0?"font-red":(ability.abilityCost>0?"font-green":"font-yellow")}`} 
                      key={index} onClick={()=>addAbility(index)} disabled={currentAbilities.some(e=>e.abilityName===ability.abilityName)}>
                      {ability.abilityName}
                    </button>
                  })}
                </div>
                }

                <p className="right-bottom-txt font-wh-500 mt-5 pt-5">Description</p>
                <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} 
                  className="mint-input font-size-17"/>
                <input type="text" value={addDescription} onChange={(e)=>setAddDescription(e.target.value)} 
                  className="mint-input font-size-17 mt-3"/>

                <div className="inline-div full-width text-center mt-5">
                  <button className="button button-secondary" onClick={()=>uploadAgain()}>Upload Again</button>
                  <button className="button button-secondary" onClick={()=>setSequence(2)}>Continue</button>
                </div>
            </div>
        )
}