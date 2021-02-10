import React from "react";
import styled from "styled-components";

function EssayBox(props) {
    return (
        <Container>
            <QuestionText>{props.question}</QuestionText>
            <AnswerText>{props.answer}</AnswerText>
        </Container>
    );
};

const Container = styled.div`
    padding-top: 20px;
    flex-direction: container;
`;

const QuestionText = styled.div`
    padding-bottom: 5px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
`;

const AnswerText = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
`;


export default EssayBox;