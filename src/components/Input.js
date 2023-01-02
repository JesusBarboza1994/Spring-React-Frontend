import styled from "@emotion/styled";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
// import { Text } from "./Typography";

const StyledInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${colors.gray[200]};
  border-radius: 6px;
  width: 100%;
`;

const StyledLabel = styled.label`

  ${typography.text.xs};
  text-transform: uppercase;
`;

// Using styled components composition:
// const StyledLabel = styled(Text.withComponent("label"))`
//   text-transform: uppercase;
// `;

function Input({ label, onSetValue , id, ...rest }) {
  return (
    <div>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInput id={id} {...rest} onChange={onSetValue} />
    </div>
  );
}

export default Input;