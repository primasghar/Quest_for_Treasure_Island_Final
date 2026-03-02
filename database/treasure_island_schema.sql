
  CREATE TABLE IF NOT EXISTS game_airports(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      airport_id VARCHAR(40) NOT NULL,
      FOREIGN KEY (airport_id) REFERENCES airport(ident)
  );

 CREATE TABLE IF NOT EXISTS player(
      id INT NOT NULL auto_increment,
      name varchar(40) NULL,
	  PRIMARY KEY (id)
  )

  CREATE TABLE IF NOT EXISTS progress(
      id INT NOT NULL auto_increment,
      player_id INT,
      current_level INT default 1,
      game_score INT default 0,
      carbon_footprint INT default 0,
	  PRIMARY KEY (id),
      FOREIGN KEY (player_id) REFERENCES player(id),
      FOREIGN KEY (current_level) REFERENCES game_airports(id)
  )

 CREATE TABLE IF NOT EXISTS games(
      id INT NOT NULL auto_increment,
      game_name varchar(40),
      difficulty_level INT,
	  PRIMARY KEY (id),
  )

 CREATE TABLE IF NOT EXISTS quizlet(
      id INT NOT NULL auto_increment,
      question text,
      correct_answer text,
      difficulty_level INT,
	  PRIMARY KEY (id)
  )
  