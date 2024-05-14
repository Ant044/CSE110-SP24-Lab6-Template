const { Keyboard } = require("puppeteer");

describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto('https://ant044.github.io/CSE110-SP24-Lab6-Template/');
  });

/* Test template
  it('Initial Home Page - Check for ', async () => {
    console.log('Checking...');
  });
*/

  //Check to make sure that the add-note button exists with the correct text
  it('Initial Home Page - Check for the Add Note button', async () => {
    console.log('Checking for the add-note button...');

    const addNoteButton = await page.$(".add-note")
    const addNoteText = await page.evaluate(button => button.innerText, addNoteButton)
    expect(addNoteText).toBe("Add Note");
  });

  //Check to make sure the "Add Note" button creates a new note
  it('Initial Home Page - Check for Add Note Functionality', async () => {
    console.log('Checking that Add Note button creates a note...');

    const addNoteButton = await page.$(".add-note");
    await addNoteButton.click();
    const allNotes = await page.$$(".note");
    const numNotes = allNotes.length;

    expect(numNotes).toBe(1);
  });

  //Check to make sure that a new note can be edited
  it('Initial Home Page - Check for create and edit note functionality', async () => {
    console.log('Checking that a note can be created and edited');

    const addNoteButton = await page.$(".add-note");
    await addNoteButton.click();
    const allNotes = await page.$$(".note");
    const newestNoteIndex = allNotes.length - 1;
    const newestNote = allNotes[newestNoteIndex];

    await newestNote.click()
    
    await page.keyboard.type("thisistext");
    await page.keyboard.press("Tab");

    const savedNotes = await page.evaluate(() => {
      return localStorage.getItem("stickynotes-notes");
    });

    savedNotesParsed = JSON.parse(savedNotes);
    newestSavedNoteText = savedNotesParsed[newestNoteIndex];

    expect(newestSavedNoteText.content).toBe("thisistext");
  });

  //Check to make sure that an old note can be edited
it('Initial Home Page - Checking for editing an old note', async ()=> {

  console.log("Checking for editing an old note.");

  const addNoteButton = await page.$(".add-note");
  await addNoteButton.click();
  const allNotes = await page.$$(".note");
  const editNoteIndex = 0;
  const editNote = allNotes[editNoteIndex];

  await editNote.click()

  await page.keyboard.type("editing text");
  await page.keyboard.press("Tab");

  await page.waitForFunction(() => localStorage.getItem("stickynotes-notes"));

  const savedNotes = await page.evaluate(() => {
    return localStorage.getItem("stickynotes-notes");
  });

  savedNotesParsed = JSON.parse(savedNotes);
  const newestSavedNoteText = savedNotesParsed[editNoteIndex].content;
  
  expect(newestSavedNoteText).toBe("editing text");

});
  //Check to make sure that notes remain after reload
  it('Initial Home Page - Checking that notes remain after reload', async() => {
    console.log("Checking that notes remain after reload.");

    const preReloadData = await page.evaluate(() => {
      return localStorage.getItem("stickynotes-notes");
    });

    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

    const postReloadData = await page.evaluate(() => {
      return localStorage.getItem("stickynotes-notes");
    });

    expect(postReloadData).toBe(preReloadData);
  });

  //Check to make sure double-click to delete note works
  it('Initial Home Page - Checking that deleting notes works', async() => {
    console.log("Checking that notes are deleted upon double click.");
    const allNotes = await page.$$(".note");
    const initialNoteCount = allNotes.length;

    const newestNoteIndex = allNotes.length - 1;
    const newestNote = allNotes[newestNoteIndex];

    await newestNote.click({clickCount:2})

    const allNotespostDelete = await page.$$(".note");
    const postDeleteNoteCout = allNotespostDelete.length;
    
    expect(postDeleteNoteCout).toBe(initialNoteCount-1)
  });
});
