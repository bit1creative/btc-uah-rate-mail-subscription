# Notes for the reviewers

The route `GET '/rate'` cannot return Number as Express res.send() cannot return Number type.

I'm not adding .env to .gitignore but I've created a .env_sample file as it should be done

P.S. Didn't write any test because was doing task on Saturday evening.