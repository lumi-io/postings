import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

// Currently not working (To be worked as a component if functions can be used in external components)

export default function FileUploadButton(props) {

    return (
        <ButtonLayout>
            <Button
                variant="contained"
                component="label"
                style={{
                    "background-color": "#873CA2",
                    "color": "#F9F6F9"
                }}
            >
            Upload File
                <input
                    type="file"
                    hidden
                    onChange={props.function}
                />
            </Button>
            <UploadedText>
                {props.textField}
            </UploadedText>
        </ButtonLayout>
    );
}


const ButtonLayout = styled.div`
    padding-bottom: 10px;
`;

const UploadedText = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #A8A6A8;
    padding-top:10px;
`;