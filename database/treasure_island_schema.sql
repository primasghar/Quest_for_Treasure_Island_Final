
  CREATE TABLE IF NOT EXISTS game_airports(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      airport_id VARCHAR(40) NOT NULL,
      FOREIGN KEY (airport_id) REFERENCES airport(ident)
  );

 CREATE TABLE player(
      id INT NOT NULL auto_increment,
      name varchar(40) NULL,
	  PRIMARY KEY (id)
  )

 CREATE TABLE progress(
      id INT NOT NULL auto_increment,
      player_id INT,
      current_level INT,
      game_score INT,
      carbon_footprint INT,
	  PRIMARY KEY (id),
      FOREIGN KEY (player_id) REFERENCES player(id),
      FOREIGN KEY (current_level) REFERENCES game_airports(id)
  )

 CREATE TABLE games(
      id INT NOT NULL auto_increment,
      game_name varchar(40),
      difficulty_level INT,
	  PRIMARY KEY (id),
  )

 CREATE TABLE quizlet(
      id INT NOT NULL auto_increment,
      question text,
      correct_answer text,
      difficulty_level INT,
	  PRIMARY KEY (id)
  )
  