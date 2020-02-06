## Work in this Branch

### sessionDataReducer
Two actions have been moved to the reducer: tallying means and saving session settings. Need to add saving detailed round data.

Decided against making chart data part of Context because we don't need to hold onto it. Still don't love it as a component. Need to play with calling `getChartData` in `EndOfRound` instead. **Done**

### Fixing Context
Context is currently still piecemeal. Next step is to consolidate all of the data into a single session object and then consolidate reducers. This will require updating variable names throughout and in the action functions.
