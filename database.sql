CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE drones (
	 id SERIAL PRIMARY KEY,
	 urlString varchar(1000),
	 droneDescription varchar(1000),
	 dronetitle varchar(1000),
	 frequency DOUBLE PRECISION,
);

CREATE TABLE presets (
  id SERIAL PRIMARY KEY,
  createdTs TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  person_id INT REFERENCES person,
  binauralVal INT,
  synthFreq DOUBLE PRECISION,
  synthVolume INT,
  playerVolume INT,
  balance INT,
  masterVolume INT,
  drone_id INT REFERENCES drones,
  descriptionString varchar(10000)
  descriptiongeneral_id INT REFERENCES descriptiongeneral,
);
  
CREATE TABLE descriptiongeneral (
	id SERIAL PRIMARY KEY,
	min DOUBLE PRECISION,
	max DOUBLE PRECISION,
	title varchar(1000),
	description varchar(1000),
	toomuch varchar(1000),
	toolittle varchar(1000),
	optimal varchar(1000),
	);
	  
CREATE TABLE descriptionspecific (
	id SERIAL PRIMARY KEY,
	min DOUBLE PRECISION,
	max DOUBLE PRECISION,
	description varchar(1000)
	);