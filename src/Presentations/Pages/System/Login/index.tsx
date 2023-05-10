import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Styles from './styles.module.scss'
import { IAuthService } from '@/Application/Interfaces/System/IAuthService'
import { Box } from '@/Presentations/Components/Box'
import { Button } from '@/Presentations/Components/Form/Button'
import { Input } from '@/Presentations/Components/Form/Input'
import { Group } from '@/Presentations/Components/Group'
import { Logo } from '@/Presentations/Components/Logo'
import { useAuth } from '@/Presentations/Hooks/Auth'
import { useToast } from '@/Presentations/Hooks/Toast'
import { IValidation } from '@/Infra/Validation/Interfaces/IValidation'

type Props = {
  _validation: IValidation
  _auth: IAuthService
}

export const Login = ({ _validation, _auth }: Props) => {
  const [state, setState] = useState({
    form: {
      username: '',
      password: '',
    },
    usernameError: '',
    passwordError: '',
    isFormInvalid: true,
  })
  const { signIn, signOut } = useAuth()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const validate = (field: string): void => {
    const { username, password } = state.form
    const formData = { username, password }
    setState(old => ({
      ...old,
      [`${field}Error`]: _validation.validate(field, formData),
    }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.usernameError || !!old.passwordError,
    }))
  }

  const handleChange = (key, value: string) => {
    setState(old => ({ ...old, form: { ...old.form, [key]: value } }))
  }

  useEffect(() => {
    validate('username')
    validate('password')
  }, [state.form])

  const handleLogin = () => {
    _auth
      .Login(state.form)
      .then(token => {
        signIn(token)
        navigate('/')
      })
      .catch(err => {
        addToast({
          title: 'Error',
          description: err.message ?? 'Something wrong happened!',
          type: 'error',
        })
      })
  }

  useEffect(() => signOut(), [])

  return (
    <>
      <div className={Styles.background}>
        <Box direction="column">
          <Logo />
          <Input
            label="Username"
            name="username"
            defaultValue={state.form.username}
            onChange={e => handleChange('username', e.currentTarget.value)}
            error={state.usernameError}
          />
          <Input
            autoComplete="new-password"
            type="password"
            label="Password"
            name="password"
            defaultValue={state.form.password}
            onChange={e => handleChange('password', e.currentTarget.value)}
            error={state.passwordError}
          />
          <Group>
            <Button disabled={state.isFormInvalid} onClick={handleLogin}>
              Entrar Já
            </Button>
          </Group>
        </Box>
      </div>
    </>
  )
}

