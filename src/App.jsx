import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import { useCookies } from 'react-cookie'

export const App = () => {
  const [cookies] = useCookies(['token'])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp(cookies.token))
  }, [dispatch, cookies.token])

  return (
    <div className='App'>
      Hello there!
    </div>
  )
}

