import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment'
import MUITooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const TweetCountTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="w-max font-sans h-max flex-col rounded-lg shadow-md bg-white outline-0 p-2">
                <div className='flex text-sm text-gray-900'>{moment(payload[0].payload.hour).format('HH:mm Do')}</div>
                <div className='flex text-sm font-semibold text-black items-center space-x-2'>
                    <div className='bg-orange w-4 h-4 rounded-sm'></div>
                    <span> {payload[0].payload.likes} likes</span>
                </div>
                <div className='flex text-sm font-semibold text-black items-center space-x-2'>
                    <div className='bg-light-orange w-4 h-4 rounded-sm'></div>
                    <span> {payload[0].payload.num_contributed} tweets</span>
                </div>

            </div>
        );
    }
    return null;
};

export default function CumulativeChart({ data }) {
    console.log(data)
    return (
        data ?
        <div className='flex w-full col-span-2 row-start-2 rounded-lg shadow shadow-none bg-neutral-900 flex-col p-4 gap-y-4 items-center'>

                <div className='flex w-full justify-between flex-row items-center'>
                    <h2 className="text-gray-200 font-sans font-medium text-xl w-max">
                        Cumulative like count in the last 7 days.</h2>
                    <MUITooltip placement='top'
                    title={"Cumulative likes of tweets mentioning @bonk_inu on Twitter."}>
                        <InfoOutlinedIcon htmlColor="white"></InfoOutlinedIcon>
                    </MUITooltip>
                </div>

                <ResponsiveContainer width="100%" height={300} className='flex bg-neutral-900'>
                    <ComposedChart
                        data={data}
                    >
                        <XAxis dataKey="hour" title="hour" style={{
                            fontSize: '1rem',
                            fontFamily: 'sans-serif',
                            fill: '#8F92A1',
                        }}
                            axisLine={false}
                            tickFormatter={(unixTime) => moment(unixTime).format('HH:mm Do')}
                            tickLine={false}
                            tickCount={5}
                            interval={9}
                            domain={['dataMin', 'dataMax']}
                        ></XAxis>
                        <YAxis dataKey="likes" axisLine={false} tickLine={false} style={{
                            fontSize: '1rem',
                            fontFamily: 'sans-serif',
                            fill: '#8F92A1',
                        }}

                        ></YAxis>
                        <Tooltip wrapperStyle={{ outline: "none" }} content={<TweetCountTooltip />} />
                        <CartesianGrid  fillOpacity={0.2} strokeOpacity={0.4} vertical={false}></CartesianGrid>
                        <Line animationDuration={300} cursor={'pointer'} dataKey="likes"
                        strokeWidth={2} dot={false} type="monotone" stroke="#FF8002"> </Line>
                        <Bar fill="#FFA802" stroke="#FFA802" animationDuration={300}
                        dataKey="indivlikes" fillOpacity={0.5} barSize={40} radius={[4,4,4,4]} ></Bar>
                    </ComposedChart>
                </ResponsiveContainer></div> :
            <div className='flex self-end w-full col-span-2 row-start-3 rounded-lg shadow shadow-none bg-neutral-900 flex-col p-4 gap-y-4 items-center'></div>

    )
}