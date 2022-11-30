# Bug-Tracker

## Website Url

https://cody-price-bug-tracker.herokuapp.com/

## Download and run locally

1. Download this project into an empty directory of your choosing.

2. If you don't already have Postgres installed on your local machine, then do so from here: https://www.postgresql.org/download/

3. Access your local Postgres database, then run all commands found inside databse.sql file (in sequential order) which is inside the root directory of this project.

4. Replace the Postgres database account information inside the db.js file with your own. This file can be found in root directory of this project.

5. Add the following line to the package.json file found inside the client directory — "proxy": "http://localhost:5000"

6. Maneuver to this project's client directory (Bug-Tracker\client) using a command line or terminal.

7. Run the following command (from the client directory): npm install

8. Maneuver to this project's root directory using a command line or terminal.

9. Run the following command (from the root directory): npm install

10. Run the following command (from the root directory): npm run devNodemon

## Editing project

In order for changes made to a scss file to be compiled and updated in the styles.css file, you must first:

1. Make sure that the scss file is imported into styles.scss (found in Bug-Tracker\client\src\CSS) via @use

2. Maneuver to this project's CSS directory (Bug-Tracker\client\src\CSS) using a command line or terminal.

3. Run the following command (from the CSS directory): sass ./styles.scss ./styles.css --watch

4. Keep the command line open and running while editing the project

## Before deployment

1. If present, remove the following line from the package.json file found inside the client directory — "proxy": "http://localhost:5000"

## Resources

*Online documentation:*  https://docs.google.com/document/d/1BlHjQvvfOXVDNEIT2mN0ByrDdnAvi45PIcieytp2D_E/edit?usp=sharing