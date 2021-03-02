import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { selectProfile } from '../../../../modules/auth/auth.selectors';
import { useAsyncDispatch } from '../../../utils/reduxSagaPromise';
import { useApiForm } from '../../../hooks/useApiForm';
import { updateProfile } from '../../../../modules/auth/auth.actions';
import { Input } from '../../input';
import { snackbarActions } from '../../../../modules/snackbar';
import { Container, ErrorMessage, Form, SubmitButton, FormFieldsRow } from './editProfileForm.styles';

interface UpdateProfileFormFields {
  firstName: string;
  lastName: string;
}

const FIRST_NAME_MAX_LENGTH = 40;
const LAST_NAME_MAX_LENGTH = 40;

export const EditProfileForm = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const dispatchWithPromise = useAsyncDispatch();
  const profile = useSelector(selectProfile);

  const { register, handleSubmit, errors, genericError, setApiResponse } = useApiForm<UpdateProfileFormFields>({
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
    },
  });

  const onProfileUpdate = async (profile: UpdateProfileFormFields) => {
    try {
      const res = await dispatchWithPromise(updateProfile(profile));
      setApiResponse(res);

      if (!res.isError) {
        dispatch(
          snackbarActions.showMessage(
            intl.formatMessage({
              defaultMessage: 'Personal data successfully changed.',
              description: 'Auth / Update profile/ Success message',
            })
          )
        );
      }
    } catch {}
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onProfileUpdate)}>
        <FormFieldsRow>
          <Input
            ref={register({
              maxLength: {
                value: FIRST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'First name is too long',
                  description: 'Auth / Update profile/ First name max length error',
                }),
              },
            })}
            name={'firstName'}
            label={intl.formatMessage({
              defaultMessage: 'First name',
              description: 'Auth / Update profile / First name label',
            })}
            error={errors.firstName?.message}
          />
        </FormFieldsRow>

        <FormFieldsRow>
          <Input
            ref={register({
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'Last name is too long',
                  description: 'Auth / Update profile/ Last name max length error',
                }),
              },
            })}
            name={'lastName'}
            label={intl.formatMessage({
              defaultMessage: 'Last name',
              description: 'Auth / Update profile / Last name label',
            })}
            error={errors.lastName?.message}
          />
        </FormFieldsRow>

        {genericError && <ErrorMessage>{genericError}</ErrorMessage>}
        <SubmitButton>
          <FormattedMessage defaultMessage="Update personal data" description="Auth / Update profile/ Submit button" />
        </SubmitButton>
      </Form>
    </Container>
  );
};