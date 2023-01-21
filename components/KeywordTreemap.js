import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import MUITooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function KeywordTreemap({ keywords }) {
    return (
        keywords ?
            <div className='flex w-full col-span-2 row-start-2 rounded-lg shadow dark:shadow-none dark:bg-neutral-900 flex-col p-4 gap-y-4 items-center'>

                <div className='flex w-full justify-between flex-row items-center'>
                    <h2 className="text-gray-700 dark:text-gray-200 font-sans font-medium text-xl w-max">
                        Total tweet count in the last 7 days.</h2>
                    <MUITooltip placement='top'
                    title={"All mentions of @bonk_inu on Twitter in the past 7 days, unfiltered."}>
                        <InfoOutlinedIcon htmlColor="white"></InfoOutlinedIcon>
                    </MUITooltip>
                </div>

                <ResponsiveContainer width="100%" height={1000} className="flex bg-neutral-900">
                    <Treemap width={400} height={1000} data={keywords} dataKey="count" stroke="#fff" fill="#FF8002" />
                </ResponsiveContainer> 
                <Tooltip></Tooltip>
            </div>:
            <div className='w-[100%] h-[400px] flex h-screen bg-purple rounded-lg'></div>

    )
}
