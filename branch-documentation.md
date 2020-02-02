## Work in this Branch

### New File Structure
Components are now organized into three folders:

1. Views

  * Anything that deals with layouts, svgs, css, etc.

2. Logic

  * Anything with state, handles user input, etc.

3. Actions

  * Things in here probably shouldn't be components at all. These components perform actions that make most sense as actions in a reducer updating the global session state. Moving to this sort of architecture is a longer term project.

Uncategorized components are ones I have not yet refactored. (This isn't to say that all the filed ones are finished.)

There is also a folder for hooks that contains a custom hook for responsive styling.

### Completed
* Added custom hook to get rid of duplicate logic for responsive styling
* Refactored means and chart data calculations in functional style and fix the useEffect logic in those components (`Tally.js` and `ChartData.js`)
  * This fixed the bug the student found where the charts froze after 5 or so rounds.
  * Also wrote some basic tests for these new functions
* Broke the progress charts page out into several components and optimize for shorter render time
  * Was able to cut the render time in half with `memo` in `Chart.js` and separating that memoized value from any hooks.
  * Still have questions re: whether using memo on anything else actually helps. See note in `Chart.js`.
  * Also want to try implementing suspense and using loading as a fallback to see if that enables a loading screen in the delay after clicking the back button from the round stats screen.
  * Also want to see about getting away from Victory and using just HTML Canvas or something that might be faster for these basic graphs
* Got rid of all hardcoded info re: question types so the UI can accept any new questions from the generator
* Refactor `Quiz.js` and modularize the logic there better
* Break `Stats.js` and `Session.js` into logic and views and modularize those calculations
  * In the end, removed these components altogether in favor of a unified `EndOfRound.js` controller
* Revisit `Chord.js` which should get renamed `Vexflow` and clean up
  * This depends on what happens with the generator too; some things that are vexflow specific might get pushed down here too
  * Add this to every layout:
  ```js
  useEffect(() => {
      window.scrollTo(0, 0)
  })
  ```

### In Progress
* Get rid of inline styles anywhere it makes sense in favor of styled-components
* Make any changes to the start menu logic to accommodate changes in the generator and not duplicate logic there
* SVG button highlights on hover-- do we like those?


### To Do
* Synthesize responsive styles. Lots of duplicates. Can we pass down styled components rather than js objects?
* Rethink the charts and what to display if we have a larger number of question types. Should we display best and worst question type and overall? And then have some other screen with detailed numbers? Or detailed numbers below?
  * KP is also thinking about this
* Update `keystrokes.js` to accomodate new question types
* Learn how to do snapshot testing! Testing by playing is getting way too time consuming!
* **Data & DB:** Decide what info we'd want to save to a db (whether or not we hook one up now) and revamp the `Session` object.
  * This will facilitate the project of moving to a redux-like architecture where all updates to this session "store" go through a reducer.
