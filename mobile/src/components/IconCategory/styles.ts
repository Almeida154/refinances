import styled from 'styled-components/native';

interface IProps {
  color?: string;
}

export const SectionIcon = styled.View<IProps>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border-width: 4px;
  border-color: ${props => props.color ?? '#333'};
  align-items: center;
  justify-content: center;
`;
