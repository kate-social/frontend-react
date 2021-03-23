import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth-reducer'
import { useCookies } from 'react-cookie'
import { Link, useHistory } from 'react-router-dom'
import classes from './LoginPage.module.css'

export const LoginPage = () => {
  const { register, handleSubmit, setError, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const dispatch = useDispatch()
  const [, setCookie] = useCookies(['token'])
  const history = useHistory()

  const onSubmit = data => {
    dispatch(login(data.login, data.password)).then(res => {
      if (res) {
        setCookie('token', res)
        history.push('/')
        return
      }
      setError('login', 'wrong login')
      setError('password', 'wrong password')
    })
  }

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={classes.form__header}>Log In</h1>
          <div
            className={
              classes.form__textfield +
              (errors.login ? ' ' + classes['form__textfield--error'] : '')
            }
          >
            <input
              name='login'
              className={classes.form__input}
              type='text'
              placeholder='Username'
              ref={register({ required: true })}
            />
          </div>
          <div
            className={
              classes.form__textfield +
              (errors.password ? ' ' + classes['form__textfield--error'] : '')
            }
          >
            <input
              name='password'
              className={classes.form__input}
              type='password'
              placeholder='Password'
              ref={register({ required: true })}
            />
          </div>
          <div className={classes['form__join-text']}>
            Not a user yet? <Link to='/join'>Join now!</Link>
          </div>
          <button className={classes.form__submit} type='submit'>
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}
