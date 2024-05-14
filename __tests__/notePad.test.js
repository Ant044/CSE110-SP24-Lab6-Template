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
    //const newestNoteID = newestNote.id;
    /*
    const newestNoteID = await page.evaluate(note => {
      return note.getAttribute('id');
    }, newestNote);
    */

    //await page.type(`.note:nth-child(${newestNoteIndex + 2})`, "thisistext");

    await newestNote.click()
    
    await page.keyboard.type("thisistext");
    await page.keyboard.press("Tab");

    newestNoteText = await page.evaluate(textArea => textArea.outerHTML, newestNote);

    const savedNotes = await page.evaluate(() => {
      return localStorage.getItem("notesApp-notes");
    });

    expect(savedNotes).toBe("thisistext");
  });

  //Check to make sure that an old note can be edited

  //Check to make sure that notes remain after reload

  //Check to make sure double-click to delete note works
});
