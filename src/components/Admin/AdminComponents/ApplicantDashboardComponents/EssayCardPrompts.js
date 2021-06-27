import React from "react";
import styled from "styled-components";

export default function EssayCard(props) {
  return (
    <PromptBorder>
      <TitleText>{props.question}</TitleText>
      <AnswerText>{props.answer}</AnswerText>
    </PromptBorder>
  );
}

const PromptBorder = styled.div`
  word-break: break-word;
  overflow: wrap;
  white-space: normal;
`;

const TitleText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  color: #61486a;
  margin-bottom: 0.2vw;
`;

const AnswerText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-size: 14px;
  color: #61486a;
  margin-bottom: 2vw;
  display: inline-block;
  flex-direction: column;
`;
