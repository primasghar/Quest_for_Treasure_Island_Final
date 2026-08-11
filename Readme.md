# Quest for Treasure Island

This web game project has been built for the Software II course. It is the continuation of the Software I project which was completely
built with Python. In this final project a User Interface has been added.
It is a fast-paced airport-hopping game consisting mini luck and trivia games to earn boarding pass for the next flight in the 
quest to reach the Treasure Island.

## Game Story
There is a myth about Treasure Island. A long time ago, there was a ship carrying the gold to the Kingdom of Spain from 
the new world. On their way to Spain, they got stuck in a storm and crashed into an island. No one knows where that island is. 
But the rumors have it that the Island has lots of precious stones and gold hidden in one of its caves. Whoever finds 
that treasure will become very rich. 

There is a boy who lives in a small village in Finland who heard about the story of the Treasure Island. He made it his 
life's mission to find it. After searching for the Island for a long time, he met a traveler who told him the way to 
find the Treasure Island. 

The only way to reach that Island is by solving games. Those games are hidden at different airports.
This will ultimately take you to the final destination where a person will be waiting for you to take you to that Island.
There you can try and find the treasure.

## Game play
The game can be played by anyone. There is no age limit. The player goes through a number of airports in 
Europe. The game starts from Helsinki airport. Each airport has a unique game that the player has to win in order to 
proceed. There are some games that are luck based and some are based on knowledge. After winning each game the players 
will get an increase in score points and unlock the next airport destination by winning the boarding pass. 

At each level the player has three chances to win the game. After losing the third try, the user has the option to play 
the game again by paying some cash or quit the game. Each replay of the game will cost more carbon emissions by the 
player. If a player emits more carbon than the limit he/she will have to plant 100,000 trees or donate part of the 
treasure to the authentic environmental protection agency of their choice.  


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
   Need Airport and Country data as was already provided in the assigment. Other tables query will
   run when server is started. Remember to change the username and password for the MariaDB.
3. Run the app
   apis.py and index.html

## How to play
The games are very intuitive. They are mostly luck and knowledge based. It can be played by 12+ folks.

