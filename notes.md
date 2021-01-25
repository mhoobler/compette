# Goal
### Create an app that I could use to keep better track of my electronic components.

## Challenges
  - The `firebase` Providers/Consumers felt frustrating to use
    + probably wasted a good 4 hours trying to force these to work
  - Eventually ditched the Providers/Consumer and used my own Context element
    + This proved to be a challenge as well, I usually use Redux/Thunk to handle this sort of thing. I optted to using React.Context instead and feel this was a waste of time and should've stuck with Redux.
    + Overall I'm not really entirely happy with my structuring of how the Context and children elements interact with the firebase.database. I would've liked to keep all the database interaction within the context, but time constraints and inexperience hit me hard here.

## Upsides
  - I squashed all the bugs I could find. Couldn't do extensive testing though, so I'm sure I missed a fair bit.
  - I'm very happy with how the Search feature operates.
  - The Add Attribute function is I think much more user friendly in the final version.
  - I worked my ass off the last two days of the project and did a good job keeping things moving forward. :)

## Downsides
  - I don't really know how to monitor performance, but I'm almost positive the application in it's current state could not handle users with hundreds of Tables and thousands of Entries smoothly.
  - The file structure is a bit of an eye sore. I should come back to see just how bad navigating through the application is at some point
  - EditTable breaks away from how most of the application works, this was done in order to move the project forward with a waning time budget
  - Wanted users to be able to download a .csv file of the Table, but cut this feature.

## Final notes
  - Really wish I kept better track of time, will probably make something to help me with this as my next project
    + I think spent around 26-30 hours on this project, from 1/16/2020 - 1/22/2020
    + ~2 hours spent getting a feel of Firebase in React
    + ~2 hours developing the first iteration (FirebaseProvider/Consumer)
    + ~6 hours developing the 2nd iteration (no React.Context)
    + ~10 hours spent implementing React.Context to 2nd iteration and furthing development
    + ~8 hours spent improving usability and bug fixing
  - Overall I'm very happy with what I was able to get done... when considering the limited time budget AND the decisions I made during development. I really think if I spent a good 2-3 hours more on "getting a feel of Firebase" and planning I could've done a lot more. But I got to a point where I had to pull the trigger and get started to stay motivated.
  - I'm going to go through and touch up the look after the fact. Design isn't my strong suite and the goal of this project wasn't to gauge my design capabilities, but rather to see how well I'd perform "my desired role/tasks" (which would ideally have a tight focus on functionality) with a time budget.
    + Will try to make next project a bit simpler and familiar in terms of functionality, and have tighter forcus on design.
    + +1 hour on landing page