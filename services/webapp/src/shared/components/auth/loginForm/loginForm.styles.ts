import styled from 'styled-components';
import { MicroLabel } from '../../../../theme/typography';
import { color } from '../../../../theme';
import { Button } from '../../button';
import { formFieldWidth, sizeUnits } from '../../../../theme/size';

export const Container = styled.form`
  ${formFieldWidth};
`;

export const ErrorMessage = styled(MicroLabel)`
  position: absolute;
  color: ${color.error};
`;

export const SubmitButton = styled(Button).attrs(() => ({ type: 'submit', fixedWidth: true }))`
  margin-top: ${sizeUnits(5)};
`;