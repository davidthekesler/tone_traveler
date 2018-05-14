# Tone Traveler

Tone Traveler masks distractions in your environment and focuses your mental activity, suggesting mind states ranging from highly alert to deeply relaxed. It'll help when you want to tackle an immersive problem at a busy cafe, bond with a book in a crowded airport waiting area, or simply stay on task during a hectic work day.

The top half of Tone Traveler’s simple yet customizable player allows you to select from a library of sound sources, ranging from slowly evolving melodic drones to more natural soundscapes such as waterfalls, forests, and wind. 

The large dial on the center of the screen uses two sine-wave synthesizers panned hard L and R with a spread operator on their inputs to control the underlying low-frequency binaural beat for each sound source. The pitch of the binaural beat is automatically matched to the sound source. Information about the suggested brain activity for the frequency selected is displayed underneath the dial as you adjust it, as well as a readout of the specific frequency you're targeting. For more information on binaural beats, see below.

A balance slider on the lower right adjusts the mix between the sound source and the binaural beat, and a master volume slider on the lower left lowers the overall sound in case you want to play it under other programmatic material.

![image](https://user-images.githubusercontent.com/11182170/39959067-c2629034-55d1-11e8-90e2-2801d5b4f90e.png)

## Tech Used

React
Express
Node.js
PostgreSQL
Material-UI
Moment.js
Tone.js
Trend.js
Web Audio API

## SQL Database structure

```SQL
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

```

## Additional information on binaural beats

Brain activity produces a variety of electrical patterns, or "brain waves" at different frequencies. These waves can be observed or recorded with an EEG (electroencephalograph) and different frequency ranges of these waves have been shown to correspond with different mind-states, moods, and activities. Research has gone so far as to classify these mind-states into five overarching groups: Gamma, Beta, Alpha, Theta, and Delta. Information on these groups and their associated brain states can be found here: 

https://mentalhealthdaily.com/2014/04/15/5-types-of-brain-waves-frequencies-gamma-beta-alpha-theta-delta/


A binaural beat is very much akin to the wobble that one hears when tuning an instrument. As tones become very close to each other, the difference between them forms a lower, slower frequency that appears as a sort of beating sound. The periodicity of this beating sound can then be set to correspond to the frequencies and mind-states associated with the brain's electrical patterns. Some studies show that if one listens to a binaural beat with a frequency corresponding to a known activity or state, the mind may be nudged or suggested into adopting that same state. Very specific information about frequencies and their associated brain states and therapeutic uses can be found here:

http://lunarsight.com/freq.htm
