import React, { useState } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function SelectApplicationCard({ ApplicantName, applicantId, checked, handleChange }) {
     
    return (
            <Checkbox
                // padding="none"
                // margins="none"
                icon={<StarBorderIcon sx={{ fontSize: 28 }} />}
                checkedIcon={<StarIcon sx={{ fontSize: 28 }} />}
                checked={checked}
                onClick={(e) => {e.stopPropagation(); handleChange(applicantId, !checked)}}
            />                      
    )
}