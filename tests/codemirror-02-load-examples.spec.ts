import { test, expect } from '@playwright/test';

test.describe('Loading and Using Examples - Load Minimal Editor Example', () => {
  test('should load minimal editor example from dropdown', async ({ page }) => {
    // Navigate to CodeMirror try page
    await page.goto('https://codemirror.net/try/');
    
    // Click on the "Select example..." dropdown and select "Minimal editor"
    await page.locator('#examples').selectOption('Minimal editor');
    
    // Verify the dropdown shows "Minimal editor" as selected
    await expect(page.locator('#examples')).toHaveValue('Minimal editor');
    
    // Verify the code editor updates to show the minimal editor example code
    await expect(page.locator('.cm-content')).toContainText('import {minimalSetup, EditorView} from "codemirror"');
    
    // Verify code includes minimalSetup instead of basicSetup
    await expect(page.locator('.cm-content')).toContainText('minimalSetup');
    
    // Verify the doc property is set to "..."
    await expect(page.locator('.cm-content')).toContainText('doc: "..."');
    
    // Verify the URL updates to include the example parameter
    await expect(page).toHaveURL(/example=Minimal%20editor/);
  });
  
  test('should run the minimal editor example', async ({ page }) => {
    // Navigate to CodeMirror try page
    await page.goto('https://codemirror.net/try/');
    
    // Select "Minimal editor" from the example dropdown
    await page.locator('#examples').selectOption('Minimal editor');
    
    // Click the "Run" button
    await page.getByRole('button', { name: 'Run' }).click();
    
    // Switch to the "Output" tab
    await page.getByRole('button', { name: /Output/ }).click();
    
    // Wait for iframe to be visible
    const outputFrame = page.frameLocator('iframe').last();
    
    // Verify the minimal editor renders successfully in the output iframe
    await expect(outputFrame.locator('.cm-content')).toBeVisible();
    
    // Verify the output editor displays the text "..."
    await expect(outputFrame.locator('.cm-content')).toContainText('...');
  });
  
  test('should load example directly via URL parameter', async ({ page }) => {
    // Navigate directly to URL with example parameter
    await page.goto('https://codemirror.net/try/#example=Minimal%20editor');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Verify the dropdown shows "Minimal editor" as selected
    await expect(page.locator('#examples')).toHaveValue('Minimal editor');
    
    // Verify the code editor contains the minimal editor configuration code
    await expect(page.locator('.cm-content')).toContainText('import {minimalSetup, EditorView} from "codemirror"');
    await expect(page.locator('.cm-content')).toContainText('minimalSetup');
  });
});
