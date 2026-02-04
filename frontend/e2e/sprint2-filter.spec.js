import { test, expect } from '@playwright/test';

test.describe('US-006: Filter Tasks by Status', () => {
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
    
    // Add test tasks - wait for each one to be added before adding the next
    await page.fill('input[placeholder="Enter a new task..."]', 'Active Task 1');
    await page.click('button:has-text("Add Task")');
    await expect(page.getByText('Active Task 1')).toBeVisible();
    
    await page.fill('input[placeholder="Enter a new task..."]', 'Active Task 2');
    await page.click('button:has-text("Add Task")');
    await expect(page.getByText('Active Task 2')).toBeVisible();
    
    await page.fill('input[placeholder="Enter a new task..."]', 'Completed Task');
    await page.click('button:has-text("Add Task")');
    await expect(page.getByText('Completed Task')).toBeVisible();
    
    // Mark "Completed Task" as complete (the third task)
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(2).click(); // Third checkbox (0-indexed)
    
    // Wait for update to complete
    await page.waitForTimeout(500);
  });

  test('shows correct task counts', async ({ page }) => {
    await expect(page.getByText('All (3)')).toBeVisible();
    await expect(page.getByText('Active (2)')).toBeVisible();
    await expect(page.getByText('Completed (1)')).toBeVisible();
  });

  test('filters to show only completed tasks', async ({ page }) => {
    await page.click('button:has-text("Completed")');
    
    await expect(page.getByText('Active Task 1')).not.toBeVisible();
    await expect(page.getByText('Active Task 2')).not.toBeVisible();
    await expect(page.getByText('Completed Task')).toBeVisible();
  });

  test('filter preference persists after page reload', async ({ page }) => {
    await page.click('button:has-text("Active")');
    
    await page.reload();
    
    const activeButton = page.locator('button:has-text("Active")');
    await expect(activeButton).toHaveClass(/active/);
    await expect(page.getByText('Active Task 1')).toBeVisible();
    await expect(page.getByText('Completed Task')).not.toBeVisible();
  });

  test('shows empty message when filter has no results', async ({ page }) => {
    // Delete all tasks
    const deleteButtons = page.locator('button:has-text("Delete")');
    const count = await deleteButtons.count();
    for (let i = 0; i < count; i++) {
      await deleteButtons.first().click();
    }
    
    await page.click('button:has-text("Active")');
    
    await expect(page.getByText('No tasks yet')).toBeVisible();
  });
});
