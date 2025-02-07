import { useState, useEffect } from 'react'
import { api } from 'course-platform/utils/api'
import type { CourseWithLessons } from 'course-platform/utils/types'

export function useCourses() {
  const p = api.courses.getAll
  const { results: courses, ...rest } = usePromise<CourseWithLessons[]>(p)
  return { courses, ...rest }
}

/////////

export function usePromise<T>(promise: any, defaultRun: boolean = true) {
  const [run, setRun] = useState<{} | boolean>(defaultRun)
  const [results, setResults] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!run) return
    let isCurrent = true
    setIsLoading(true)
    promise()
      .then((results: T) => {
        if (!isCurrent) return
        setIsLoading(false)
        setResults(results)
      })
      .catch((error: any) => {
        setIsLoading(false)
        setError(error)
      })
    return () => {
      isCurrent = false
    }
  }, [promise, run])

  function refetch() {
    setRun({})
  }

  return { results, isLoading, error, refetch }
}
