import React from "react";
export default function RedTeam(props) {
  return (
    <div className="blue_team red_team">
      <div className="blue_team_icon">
        <svg
          width="356"
          height="64"
          viewBox="0 0 356 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-1.5 0.00012207L310.144 8.14737e-05L356 33.0001L-1.49999 33.0002L-1.5 0.00012207Z"
            fill="#AA0606"
          />
          <path
            d="M-4 63.0551L296.325 63.055L320.67 44L-4 44L-4 63.0551Z"
            fill="#AA0606"
          />
          <path
            d="M328.634 45.1747L306.624 62.141L314.876 62.141L337.436 45.1747L328.634 45.1747Z"
            fill="#AA0606"
          />
          <path
            d="M347.131 45.1935L325.319 62.1411L334.671 62.1411L355.933 45.1935L347.131 45.1935Z"
            fill="#AA0606"
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
            <p className="coins_count_text"> {props.redCoins}  </p>
            <p className="team_name">RED TEAM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
