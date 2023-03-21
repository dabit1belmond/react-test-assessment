# TODO APP

## Intro

This our amazing TODO App which is still not working at all. But this will be your job! Let me explain you a little what you can find in our app right now.

First all, our app is originally built by Create React App so if you want to run it you just need to run

```
npm install && npm start
```

or

```
yarn && yarn start
```

Once you run the app you can enter to `localhost:3000` and take a look at it.

You can see that we have an input a button and an unorder list. But this is not doing quite much yet.

Lets talk about the files in our project now. Your main focus at first will be on `src/components/todo-list.js`. This is rendering what you see in the browser. This component is connected to a redux store through react-redux hooks. It is getting a variable called `todoList` which is a list of to-do and also we have an action called `addTodo` that adds to-do.

## Part 1

You may have noticed a file below our component: `src/components/todo-list.test.js`. This file is testing the expected behaviour of the component, and as you can imagine, all tests are failing. Your first job is to modify `src/components/todo-list.js` so that it will be able to pass all the tests and the app works as expected. You shouldn't need to modify any of the tests, just the component, but don't be afraid to read the specs code to be sure what the test is asking from you.

## Part 2

Well done! Now that we are able to add a Todo correctly we can start working on new product requirements. This user story just arrived from the oven, let's see if you can get it done. We would like to have also tests done for this user story. If you can, do tests before implementation but ifyou prefer to do them alter no worries and just start with implementation. And of course, don't worry about visuals.

#### Move Todo to Done List

As a user I want to be able to remove todos from the list and add them to a Done List in order to see which todos I've done already.

**Scenario 1**: Remove Item from Todo List

**Given** I have an item in my todo list  
**When** I click on the item  
**Then** it should remove it from the list  
**And** it should add it in the Done List
