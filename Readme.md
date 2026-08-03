# Quest for Treasure Island

This web game project has been built for the Software II course. It is the continuation of the Software I project which was completely
built with Python. In this final project a User Interface has been added.
It is a fast-paced airport-hopping game consisting mini luck and trivia games to earn boarding pass for the next flight in the 
quest to reach the Treasure Island.

## Game Description

At each airport, the player has to play a game. Each game can be played 3 times. If 3 turns has been utilized, 
the player can replay by paying from his score points as well as it cause increase in Carbon Emissions. Winning the
game will unlock the next airport destination and he/she will get the boarding to continue his/her quest. Each game 
also grants one item will help for the Treasure Hunt. There is a threshold for the Carbon Emissions if player exceeds
that they will have to either plant 1000 trees or give a share from treasure to any Environmental  Protection Organization.

## Features

- mini-games (3 attempts)
- Replay (500 Score deduction + Carbon Footprint increase)
- Player progress tracking (level, score, collectibles)
- Carbon footprint (airports distance * 150)
- Persistent save state via MariaDB

## Built With

- Backend: Python (Flask)
- Database: MariaDB
- Frontend: HTML/CSS/JS

## Setup

### Prerequisites
- Python 3.10+
- MariaDB 10.x

### Installation
1. Clone the repo
   git clone https://github.com/primasghar/Quest_for_Treasure_Island_Final.git
2. Set up the database
   Need Airport and Country data as was already provided in the assigment. Other tables will be automatically run.
3. Run the app
   apis.py and index.html

## How to play
The games are very intuitive. They are mostly luck and knowledge based. It can be played by 12+ folks.

