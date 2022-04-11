CREATE TABLE mutualfund (
	symbol VARCHAR(6) CONSTRAINT mf_key PRIMARY KEY,
	name VARCHAR(33),
	total_net_assets INTEGER,
	ytd_return FLOAT,
	year_high FLOAT,
	year_low FLOAT,
	year_high_low_change FLOAT
);

CREATE TABLE etf (
	symbol VARCHAR(6) CONSTRAINT etf_key PRIMARY KEY,
	name VARCHAR(33),
	total_net_assets INTEGER,
	year_high FLOAT,
	year_low FLOAT,
	year_high_low_change FLOAT,
	avg_volume FLOAT
);

CREATE TABLE mfund_measurement (
	symbol VARCHAR(6),
	date_measured DATE,
	price FLOAT,
	nav_per_share FLOAT,
	PRIMARY KEY (date_measured),
	CONSTRAINT mfsym FOREIGN KEY (symbol) REFERENCES mutualfund(symbol)
);

CREATE TABLE etf_measurement (
	symbol VARCHAR(6),
	date_measured DATE,
	open_val FLOAT,
	close_val FLOAT,
	adj_close FLOAT,
	high FLOAT,
	low FLOAT,
	volume INTEGER,
	PRIMARY KEY (date_measured),
	CONSTRAINT etfsym FOREIGN KEY (symbol) REFERENCES etf(symbol)
);