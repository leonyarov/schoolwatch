"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


export default function CalendarPage() {
    const events = [
        { title: 'Meeting', start: new Date() }
    ]

    return (
        <div className='calendar-container'>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={events}
                eventContent={renderEventContent}
            />
        </div>
    )
}

function renderEventContent(eventInfo) {
    return (
        <>
            <p>{eventInfo.timeText}</p>
            <p>{eventInfo.event.title}</p>
        </>
    )
}