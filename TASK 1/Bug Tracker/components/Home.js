import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import HomeSkeleton from './HomeSkeleton'
import TicketOverView from './TicketOverview'
import TicketStatusOverview from './TicketSTatusOverview'
import TicketTypeOverview from './TicketTypeOverview'

const fetcher = url => fetch(url).then(r => r.json().then(console.log("fetched data")))

function Home({session}) {
    const { data, error, isValidating } = useSWR(`api/getTicketsByUserID/${session?.user?.email}`, fetcher)

if (!data) return <HomeSkeleton />
if (data) return (
    <div>
        {
            data &&  
            <>
                <TicketOverView tickets={data.TicketsForUser}/>
                <div className='pt-5'>
                    <TicketTypeOverview tickets={data.TicketsForUser}/>
                </div>
                <div className='pt-5'>
                    <TicketStatusOverview tickets={data.TicketsForUser}/>
                </div>
            </>
        }
    </div>
    )
}

export default Home