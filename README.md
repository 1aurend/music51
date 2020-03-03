# Chord Crusher

[![Build Status](https://travis-ci.com/1aurend/music51.svg?branch=master)](https://travis-ci.org/1aurend/music51)

Chord Crusher is a chord identification training app.

## Development

Follow these instructions to get you started hacking on the Chord Crusher application.

### 1. Open up your Terminal

Navigate to the `Terminal` application and open it up. We will use this to install the software necessary to develop, test, and run our code.

#### Getting our bearings

To get started, open up `Terminal`, and let's get a sense of our environment with the `pwd` (i.e., "print working directory") command. Type the following into your terminal and press ***enter*** or ***return*** to run the command.

```Zsh
pwd
```

This should show you where you are. Now, to get a sense of what files you have to work with in your current working directory, run the the `ls` (i.e., "list directory contents") command:

```Zsh
ls
```

This should enumerate all of the files and subdirectories in your current working directory.

#### Let's get to work

I assume we actually want to get stuff done. Let's get productive and make a directory for your work in the Bok Center Learning Lab. You can name it anything you like, but here we will just call it `bok`.

```Zsh
mkdir bok
```

The `mkdir` command creates a directory (or a "folder" in macOS parlance) with the name that you provide. For now, stay away from spaces in your names (that confuses some programs). Instead, you can use `-` or `_` or a variety of other delimiters to split up compound-worded names.

Next, navigate to your new directory with the `cd` command:

```Zsh
cd bok
```

Now that we have warm, dry, and safe home for our Learning Lab work, let's get coding.

### 2. Use `git` to checkout the code

`git` is a command line program that makes it possible to keep track of the changes you make to your work, and to collaborate with other programmers in an efficient and safe way. It is hard to put into words how helpful this tool can be! What is particularly cool is that it comes pre-installed on your computer, so you don't need to install anything to get going.

Assuming that we are in our `bok` directory (run the `pwd` command to make sure!), run the following command to download all of the source code for the Chord Crusher application.

```Zsh
git clone https://github.com/1aurend/music51
```

This will just download the directory. You can verify this by running the `ls` command from above. 

But now we need to break our way in. We can use the `cd` command we learned earlier:

```Zsh
cd music51
```

Again, run the `ls` command to see what we've go to play with. While we can't develop, test, or run our code yet, we can navigate the file structure and get a sense of what we've got ahead of us.

*For more information, check out this `git` [tutorial](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners).*

### 3. Install Homebrew

There are many ways to install the software needed to develop, test, and run our code, but `brew` makes it easy!

To install Homebrew, copy and paste the following code into the terminal:

```Zsh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Then, press **enter** to begin the download and installation.

Once installation is complete, run the following command to make sure that everything went well:

```Zsh
brew doctor
```

We can make sure that `brew` is up-to-date by running the following command:

```Zsh
brew update
```

*For more information, check out Homebrew's [homepage](brew.sh).*

### 4. Install Node.js and npm (Node Package Manager)

Our application uses [`Node.js`](https://nodejs.org/en/about/) for development, testing, and running our app.

We can use `brew` to install both `Node.js` and `npm` with a single command:

```Zsh
brew install node
```

### 5. Update our dependencies

The code in Chord Crusher is built on a bunch of other people's code.

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

You should hopefully get witness an avalanche of strange seeming information streaming down the terminal window.

### 7. Run Chord Crusher

If all of the tests are "green" (i.e., passing), let's run the application in a browser:

```Zsh
npm start
```

This should open up Chord Crusher in a window in your default web browser. Now you can play the game!