import { test, expect } from '@playwright/test';

test.describe('US-005: Edit Task Title', () => {
  test.beforeEach(async ({ page, request }) => {
    // Clear all tasks before each test to ensure test isolation
    const tasksResponse = await request.get('http://localhost:8000/api/tasks/');
    if (tasksResponse.ok()) {
      const tasks = await tasksResponse.json();
      for (const task of tasks) {
        await request.delete(`http://localhost:8000/api/tasks/${task.id}`);
      }
    }
    
    await page.goto('/');
    
    // Add test task and wait for it to be visible
    await page.fill('input[placeholder="Enter a new task..."]', 'Original Task');
    await page.click('button:has-text("Add Task")');
    await expect(page.getByText('Original Task')).toBeVisible();
  });

  test('enters edit mode on double click', async ({ page }) => {
    await page.dblclick('text=Original Task');
    
    await expect(page.locator('.edit-input')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test('can edit task title and save', async ({ page }) => {
    await page.dblclick('text=Original Task');
    
    const input = page.locator('.edit-input');
    await input.clear();
    await input.fill('Updated Task');
    
    await page.click('button:has-text("Save")');
    
    await expect(page.getByText('Updated Task')).toBeVisible();
    await expect(page.getByText('Original Task')).not.toBeVisible();
  });

  test('can cancel editing', async ({ page }) => {
    await page.dblclick('text=Original Task');
    
    const input = page.locator('.edit-input');
    await input.clear();
    await input.fill('Changed Task');
    
    await page.click('button:has-text("Cancel")');
    
    await expect(page.getByText('Original Task')).toBeVisible();
    await expect(page.getByText('Changed Task')).not.toBeVisible();
  });

  test('saves on Enter key press', async ({ page }) => {
    await page.dblclick('text=Original Task');
    
    const input = page.locator('.edit-input');
    await input.clear();
    await input.fill('Enter Key Task');
    await input.press('Enter');
    
    await expect(page.getByText('Enter Key Task')).toBeVisible();
  });

  test('cancels on Escape key press', async ({ page }) => {
    await page.dblclick('text=Original Task');
    
    const input = page.locator('.edit-input');
    await input.clear();
    await input.fill('Escape Key Task');
    await input.press('Escape');
    
    await expect(page.getByText('Original Task')).toBeVisible();
    await expect(page.getByText('Escape Key Task')).not.toBeVisible();
  });

  test('shows error for empty title', async ({ page }) => {
    await page.dblclick('text=Original Task');
    
    const input = page.locator('.edit-input');
    await input.clear();
    
    await page.click('button:has-text("Save")');
    
    await expect(page.getByText('Title cannot be empty')).toBeVisible();
  });

  test('preserves completion status when editing', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    
    await page.dblclick('.completed');
    
    const input = page.locator('.edit-input');
    await input.clear();
    await input.fill('Edited Completed Task');
    await page.click('button:has-text("Save")');
    
    await expect(page.locator('.completed')).toContainText('Edited Completed Task');
    await expect(checkbox).toBeChecked();
  });

  test('edited title persists after page reload', async ({ page }) => {
    await page.dblclick('text=Original Task');
    
    const input = page.locator('.edit-input');
    await input.clear();
    await input.fill('Persistent Edit');
    await page.click('button:has-text("Save")');
    
    await page.reload();
    
    await expect(page.getByText('Persistent Edit')).toBeVisible();
  });

  test('only one task can be edited at a time', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Second Task');
    await page.click('button:has-text("Add Task")');
    await expect(page.getByText('Second Task')).toBeVisible();
    
    await page.dblclick('text=Original Task');
    
    await expect(page.locator('.edit-input')).toHaveCount(1);
  });
});
