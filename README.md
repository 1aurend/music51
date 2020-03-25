# Chord Crusher

[![Build Status](https://travis-ci.com/1aurend/music51.svg?branch=master)](https://travis-ci.org/1aurend/music51)

Chord Crusher is a music theory chord identification training web application.

## Development

Follow these instructions to get you started hacking on the Chord Crusher application.

We will use the following bits of software to help us:

- Terminal
- git
- Homebrew
- Node.js / npm (Node Package Manager)
- Atom

This may all seem like gibberish at first, but we will walk you through getting everything situated so we can get to work.

### 1. Open up your `Terminal`

Navigate to the `Terminal` application and open it up.

*We will use the `Terminal` to install the software necessary to develop, test, and run our code. The `Terminal` may be intimidating at first, but it will be our base camp. It will slowly start to feel like home. Perhaps not your dream home, but home in the sense that you've made a dorm room feel like home.*

#### Getting our bearings

To get started, open up `Terminal`. From here, we can get a sense of our environment with the `pwd` (i.e., "print working directory") command. All you need to do is type the following into your terminal and press ***enter*** or ***return*** to run the command.

```Zsh
pwd
```

To get a sense of what files you have to work with in your current working directory, run the the `ls` (i.e., "list directory contents") command:

```Zsh
ls
```

This should enumerate all of the files and subdirectories in your current working directory.

#### Getting to work

Let's make a directory for your work in the Bok Center Learning Lab. You can name it anything you like, but here we will just call it `bok`.

```Zsh
mkdir bok
```

The `mkdir` command creates a directory (or a "folder" in macOS parlance) with the name that you provide. For now, stay away from spaces in your names (that confuses some programs). Instead, you can use `-` or `_` or a variety of other delimiters to split up compound-worded names.

Next, navigate to your new directory with the `cd` (i.e., "change directory") command:

```Zsh
cd bok
```

Now that we have a warm, dry, and safe home for our Learning Lab work, let's get coding.

*To flex your `Terminal` muscles, you can run `cd ..` to navigate back up to where you were before you descended into your new `bok` directory. Run `cd bok` to spelunk back down.*

### 2. Use `git` to checkout the code

`git` is a command line program that makes it possible to keep track of the changes you make to your work, and to collaborate with other programmers in an efficient and safe way.

Assuming that we are in our `bok` directory (run the `pwd` command to make sure!), run the following command to download all of the source code for the Chord Crusher application:

```Zsh
git clone https://github.com/1aurend/music51
```

You can verify that the directory was downloaded by running the `ls` command from above. You should see `music51` in the listing.

We aren't inside the `music51` directory yet, but we are instead hovering just outside of it. In order to break in, we can use the `cd` command we learned earlier:

```Zsh
cd music51
```

Again, run the `ls` command to see what we've go to play with. While we can't develop, test, or run our code yet, we can navigate the file structure and get a sense of what we've got ahead of us.

If you want to escape the terminal for a moment, you can type in the following to open the current working directory in the `Finder`:

```Zsh
open .
```

This might be a more familiar way of working for you.

*For a more in-depth introduction to `git`, check out this [tutorial](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners).*

*To get an idea of the nuts and bolts of `git`, run the command `man git` in your terminal to display the "manual" for `git`. Beware the rabbit hole.*

### 3. Install Homebrew

There are many ways to install the software needed to develop, test, and run our code, but Homebrew makes it easy to manage it all.

To install Homebrew, copy and paste the following code into the terminal:

```Zsh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then, press **enter** or **return** to begin the download and installation.

Once installation is complete, run the following command to make sure that everything went well:

```Zsh
brew doctor
```

*We invoke the Homebrew program with the sleeker `brew`.*

We can make sure that `brew` is up-to-date by running the following command:

```Zsh
brew update
```

*For more information, check out Homebrew's [homepage](brew.sh).*

### 4. Install Node.js and npm (Node Package Manager)

Our application uses [`Node.js`](https://nodejs.org/en/about/) for development, testing, and running our app. We use `npm` to manage all of the code that we use that is written by people smarter than us.

We can use `brew` to install both `Node.js` and `npm` with a single command:

```Zsh
brew install node
```

Now we need to ensure that software downloaded with `npm` can be found by the system. Run the following command to make sure everything is in its right place:

```Zsh
npm config set prefix /usr/local
```

### 5. Update our dependencies

The code in Chord Crusher is built on a bunch of other people's code. We can download all of the correct versions of these packages with a single command.

```Zsh
npm install
```

*If you are feeling particularly cool today, you can type `npm i` for short.*

This will take a little bit of time, and should present a deluge of colored comments in your terminal. It's going to be OK.

### 6. Run the test suite

To make sure that all the plumbing is clean, let's run some tests. The tests exist so we know that the code is in good working order without having to get the whole machine running. Try running the following command:

```Zsh
npm test
```

If you get a message like this:

```Zsh
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

Follow the instructions and press `a`.

You should hopefully witness an avalanche of strange seeming information streaming down the terminal window. Hopefully none of the tests fail, otherwise we've got some bug fixing to do.

### 7. Run Chord Crusher

If all of the tests are "green" (i.e., passing), let's run the application in a browser:

```Zsh
npm start
```

This should open up Chord Crusher in a window in your default web browser. Now you can play the game!

### 8. Write / remove / fix some code in Atom

You can open the source files for Chord Crusher in any text editor, but we've been using Atom with pleasure. 

Navigate to the [Atom webpage](https://atom.io) to download the Atom text editor.

Once installed, you can get started with `Atom` by running the following command in the `Terminal`:

```Zsh
atom .
```

This will open the entire current working directory in Atom, allowing you to navigate through all of the files and subdirectories contained herein.