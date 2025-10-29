# CodeMirror Try Page - Test Plan

## Application Overview

The CodeMirror Try Page (https://codemirror.net/try/) is an interactive playground that allows developers to write JavaScript code to define and configure a CodeMirror editor, then immediately see the resulting editor in action. The application features:

- **Code Editor**: A full-featured code editor with syntax highlighting for writing JavaScript code that configures a CodeMirror instance
- **Run Functionality**: Execute the written code with a "Run" button or Ctrl-Enter keyboard shortcut
- **Output Display**: View the resulting editor in an iframe within the "Output" tab
- **Console Logging**: Monitor console messages and errors in the "Log" tab
- **Example Templates**: Pre-built examples accessible via dropdown menu (Minimal editor, Moving the selection, Custom completions, etc.)
- **Share Feature**: Generate and copy shareable URLs to clipboard for collaboration
- **URL Routing**: Support for loading examples directly via URL parameters

The application is designed for developers to experiment with CodeMirror configurations, share code snippets, and create bug reports or demonstrations.

## Test Scenarios

### 1. Running Default Code

**Seed:** `tests/seed.spec.ts`

#### 1.1 Execute Default Editor Code

**File:** `tests/running-default-code/execute-default-editor-code.spec.ts`

**Steps:**
1. Navigate to https://codemirror.net/try/
2. Verify the default code is visible in the editor (imports from "codemirror" and creates an EditorView)
3. Click the "Run" button
4. Click the "Output" tab/button to view results

**Expected Results:**
- The "Run" button becomes active briefly during execution
- An iframe appears containing the rendered output
- The output shows a functioning CodeMirror editor instance
- The editor in the output contains the text "console.log('hello')" 
- No errors appear in the console
- The code editor remains editable after running

#### 1.2 Execute Code with Keyboard Shortcut

**File:** `tests/running-default-code/execute-code-keyboard-shortcut.spec.ts`

**Steps:**
1. Navigate to https://codemirror.net/try/
2. Click anywhere in the code editor to focus it
3. Press Ctrl-Enter (or Cmd-Enter on Mac)
4. Switch to the "Output" tab

**Expected Results:**
- Code executes without needing to click "Run" button
- Output iframe displays with the resulting editor
- The keyboard shortcut works consistently regardless of cursor position in the editor

#### 1.3 View Console Output in Log Tab

**File:** `tests/running-default-code/view-console-output-log.spec.ts`

**Steps:**
1. Navigate to https://codemirror.net/try/
2. Click the "Run" button
3. Click the "Show log (Ctrl-Shift-3)" button to switch to Log tab
4. Observe the log content

**Expected Results:**
- The Log tab becomes active
- Console output shows "hello" message from the console.log statement in the default code
- Log entries display with appropriate formatting (message type, content)
- The log persists between tab switches

### 2. Loading and Using Examples

**Seed:** `tests/seed.spec.ts`

#### 2.1 Load Minimal Editor Example

**File:** `tests/loading-examples/load-minimal-editor-example.spec.ts`

**Steps:**
1. Navigate to https://codemirror.net/try/
2. Click on the "Select example..." dropdown
3. Select "Minimal editor" from the list
4. Observe the code editor content

**Expected Results:**
- The dropdown shows "Minimal editor" as selected
- The code editor updates to show the minimal editor example code
- Code includes import of "minimalSetup" instead of "basicSetup"
- The doc property is set to "..."
- The URL updates to include "#example=Minimal%20editor" parameter
- Previous code is completely replaced with the example code

#### 2.2 Run Selected Example

**File:** `tests/loading-examples/run-selected-example.spec.ts`

**Steps:**
1. Navigate to https://codemirror.net/try/
2. Select "Minimal editor" from the example dropdown
3. Click the "Run" button
4. Switch to the "Output" tab

**Expected Results:**
- The minimal editor renders successfully in the output iframe
- The output editor displays the text "..."
- The minimal editor has fewer features than the basic setup (simplified toolbar/functionality)
- No errors appear in the console

#### 2.3 Load Example via URL Parameter

**File:** `tests/loading-examples/load-example-via-url.spec.ts`

**Steps:**
1. Navigate directly to https://codemirror.net/try/#example=Minimal%20editor
2. Wait for page to load
3. Observe the code editor and dropdown state

**Expected Results:**
- The page loads with the "Minimal editor" example pre-loaded
- The dropdown shows "Minimal editor" as selected
- The code editor contains the minimal editor configuration code
- The application state matches what would be achieved by manually selecting the example

### 3. Editing and Modifying Code

**Seed:** `tests/seed.spec.ts`

#### 3.1 Modify Code and Execute

**File:** `tests/editing-code/modify-code-and-execute.spec.ts`

**Steps:**
1. Navigate to https://codemirror.net/try/
2. Click in the code editor
3. Navigate to the line containing `doc: "console.log('hello')\n",`
4. Change the text "hello" to "world"
5. Click the "Run" button
6. Switch to the "Log" tab

**Expected Results:**
- The code editor accepts the text changes
- Syntax highlighting updates appropriately as code is modified
- After running, the Log tab shows "world" instead of "hello"
- The modified code executes correctly
- The output reflects the changes made to the code

#### 3.2 Add New Line of Code

**File:** `tests/editing-code/add-new-line-of-code.spec.ts`

**Steps:**
1. Navigate to https://codemirror.net/try/
2. Click at the end of the last line in the editor
3. Press Enter to create a new line
4. Type: `console.log("Additional line")`
5. Run the code
6. Check the Log tab

**Expected Results:**
- New line is added successfully
- Syntax highlighting applies to the new code
- Line numbers update to include the new line
- When executed, the Log tab shows both "hello" and "Additional line" messages
- Code remains properly formatted

#### 3.3 Replace All Code with Custom Implementation

**File:** `tests/editing-code/replace-all-code-custom.spec.ts`

**Steps:**
1. Navigate to https://codemirror.net/try/
2. Select all code in the editor (Ctrl-A or Cmd-A)
3. Delete selected code
4. Type new code:
   ```
   import {EditorView} from "codemirror"
   
   new EditorView({
     doc: "Test Editor",
     parent: document.body
   })
   ```
5. Run the code
6. View the Output tab

**Expected Results:**
- All default code is replaced with the custom code
- The editor accepts the new imports and configuration
- After running, the output shows a very basic editor (without basicSetup features)
- The output editor contains the text "Test Editor"
- No errors occur despite the minimal configuration
- The application handles the simpler setup gracefully
