import React from 'react';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';

export default function Home() {
    return (
        <Card className={classes.home}>
            <h1>Welcome back!</h1>
        </Card>
    );
}
