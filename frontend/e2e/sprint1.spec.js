import { test, expect } from '@playwright/test';

test.describe('Sprint 1 Features', () => {
  test.beforeEach(async ({ page, request }) => {
    // Clear all tasks before each test to ensure test isolation
    await request.delete('http://localhost:8000/api/tasks/test/clear');
    await page.goto('/');
  });

  test('displays empty state when no tasks', async ({ page }) => {
    await expect(page.getByText('No tasks yet')).toBeVisible();
  });

  test('can add a new task', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Test Task');
    await page.click('button:has-text("Add Task")');
    
    // Verify the task appears (use first() since there should only be one)
    await expect(page.locator('.task-title').filter({ hasText: 'Test Task' })).toBeVisible();
  });

  test('validates empty task submission', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    
    await expect(page.getByText('Task title cannot be empty')).toBeVisible();
  });

  test('can mark task as complete', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Complete Me');
    await page.click('button:has-text("Add Task")');
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.click();
    
    await expect(page.locator('.completed').filter({ hasText: 'Complete Me' })).toBeVisible();
    await expect(checkbox).toBeChecked();
  });

  test('can toggle task completion status', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Toggle Task');
    await page.click('button:has-text("Add Task")');
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    
    await checkbox.click();
    await expect(page.locator('.completed').filter({ hasText: 'Toggle Task' })).toBeVisible();
    await expect(checkbox).toBeChecked();
    
    await checkbox.click();
    const taskTitle = page.locator('.task-title').filter({ hasText: 'Toggle Task' });
    await expect(taskTitle).not.toHaveClass(/completed/);
    await expect(checkbox).not.toBeChecked();
  });

  test('task persists after page reload', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Persistent Task');
    await page.click('button:has-text("Add Task")');
    
    await page.reload();
    
    await expect(page.locator('.task-title').filter({ hasText: 'Persistent Task' })).toBeVisible();
  });

  test('completion status persists after page reload', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Persist Complete');
    await page.click('button:has-text("Add Task")');
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    
    await page.reload();
    
    const reloadedCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(reloadedCheckbox).toBeChecked();
    await expect(page.locator('.completed').filter({ hasText: 'Persist Complete' })).toBeVisible();
  });
});
