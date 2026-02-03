import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getTasks, createTask } from './api'

describe('API Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('getTasks', () => {
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

  describe('createTask', () => {
    it('creates task successfully', async () => {
      const mockTask = { id: 1, title: 'New Task', completed: false }

      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTask)
        })
      )

      const task = await createTask('New Task')

      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'New Task' }),
      })
      expect(task).toEqual(mockTask)
    })

    it('throws error when create fails', async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false
        })
      )

      await expect(createTask('New Task')).rejects.toThrow('Failed to create task')
    })
  })
})
