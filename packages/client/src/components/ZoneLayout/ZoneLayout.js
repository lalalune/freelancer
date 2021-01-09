import React, { useState } from 'react'

import "./ZoneLayout.css";

const ZoneLayout = () => {
  return (
    <div className="zone_main">
      <div className="zone_left_bar">
        <div className="blue_team">
          <div className="blue_team_icon">
            <svg width="356" height="62" viewBox="0 0 356 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0.00012207L310.144 6.60975e-05L356 33.0001L5.58998e-06 33.0002L0 0.00012207Z" fill="#062AAA" />
              <path d="M-4 61.0551L296.325 61.0551L320.67 42L-4 42.0001L-4 61.0551Z" fill="#062AAA" />
              <path d="M328.634 43.1747L306.624 60.141L314.876 60.141L337.436 43.1747L328.634 43.1747Z" fill="#062AAA" />
              <path d="M347.131 43.1935L325.319 60.1411L334.671 60.1411L355.933 43.1935L347.131 43.1935Z" fill="#062AAA" />
            </svg>
            <div className="blue_coins_count">
              <div className="coins_count">
                <svg width="21" height="34" viewBox="0 0 21 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 21V13L0 17.2786L10 21Z" fill="white" />
                  <path d="M10 11.8288V0L0 16L10 11.8288Z" fill="white" />
                  <path d="M11 0V11.7866L21 16L11 0Z" fill="white" />
                  <path d="M11 13V21L21 17.2813L11 13Z" fill="white" />
                  <path d="M11 22.1712L11 34L21 18L11 22.1712Z" fill="white" />
                  <path d="M10 34L10 22.2134L-1.39876e-06 18L10 34Z" fill="white" />
                </svg>
                <p className="coins_count_text">COIN</p>
                <p className="team_name">BLUE TEAM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="blue_team red_team">
          <div className="blue_team_icon">
            <svg width="356" height="64" viewBox="0 0 356 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M-1.5 0.00012207L310.144 8.14737e-05L356 33.0001L-1.49999 33.0002L-1.5 0.00012207Z" fill="#AA0606" />
              <path d="M-4 63.0551L296.325 63.055L320.67 44L-4 44L-4 63.0551Z" fill="#AA0606" />
              <path d="M328.634 45.1747L306.624 62.141L314.876 62.141L337.436 45.1747L328.634 45.1747Z" fill="#AA0606" />
              <path d="M347.131 45.1935L325.319 62.1411L334.671 62.1411L355.933 45.1935L347.131 45.1935Z" fill="#AA0606" />
            </svg>
            <div className="blue_coins_count">
              <div className="coins_count">
                <svg width="21" height="34" viewBox="0 0 21 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 21V13L0 17.2786L10 21Z" fill="white" />
                  <path d="M10 11.8288V0L0 16L10 11.8288Z" fill="white" />
                  <path d="M11 0V11.7866L21 16L11 0Z" fill="white" />
                  <path d="M11 13V21L21 17.2813L11 13Z" fill="white" />
                  <path d="M11 22.1712L11 34L21 18L11 22.1712Z" fill="white" />
                  <path d="M10 34L10 22.2134L-1.39876e-06 18L10 34Z" fill="white" />
                </svg>
                <p className="coins_count_text">COIN</p>
                <p className="team_name">RED TEAM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card_box">
          <div className="card_text">
            <p>BLUE TEAM OUT OF PLAY</p>
          </div>
        </div>
        <div className="card_box">
          <div className="card_text">
            <p>RED TEAM OUT OF PLAY</p>
          </div>
        </div>
      </div>
      <div className="zone_centre_bar">
        <div className="blue_team_main">
          <div className="blue_team_hand">
            BLUE TEAM HAND
          </div>
          <div className="blue_team_play_area">
            BLUE TEAM PLAY AREA
          </div>
        </div>
        {/* <div className="status_message_area">
          <p>Status Message Area</p>
        </div> */}
        <div className="red_team_main">
          <div className="red_team_hand">
            RED TEAM PLAY AREA
          </div>
          <div className="redteam_play_area">
            RED TEAM HAND
          </div>
        </div>
      </div>
      <div className="zone_right_bar">
        <div className="menu_set">
          <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2H30" stroke="white" stroke-width="3" />
            <path d="M0 11.5H30" stroke="white" stroke-width="3" />
            <path d="M0 21.5H30" stroke="white" stroke-width="3" />
          </svg>
        </div>
        <div className="card_box">
          <div className="card_text">
            <p>BLUE TEAM DECK</p>
          </div>
        </div>
        {/* <div className="action_button">
          <button>ACTION BUTTON</button>
        </div> */}
        <div className="card_box">
        <div className="card_text">
            <p>RED TEAM DECK</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZoneLayout;
