import { Description } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { title } from 'process';
import { challenges, difficultyColors } from "../../../data/challenge"
import "./Challenge.css"

import React, { useState } from 'react'

const Challenges = () => <h1>Challenges for you XD</h1>

const AllChallenges = () => {
    const [clicked, onClickChange] = useState(null);
    return(
        <>
        <h1>All Challenges</h1>
        <Stack spacing={2} direction="column">
            {challenges.map((challenge) => (
                <Button style={{backgroundColor: difficultyColors[challenge.level]}} variant="contained">{challenge.title}</Button>
            ))}
        </Stack>
        </>
    );
};



export default AllChallenges;
