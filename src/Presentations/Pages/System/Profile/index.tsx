import { IProfileService } from '@/Application/Interfaces/System/IProfileService'
import { ChangePasswordModel } from '@/Application/Models/System/ChangePasswordModel'
import { ProfileModel } from '@/Application/Models/System/ProfileModel'
import { IValidation } from '@/Infra/Validation/Interfaces/IValidation'
import { Box } from '@/Presentations/Components/Box'
import { Container } from '@/Presentations/Components/Container'
import { Button } from '@/Presentations/Components/Form/Button'
import { Input } from '@/Presentations/Components/Form/Input'
import { Group } from '@/Presentations/Components/Group'
import { useAuth } from '@/Presentations/Hooks/Auth'
import { useToast } from '@/Presentations/Hooks/Toast'
import { File2Base64 } from '@/Presentations/Utils/File2Base64'
import { ChangeEvent, useEffect, useState } from 'react'

import Styles from './styles.module.scss'

type Props = {
  _validations: { data: IValidation; password: IValidation }
  _profile: IProfileService
}

export const Profile = ({ _validations, _profile }: Props) => {
  const { user, updateUser, signOut } = useAuth()
  const [state, setState] = useState({
    profile: {
      name: user.name,
      email: user.email,
      avatar: '',
    } as ProfileModel,
    password: {
      current: '',
      newPassword: '',
      confirmation: '',
    } as ChangePasswordModel,
    isFormDataInvalid: true,
    isFormPasswordInvalid: true,
    nameError: '',
    emailError: '',
    currentError: '',
    newPasswordError: '',
    confirmationError: '',
  })

  const { addToast } = useToast()

  const validateData = (field: string): void => {
    const { name, email } = state.profile
    const formData = { name, email }
    setState(old => ({
      ...old,
      [`${field}Error`]: _validations.data.validate(field, formData),
    }))
    setState(old => ({
      ...old,
      isFormDataInvalid: !!old.nameError || !!old.emailError,
    }))
  }

  const validatePassword = (field: string): void => {
    const { current, newPassword, confirmation } = state.password
    const formData = { current, newPassword, confirmation }
    setState(old => ({
      ...old,
      [`${field}Error`]: _validations.password.validate(field, formData),
    }))
    setState(old => ({
      ...old,
      isFormPasswordInvalid:
        !!old.currentError || !!old.newPasswordError || !!old.confirmationError,
    }))
  }

  useEffect(() => {
    validateData('name')
    validateData('email')
  }, [state.profile])

  useEffect(() => {
    validatePassword('current')
    validatePassword('newPassword')
    validatePassword('confirmation')
  }, [state.password])

  const handleChangeProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    let { id, value } = e.currentTarget

    if (id === 'avatar') {
      const file = document.querySelector('#avatar')['files'][0]
      const file64 = await File2Base64(file)
      const [type, value64] = file64.split(',')

      if (!type.includes('image')) return

      value = value64
    }

    setState(old => ({
      ...old,
      profile: { ...old.profile, [id]: value } as ProfileModel,
    }))
  }

  const handleChangePassword = async (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget

    setState(old => ({
      ...old,
      password: { ...old.password, [id]: value } as ChangePasswordModel,
    }))
  }

  const errorBase = err => {
    addToast({
      title: 'Error',
      description: err && 'Something wrong happened!',
      type: 'error',
    })
  }

  const handleSaveProfile = () => {
    _profile
      .saveProfile(state.profile)
      .then(result => {
        const updatedUser = user
        updatedUser.name = result.name
        updatedUser.email = result.email
        updatedUser.avatar = result.avatar

        updateUser(updatedUser)

        addToast({
          title: 'Success',
          description: 'Profife save with success',
          type: 'success',
        })
      })
      .catch(errorBase)
  }

  const handleSavePassword = () => {
    _profile
      .changePassword(state.password)
      .then(result => {
        addToast({
          title: 'Success',
          description: result,
          type: 'success',
        })
        signOut()
      })
      .catch(errorBase)
  }

  return (
    <Container title="Profile">
      <Box direction="column">
        <p>Your Personal Informations</p>

        <div>
          <Group>
            {!!user.avatar && (
              <div className={Styles.avatar}>
                <img src={`${process.env.API_URL}${user.avatar}`} alt="" />
              </div>
            )}
            <Group display="column">
              <Group display="row">
                <Input
                  label="Name"
                  name="name"
                  defaultValue={state.profile.name}
                  onChange={handleChangeProfile}
                  error={state.nameError}
                />
                <Input
                  label="Email"
                  name="email"
                  defaultValue={state.profile.email}
                  onChange={handleChangeProfile}
                  error={state.emailError}
                />
              </Group>
              <Group>
                <Input
                  type="file"
                  label="Avatar"
                  name="avatar"
                  onChange={handleChangeProfile}
                />
              </Group>
            </Group>
          </Group>
          <Group align="right">
            <Button
              onClick={handleSaveProfile}
              disabled={state.isFormDataInvalid}
            >
              Save my informations
            </Button>
          </Group>
        </div>
      </Box>

      <Box direction="column">
        <p>Change Your Password</p>

        <div>
          <Group>
            <Input
              autoComplete="new-password"
              type="password"
              label="Current Password"
              name="current"
              defaultValue={state.password.current}
              onChange={handleChangePassword}
              error={state.currentError}
            />
            <Input
              autoComplete="new-password"
              type="password"
              label="New Password"
              name="newPassword"
              defaultValue={state.password.newPassword}
              onChange={handleChangePassword}
              error={state.newPasswordError}
            />
            <Input
              autoComplete="new-password"
              type="password"
              label="Confirm New Password"
              name="confirmation"
              defaultValue={state.password.confirmation}
              onChange={handleChangePassword}
              error={state.confirmationError}
            />
          </Group>

          <Group align="right">
            <Button
              onClick={handleSavePassword}
              disabled={state.isFormPasswordInvalid}
            >
              Change my password
            </Button>
          </Group>
        </div>
      </Box>
    </Container>
  )
}
