import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment'
import MUITooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const TweetTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {

        return (
            <div className="w-96 text-sm shadow-md bg-neutral-900 opacity-90 rounded-lg shadow outline-0 p-2 text-white fill-white">

                <div className="inline-flex text-white fill-white p-2 align-middle space-x-2">
                    <span className="font-sans flex ">{payload[0].payload.text}</span></div>
                <div className="flex align-middle justify-between">
                    <div className="inline-flex p-2 align-middle space-x-2">
                        <svg className='' viewBox="0 0 24 24" width="1.5em" height="1.5em"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                        <span className="">{payload[0].payload.public_metrics.like_count}</span>
                    </div>
                    <div className="inline-flex p-2 align-middle space-x-2">
                        <svg className='' viewBox="0 0 24 24" width="1.5em" height="1.5em"><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                        <span className="">{payload[0].payload.public_metrics.reply_count}</span>
                    </div>
                    <div className="inline-flex p-2 align-middle space-x-2">
                        <svg className='' viewBox="0 0 24 24" width="1.5em" height="1.5em" ><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>                <path d="M70.676 36.644C70.166 35.636 69.13 35 68 35h-7V19c0-2.21-1.79-4-4-4H34c-2.21 0-4 1.79-4 4s1.79 4 4 4h18c.552 0 .998.446 1 .998V35h-7c-1.13 0-2.165.636-2.676 1.644-.51 1.01-.412 2.22.257 3.13l11 15C55.148 55.545 56.046 56 57 56s1.855-.455 2.42-1.226l11-15c.668-.912.767-2.122.256-3.13zM40 48H22c-.54 0-.97-.427-.992-.96L21 36h7c1.13 0 2.166-.636 2.677-1.644.51-1.01.412-2.22-.257-3.13l-11-15C18.854 15.455 17.956 15 17 15s-1.854.455-2.42 1.226l-11 15c-.667.912-.767 2.122-.255 3.13C3.835 35.365 4.87 36 6 36h7l.012 16.003c.002 2.208 1.792 3.997 4 3.997h22.99c2.208 0 4-1.79 4-4s-1.792-4-4-4z" />
                        <span className="">{payload[0].payload.public_metrics.retweet_count}</span>
                    </div>

                    <div className="inline-flex p-2 align-middle space-x-2">
                    <svg className='' viewBox="0 0 24 24" width="1.5em" height="1.5em" ><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>
                        <span className="">{payload[0].payload.public_metrics.impression_count}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

function plotOnClick(e) {
    window.open("https://twitter.com/x/status/" + e.id, "_blank")
}

export default function TweetScatterChart({ tweets, limit }) {
    var ScatterData;
    tweets ? ScatterData = tweets.filter(e => e.public_metrics.like_count > limit) : [];
    return (
        tweets ?
            <div className='flex self-start w-full col-span-2 rounded-lg shadow shadow-none bg-neutral-900 flex-col p-4 gap-y-4 items-center xl:items-start'>

                <div className='flex w-full justify-between flex-row items-center'>
                    <h2 className="text-gray-200 font-sans font-medium text-xl w-max">
                        Tweets with over 29 likes.</h2>
                    <MUITooltip placement='top' title={"All mentions of @bonk_inu on Twitter in the past 24 hours, filtered to those over 29 likes, hover over each plot to see individual tweets."}>
                        <InfoOutlinedIcon htmlColor="white"></InfoOutlinedIcon>
                    </MUITooltip>
                </div>

                <ResponsiveContainer width="100%" height={300} className='flex bg-neutral-900'>
                    <ScatterChart
                        data={ScatterData}
                        width={400}
                        height={400}
                    >
                        <XAxis dataKey="created_at" title="Time" style={{
                            fontSize: '1rem',
                            fontFamily: 'sans-serif',
                            fill: '#8F92A1',
                        }}
                            axisLine={false}
                            tickFormatter={(unixTime) => moment(unixTime).format('HH:mm Do')}
                            tickLine={false}
                            type="number"
                            tickCount={24}
                            domain={['dataMin', 'dataMax']}
                        ></XAxis>
                        
                        <YAxis dataKey="public_metrics.like_count" axisLine={false} tickLine={false} style={{
                            fontSize: '1rem',
                            fontFamily: 'sans-serif',
                            fill: '#8F92A1',
                        }}

                        ></YAxis>
                        <Tooltip wrapperStyle={{ outline: "none" }} content={<TweetTooltip />} />
                        <CartesianGrid  fillOpacity={0.2} strokeOpacity={0.4} vertical={false}></CartesianGrid>
                        <Scatter animationDuration={300} cursor={'pointer'} data={tweets}
                            fill="#FF8002" fillOpacity={0.5} stroke="#FF8002"
                            onClick={plotOnClick}> </Scatter>
                    </ScatterChart>
                </ResponsiveContainer></div> :
                <div className='flex self-start w-full col-span-2 rounded-lg shadow shadow-none bg-neutral-900 flex-col p-4 gap-y-4 items-center xl:items-start'></div>

    )
}