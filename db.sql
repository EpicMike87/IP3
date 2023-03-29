CREATE TABLE Ground (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    address VARCHAR(256) NOT NULL,
    surface VARCHAR(50) NOT NULL,
    photo_url VARCHAR(2048) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE Team (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team_name VARCHAR(50),
    team_rank INT NOT NULL,
    photo_url VARCHAR(2048),
    ground_id INT,
    home_att_str_last20 double(4, 3) DEFAULT 0,
    away_att_str_last20 double(4, 3) DEFAULT 0,
    home_def_str_last20 double(4, 3) DEFAULT 0,
    away_def_str_last20 double(4, 3) DEFAULT 0,
    home_att_str_last10 double(4, 3) DEFAULT 0,
    away_att_str_last10 double(4, 3) DEFAULT 0,
    home_def_str_last10 double(4, 3) DEFAULT 0,
    away_def_str_last10 double(4, 3) DEFAULT 0,
    home_form_last20 double(4, 3),
    away_form_last20 double(4, 3),
    home_form_last10 double(4, 3),
    away_form_last10 double(4, 3),
    FOREIGN KEY (ground_id) REFERENCES ground (id)
);

CREATE TABLE Player (
    id INT PRIMARY KEY DEFAULT 0,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    player_type VARCHAR(50) NOT NULL,
    team_id INT,
    date_of_birth DATE NOT NULL,
    age INT,
    photo_url VARCHAR(2048),
    team VARCHAR(2048),
    position VARCHAR(50),
    position_type varchar(50),
    matches_played INT,
    is_captain BIT NOT NULL,
    rating FLOAT(24),
    fouls_committed INT,
    yellow_cards INT,
    red_cards INT,
    passes INT,
    pass_accuracy FLOAT(24),
    FOREIGN KEY (team_id) REFERENCES team (id)
);

CREATE TABLE Attacker_Stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    goals INT NOT NULL,
    assists INT NOT NULL,
    shots INT NOT NULL,
    shots_on_target INT NOT NULL,
    penalties_taken INT NOT NULL,
    penalties_scored INT NOT NULL
);

CREATE TABLE Midfielder_Stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    shots INT NOT NULL,
    shots_on_target INT NOT NULL,
    goals INT NOT NULL,
    assists INT NOT NULL,
    tackles INT NOT NULL,
    blocks INT NOT NULL,
    interceptions INT NOT NULL
);

CREATE TABLE Defender_Stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    assists INT NOT NULL,
    goals INT NOT NULL,
    shots_on_target INT NOT NULL,
    duels INT NOT NULL,
    duels_won INT NOT NULL,
    tackles INT NOT NULL,
    blocks INT NOT NULL,
    interceptions INT NOT NULL
);

CREATE TABLE Goalkeeper_Stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    saves INT NOT NULL,
    goals_conceded INT NOT NULL
);

CREATE TABLE Team_Stats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    season INT,
    type VARCHAR(50),
    matches_played INT,
    matches_won INT,
    matches_drew INT,
    matches_lost INT,
    goals_for INT,
    goals_against INT,
    goal_difference INT,
    points INT
);

CREATE TABLE Team_Players(
    team_id INT DEFAULT 0,
    players_id INT,
    FOREIGN KEY (team_id) references Team(id)
);

CREATE TABLE fixture(
    id INT PRIMARY KEY AUTO_INCREMENT,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    home_team_name VARCHAR(2048),
    away_team_name VARCHAR(2048),
    home_team_goals INT NOT NULL,
    away_team_goals INT NOT NULL,
    date_time DATETIME NOT NULL,
    full_time_result CHAR(40) NOT NULL,
    prediction CHAR(40),
    FOREIGN KEY (home_team_id) REFERENCES team (id),
    FOREIGN KEY (away_team_id) REFERENCES team (id)
);

CREATE TABLE team_fixtures(
    teams_id INT,
    fixtures_id INT
);

CREATE TABLE team_team_stats(
    team_id INT,
    team_stats_id INT
);