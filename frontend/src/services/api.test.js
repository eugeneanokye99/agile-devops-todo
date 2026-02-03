import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getTasks } from './api'

describe('API Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('fetches tasks successfully', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ]

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTasks)
      })
    )

    const tasks = await getTasks()

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/tasks/')
    expect(tasks).toEqual(mockTasks)
  })

  it('throws error when fetch fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false
      })
    )

    await expect(getTasks()).rejects.toThrow('Failed to fetch tasks')
  })
})
