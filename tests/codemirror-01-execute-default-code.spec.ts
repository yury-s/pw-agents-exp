import { test, expect } from '@playwright/test';

test.describe('Running Default Code - Execute Default Editor Code', () => {
  test('should execute default editor code and display output', async ({ page }) => {
    // Navigate to CodeMirror try page
    await page.goto('https://codemirror.net/try/');
    
    // Verify the default code is visible in the editor
    await expect(page.locator('.cm-content')).toContainText('import {basicSetup, EditorView} from "codemirror"');
    await expect(page.locator('.cm-content')).toContainText('import {javascript} from "@codemirror/lang-javascript"');
    
    // Click the "Run" button
    await page.getByRole('button', { name: 'Run' }).click();
    
    // Click the "Output" tab/button to view results
    await page.getByRole('button', { name: /Output/ }).click();
    
    // Wait for iframe to be visible
    const outputFrame = page.frameLocator('iframe').last();
    
    // Verify the output shows a functioning CodeMirror editor instance
    await expect(outputFrame.locator('.cm-content')).toBeVisible();
    
    // Verify the editor in the output contains the expected text
    await expect(outputFrame.locator('.cm-content')).toContainText("console.log('hello')");
    
    // Verify the code editor remains editable after running
    const mainEditor = page.locator('.cm-content').first();
    await expect(mainEditor).toBeEditable();
  });
});
