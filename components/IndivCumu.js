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

export default function IndivCumulativeChart({ data }) {
    return (
        data[0] ?
            <div className='w-full h-full space-y-4'>

                <div className='flex w-full justify-between flex-row items-center'>
                    <h2 className="text-gray-200 font-sans font-medium text-xl w-max">
                        Cumulative like count in the last 7 days.</h2>
                    <MUITooltip placement='top'
                        title={"Cumulative likes of tweets mentioning @bonk_inu on Twitter."}>
                        <InfoOutlinedIcon htmlColor="white"></InfoOutlinedIcon>
                    </MUITooltip>
                </div>

                <ResponsiveContainer width="99%" height={325} className='flex bg-neutral-900'>
                    <ComposedChart data={data}>
                        <XAxis dataKey="hour" title="hour" style={{
                            fontSize: '1rem',
                            fontFamily: 'sans-serif',
                            fill: '#8F92A1',
                        }}
                            axisLine={false}
                            tickFormatter={(unixTime) => moment(unixTime).format('HH:mm Do')}
                            tickLine={false}
                            tickCount={20}
                            interval={75}
                            domain={['dataMin', 'dataMax']}
                        ></XAxis>
                        <YAxis dataKey="likes" axisLine={false} tickLine={false} style={{
                            fontSize: '1rem',
                            fontFamily: 'sans-serif',
                            fill: '#8F92A1',
                        }}

                        ></YAxis>
                        <Tooltip wrapperStyle={{ outline: "none" }} content={<TweetCountTooltip />} />
                        <CartesianGrid fillOpacity={0.2} strokeOpacity={0.4} vertical={false}></CartesianGrid>
                        <Line animationDuration={300} cursor={'pointer'} dataKey="likes"
                            strokeWidth={2} dot={false} type="monotone" stroke="#FF8002"> </Line>
                        <Bar fill="#FFA802" stroke="#FFA802" animationDuration={300}
                            dataKey="indivlikes" fillOpacity={0.5} barSize={40} radius={[4, 4, 4, 4]} ></Bar>
                    </ComposedChart>
                </ResponsiveContainer></div> :

            <div className='flex justify-center w-full h-[350px] rounded-lg shadow shadow-none bg-neutral-900 flex-col p-4 items-center'>
                <div role="flex justify-center items-center">
                    <svg aria-hidden="true" className="inline w-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-light-orange" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>


    )
}