import React, { useState } from "react";
export default function BlueTeam(props) {
 
  return (
    <div className="blue_team">
      <div className="blue_team_icon">
        <svg
          width="356"
          height="62"
          viewBox="0 0 356 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0.00012207L310.144 6.60975e-05L356 33.0001L5.58998e-06 33.0002L0 0.00012207Z"
            fill="#062AAA"
          />
          <path
            d="M-4 61.0551L296.325 61.0551L320.67 42L-4 42.0001L-4 61.0551Z"
            fill="#062AAA"
          />
          <path
            d="M328.634 43.1747L306.624 60.141L314.876 60.141L337.436 43.1747L328.634 43.1747Z"
            fill="#062AAA"
          />
          <path
            d="M347.131 43.1935L325.319 60.1411L334.671 60.1411L355.933 43.1935L347.131 43.1935Z"
            fill="#062AAA"
          />
        </svg>
        <div className="blue_coins_count">
          <div className="coins_count">
            <svg
              width="21"
              height="34"
              viewBox="0 0 21 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 21V13L0 17.2786L10 21Z" fill="white" />
              <path d="M10 11.8288V0L0 16L10 11.8288Z" fill="white" />
              <path d="M11 0V11.7866L21 16L11 0Z" fill="white" />
              <path d="M11 13V21L21 17.2813L11 13Z" fill="white" />
              <path d="M11 22.1712L11 34L21 18L11 22.1712Z" fill="white" />
              <path d="M10 34L10 22.2134L-1.39876e-06 18L10 34Z" fill="white" />
            </svg>
            <p className="coins_count_text"> {props.blueCoins} </p>
            <p className="team_name">BLUE TEAM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
