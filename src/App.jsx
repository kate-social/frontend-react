import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import { useCookies } from 'react-cookie'
import { Route, Switch } from 'react-router-dom'
import { LoginPage } from './components/LoginPage/LoginPage'
import { JoinPage } from './components/JoinPage/JoinPage'
import { NonAuthenticatedRoute } from './components/NonAuthenticatedRoute'

export const App = () => {
  const [cookies] = useCookies(['token'])

  const isInitialized = useSelector(state => state.app.isInitialized)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp(cookies.token))
  }, [dispatch, cookies.token])

  if (!isInitialized) {
    return <div className='App'>
      Loading... Please wait.
    </div>
  }

  return (
    <div className='App'>
      <Switch>
        <NonAuthenticatedRoute path={'/login'}><LoginPage /></NonAuthenticatedRoute>
        <NonAuthenticatedRoute path={'/join'}><JoinPage /></NonAuthenticatedRoute>
      </Switch>
    </div>
  )
}

