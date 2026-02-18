
create table game_airports(
      id int not null auto_increment,
      airport_id int,
	  primary key (id)
      foreign key (airport_id) references airport(ident)
  )

create table player(
      id int not null auto_increment,
      name varchar(40) null,
	  primary key (id)
  )

create table progress(
      id int not null auto_increment,
      player_id int,
      current_stage int null,
      game_score int,
      carbon_footprint int null,
	  primary key (id)
      foreign key (player_id) references player(id)
  )

create table games(
      id int not null auto_increment,
      game_name varchar(40) null,
      game_airports_id int,
      difficulty_level int,
	  primary key (id)
      foreign key (game_airports_id) references game_airports(id)
  )

create table quizlet(
      id int not null auto_increment,
      question varchar(255)
      correct_answer varchar(40) null,
      difficulty_level int,
	  primary key (id)
  )
  