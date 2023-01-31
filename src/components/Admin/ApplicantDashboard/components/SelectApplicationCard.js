import React, { useState } from "react";

import Checkbox from "@material-ui/core/Checkbox";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';

export default function SelectApplicationCard({ApplicantName}) {
    
    const [checked, setChecked] = useState(false);
    
    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <span>{ApplicantName}</span>
            <Checkbox
                icon={<StarBorderIcon sx={{ fontSize: 30 }} />}
                checkedIcon={<StarIcon sx={{ fontSize: 30 }} />}
                checked={checked}
                onClick={(e) => {e.stopPropagation(); setChecked(prevState => !prevState)}}
            />                      
        </Box>
    )
}