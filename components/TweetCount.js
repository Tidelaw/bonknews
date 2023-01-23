import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment'
import MUITooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const TweetCountTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="w-max font-sans h-max flex-col rounded-lg shadow-md bg-white outline-0 p-2">
                <div className='flex text-sm text-gray-900'>{moment(Date.parse(payload[0].payload.start)).format('HH:mm Do')}</div>
                <div className='flex text-sm font-semibold text-black items-center space-x-2'>
                    <div className='bg-orange w-4 h-4 rounded-sm'></div>
                    <span> {payload[0].payload.tweet_count} tweets</span>
                </div>
            </div>
        );
    }
    return null;
};

export default function TweetCountChart({ volume }) {
    return (
        volume ?
            <div className='w-full h-full space-y-4'>

                <div className='flex w-full justify-between flex-row items-center'>
                    <h2 className="text-gray-200 font-sans font-medium text-xl w-max">
                        Total tweet count in the last 7 days.</h2>
                    <MUITooltip placement='top'
                    title={"All mentions of @bonk_inu on Twitter in the past 7 days, unfiltered."}>
                        <InfoOutlinedIcon htmlColor="white"></InfoOutlinedIcon>
                    </MUITooltip>
                </div>

                <ResponsiveContainer width="100%" height={325} className='flex bg-neutral-900'>
                    <LineChart
                        data={volume}

                    >
                        <XAxis dataKey="start" title="Time" style={{
                            fontSize: '1rem',
                            fontFamily: 'sans-serif',
                            fill: '#8F92A1',
                        }}
                            axisLine={false}
                            tickFormatter={(unixTime) => moment(Date.parse(unixTime)).format('HH:mm Do')}
                            tickLine={false}
                            tickCount={8}
                            interval={20}
                            domain={['dataMin', 'dataMax']}
                        ></XAxis>
                        <YAxis dataKey="tweet_count" axisLine={false} tickLine={false} style={{
                            fontSize: '1rem',
                            fontFamily: 'sans-serif',
                            fill: '#8F92A1',
                        }}

                        ></YAxis>
                        <Tooltip wrapperStyle={{ outline: "none" }} content={<TweetCountTooltip />} />
                        <CartesianGrid  fillOpacity={0.2} strokeOpacity={0.4} vertical={false}></CartesianGrid>
                        <Line animationDuration={300} cursor={'pointer'} dataKey="tweet_count"
                        strokeWidth={2} dot={false}
                         type="monotone"
                            stroke="#FF8002"> </Line>
                    </LineChart>
                </ResponsiveContainer></div> :
            <div className='flex w-full col-span-2 row-start-2 rounded-lg shadow dark:shadow-none dark:bg-neutral-900 flex-col p-4 gap-y-4 items-center'></div>

    )
}