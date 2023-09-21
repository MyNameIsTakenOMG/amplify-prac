//index.js code for integrating Google Calendar
require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');

const app = express();

const SCOPES = process.env.SCOPES;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

const KEY_PATH = process.env.KEY_PATH;
const EVENT_SCOPES = process.env.EVENT_SCOPES;

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const calendar = google.calendar({
  version: 'v3',
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});

app.get('/', (req, res) => {
  calendar.events.list(
    {
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    },
    (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: 'No upcoming events found.' }));
        }
      }
    }
  );
});

app.get('/createEvent', (req, res) => {
  var event = {
    summary: 'My first event!',
    location: 'Hyderabad,India',
    description: 'First event with nodeJS!',
    start: {
      dateTime: '2023-10-12T09:00:00-07:00',
      timeZone: 'Asia/Dhaka',
    },
    end: {
      dateTime: '2023-10-14T17:00:00-07:00',
      timeZone: 'Asia/Dhaka',
    },
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: EVENT_SCOPES,
  });
  auth.getClient().then((a) => {
    calendar.events.insert(
      {
        auth: a,
        calendarId: GOOGLE_CALENDAR_ID,
        resource: event,
      },
      function (err, event) {
        if (err) {
          console.log(
            'There was an error contacting the Calendar service: ' + err
          );
          return;
        }
        console.log('Event created: %s', event.data);
        res.jsonp('Event successfully created!');
      }
    );
  });
});

app.listen(3000, () => console.log(`App listening on port 3000!`));

// This code is contributed by Yashi Shukla
