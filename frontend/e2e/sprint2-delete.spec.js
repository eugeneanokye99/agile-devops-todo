import { test, expect } from '@playwright/test';

test.describe('US-004: Delete Task', () => {
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
  });

  test('can delete a task', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Delete Me');
    await page.click('button:has-text("Add Task")');
    
    await expect(page.getByText('Delete Me')).toBeVisible();
    
    await page.click('button:has-text("Delete")');
    
    await expect(page.getByText('Delete Me')).not.toBeVisible();
  });

  test('can delete completed task', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Complete and Delete');
    await page.click('button:has-text("Add Task")');
    
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    
    await page.click('button:has-text("Delete")');
    
    await expect(page.getByText('Complete and Delete')).not.toBeVisible();
  });

  test('shows empty state after deleting last task', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Only Task');
    await page.click('button:has-text("Add Task")');
    
    await page.click('button:has-text("Delete")');
    
    await expect(page.getByText('No tasks yet')).toBeVisible();
  });

  test('can delete multiple tasks', async ({ page }) => {
    await page.fill('input[placeholder="Enter a new task..."]', 'Task A');
    await page.click('button:has-text("Add Task")');
    
    await page.fill('input[placeholder="Enter a new task..."]', 'Task B');
    await page.click('button:has-text("Add Task")');
    
    await page.fill('input[placeholder="Enter a new task..."]', 'Task C');
    await page.click('button:has-text("Add Task")');
    
    // Delete first task (Task A)
    const deleteButtons1 = page.locator('button:has-text("Delete")');
    await deleteButtons1.first().click();
    await expect(page.locator('.task-title').filter({ hasText: 'Task A' })).not.toBeVisible();
    
    // Delete next first task (Task B)
    const deleteButtons2 = page.locator('button:has-text("Delete")');
    await deleteButtons2.first().click();
    await expect(page.locator('.task-title').filter({ hasText: 'Task B' })).not.toBeVisible();
    
    await expect(page.locator('.task-title').filter({ hasText: 'Task C' })).toBeVisible();
  });
});
