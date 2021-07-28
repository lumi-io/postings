import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9f6f9;
  flex-direction: container;
  margin: 50px auto;
  max-width: 700px;
  padding: 50px 50px 120px;
  justify-content: "space-between";
`;

export const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
`;

export const Subtitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  color: #873ca2; /* Accent Purple */
  margin-top: 20px;
`;

export const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-size: 14px;
  line-height: 28px;
  color: #61486a;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Date = styled.div`
  font-family: Roboto;
  font-style: italic;
  font-size: 14px;
  line-height: 28px;
  color: #61486a;
  margin-top: 50px;
`;

export const PromptBorder = styled.div`
  word-break: break-word;
  overflow: wrap;
  white-space: normal;
`;
