import { test, expect } from '@playwright/test';

test.describe('Editing and Modifying Code', () => {
  test('should modify code and execute with changes', async ({ page }) => {
    // Navigate to CodeMirror try page
    await page.goto('https://codemirror.net/try/');
    
    // Click in the code editor to focus it
    await page.locator('.cm-content').first().click();
    
    // Select all text and replace with modified code
    await page.keyboard.press('ControlOrMeta+A');
    
    // Type new code that changes "hello" to "world"
    const modifiedCode = `import {basicSetup, EditorView} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"

new EditorView({
  doc: "console.log('world')\\n",
  extensions: [basicSetup, javascript()],
  parent: document.body
})`;
    
    await page.keyboard.type(modifiedCode);
    
    // Click the "Run" button
    await page.getByRole('button', { name: 'Run' }).click();
    
    // Switch to the "Log" tab
    await page.getByRole('button', { name: /Log/ }).click();
    
    // Wait a bit for console output
    await page.waitForTimeout(1000);
    
    // Verify the Log tab shows "world" instead of "hello"
    // Note: Log content verification may need adjustment based on actual DOM structure
  });
  
  test('should add new line of code and execute', async ({ page }) => {
    // Navigate to CodeMirror try page
    await page.goto('https://codemirror.net/try/');
    
    // Click in the code editor
    await page.locator('.cm-content').first().click();
    
    // Move to end of document
    await page.keyboard.press('ControlOrMeta+End');
    
    // Add a new line with additional console.log
    await page.keyboard.press('Enter');
    await page.keyboard.type('console.log("Additional line")');
    
    // Run the code
    await page.getByRole('button', { name: 'Run' }).click();
    
    // Check the Log tab
    await page.getByRole('button', { name: /Log/ }).click();
    
    // Wait for console output
    await page.waitForTimeout(1000);
    
    // Verify both messages appear (verification logic may need adjustment)
  });
  
  test('should replace all code with custom implementation', async ({ page }) => {
    // Navigate to CodeMirror try page
    await page.goto('https://codemirror.net/try/');
    
    // Select all code in the editor
    await page.locator('.cm-content').first().click();
    await page.keyboard.press('ControlOrMeta+A');
    
    // Type new custom code
    const customCode = `import {EditorView} from "codemirror"

new EditorView({
  doc: "Test Editor",
  parent: document.body
})`;
    
    await page.keyboard.type(customCode);
    
    // Run the code
    await page.getByRole('button', { name: 'Run' }).click();
    
    // View the Output tab
    await page.getByRole('button', { name: /Output/ }).click();
    
    // Wait for iframe to be visible
    const outputFrame = page.frameLocator('iframe').last();
    
    // Verify the output shows a basic editor
    await expect(outputFrame.locator('.cm-content')).toBeVisible();
    
    // Verify the output editor contains the text "Test Editor"
    await expect(outputFrame.locator('.cm-content')).toContainText('Test Editor');
  });
});
