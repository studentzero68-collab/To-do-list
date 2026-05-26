# My To-Do List — Week 5 Submission

**Type:** Individual
**Block:** Block 1 — Weeks 1–10
**Week:** Week 5

---

## Live Link

[View Project on GitHub Pages](https://studentzero68-collab.github.io/To-do-list/)

---

## What I Built

So what I built is a to-do list app using only HTML, CSS and vanilla JavaScript.I ahd just used some explination from some classmates and then from there it was just failure with me and the MDN documentation figuring it out. It sounds simple but honestly it was way harder than I expected and I learned a lot building it.

---

## Features

- Add a new task
- Mark tasks as incomplete, in progress or complete
- Delete tasks
- Filter by status — All, Incomplete, In Progress, Complete
- Data persists on page reload using localStorage

---

## The HTML

The HTML side of things was pretty straightforward honestly. I have a header with the title and the "Add New Todo" button. Below that I added four filter buttons — All, Incomplete, In Progress and Complete. Each button has a `data-filter` attribute which is basically just a label that tells the JavaScript which filter to apply when you click it. Then I have an empty list div where all the todos get added dynamically by the JavaScript instead of hardcoding them in.

---

## The CSS

For the styling I went with a dark purple theme with a night sky background gif because I just wanted it to have a vibe to it. Each todo card has a coloured left border depending on its status — red for incomplete, orange for in progress and green for complete. The filter buttons have a dark background and when one is active it gets a white border and a brighter purple background so you can actually tell which one you're on. I also added hover effects so the buttons scale up slightly when you hover over them which just makes the whole thing feel more alive.

---

## The JavaScript

This is honestly where most of the work happened and where I struggled the most but also where I learned the most.

When the page loads it calls a `load()` function that checks localStorage for any saved todos. If it finds any it converts them from a JSON string back into an array using `JSON.parse()` and loops through each one to put them back on the screen. This is basically how your todos survive a page refresh — without this everything would just disappear every time you reloaded and that would be pointless.

When you click "Add New Todo" it creates a new object with an id, empty text and a default status of incomplete. It then calls `CreateTodoElement()` which builds all the HTML for that todo card on the fly — the status button, the text input and the edit and remove buttons. Once it's built it gets added to the top of the list using `prepend()` and the input automatically gets focused so you can just start typing straight away without having to click anything.

The status button was honestly something I really had to work through because I kept getting it wrong. Every time you click it it cycles through three states — incomplete to inprogress to complete and back to incomplete. It removes the old CSS class and adds the new one so the colour updates, and it also calls `FilterTodos()` straight away so if you're already on a filtered view it immediately adjusts without you having to do anything.

The filter buttons work by keeping track of the current filter in a variable called `currentFilter`. When you click one it updates that variable, marks that button as active and calls `FilterTodos()`. That function just loops through every todo on the screen and either shows or hides it depending on whether its CSS class matches the filter you picked.

Every time something changes — whether that's adding, editing, removing or changing a status — it calls `save()` which converts the todos array into a JSON string and puts it in localStorage so nothing gets lost when you close the tab.

---

## 100-Word Reflection

The MDN page that helped me the most was the one on localStorage. I had never really understood how data could survive a page refresh before I read through it. It explained how `localStorage.setItem()` stores data and `localStorage.getItem()` retrieves it, and how `JSON.stringify()` and `JSON.parse()` work together to convert arrays into strings and back again. Without that page I genuinely would not have been able to make the todos persist. It made me realise that MDN is not just a reference you skim — it actually teaches you how things work properly if you slow down and read it.

---

## What I Learned

Honestly the biggest things I took away from this were how localStorage works, how to cycle through states with if/else and how filters work by just showing and hiding elements based on CSS classes. It wasn't easy and there were definitely moments where I wanted to give up but working through every bug step by step made it all click in the end 
