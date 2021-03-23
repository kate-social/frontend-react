import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { register as signup } from '../../redux/auth-reducer' // Due to conflict with useForm I have to import as
import { useCookies } from 'react-cookie'
import { Link, useHistory } from 'react-router-dom'
import classes from './JoinPage.module.css'
import { useRef } from 'react'

export const JoinPage = () => {
  const { register, handleSubmit, setError, errors, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const password = useRef({})
  password.current = watch('password', '')

  const dispatch = useDispatch()
  const [, setCookie] = useCookies(['token'])
  const history = useHistory()

  const onSubmit = data => {
    dispatch(signup(data.login, data.password)).then(res => {
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
          <h1 className={classes.form__header}>Join</h1>
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
          <div
            className={
              classes.form__textfield +
              (errors.repeat_password
                ? ' ' + classes['form__textfield--error']
                : '')
            }
          >
            <input
              name='repeat_password'
              className={classes.form__input}
              type='password'
              placeholder='Repeat Password'
              ref={register({
                required: true,
                validate: value =>
                  value === password.current || 'The passwords do not match',
              })}
            />
          </div>
          <div className={classes['form__login-text']}>
            Already a member? <Link to='/login'>Login!</Link>
          </div>
          <button className={classes.form__submit} type='submit'>
            Join
          </button>
        </form>
      </div>
    </div>
  )
}
