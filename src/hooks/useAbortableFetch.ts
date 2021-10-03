import {
  useCallback,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from 'react'

export enum REQUEST_STATUSES {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

type RequestError = string | null

type RequestIdle = {
  status: REQUEST_STATUSES.IDLE
  data: null
  error: null
}

type RequestLoading<T> = {
  status: REQUEST_STATUSES.LOADING
  data: T | null
  error: string | null
}

type RequestSuccess<T> = {
  status: REQUEST_STATUSES.SUCCESS
  data: T
  error: null
}

type RequestFailure = {
  status: REQUEST_STATUSES.ERROR
  data: null
  error: string
}

type RequestResponse<T> =
  | RequestError
  | RequestFailure
  | RequestIdle
  | RequestLoading<T>
  | RequestSuccess<T>

export function useRequest<T>(
  url: string,
  config: Omit<RequestInit, 'signal'> = {}
) {
  const [status, setStatus] = useState(REQUEST_STATUSES.IDLE)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<RequestError>(null)

  const makeRequest = useCallback(
    async function (signal: AbortSignal) {
      console.log({url});
      if (!url) {
        setStatus(REQUEST_STATUSES.IDLE)
        setData(null)
        return
      }
      setStatus(REQUEST_STATUSES.LOADING)
      try {
        const response = await fetch(url, { ...config, signal })
        if (!response.ok) {
          throw new Error(await response.text())
        }
        const jsonData = await response.json()
        setStatus(REQUEST_STATUSES.SUCCESS)
        setData(jsonData)
        setError(null)
      } catch (error) {
        if (!signal.aborted) {
          setStatus(REQUEST_STATUSES.ERROR)
          setData(null)
          if (error instanceof Error) setError(error.message)
        }
      }
    },
    [url]
  )
  return { status, data, error, makeRequest }
}

export function useAbortableFetch<T>(
  url: string,
  config: Omit<RequestInit, 'signal'> = {}
) {
  const { data, error, status, makeRequest } = useRequest<T>(url, config)
  const abortRef: MutableRefObject<AbortController | null> = useRef(null)

  useEffect(() => {
    if (abortRef.current) {
      abortRef.current.abort()
    }
    const controller = new AbortController()
    abortRef.current = controller

    makeRequest(controller.signal)
    return () => {
      controller.abort()
    }
  }, [url, makeRequest])

  return { status, data, error }
}
