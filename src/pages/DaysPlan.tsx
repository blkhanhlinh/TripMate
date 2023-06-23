import moment from "moment";
import React, { useState } from "react";
import { Attraction } from "../model/Attraction";
import DayPlan from "../components/DayPlan";

type Props = {
    tripId: string;
    dayIndex: number;
};

// dunno how to fetch date :>
const PlanDate = {
    startDate: "24/06/2023",
    endDate: "29/06/2023",
};

const DaysPlan: React.FC<Props> = () => {
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [attractions, setAttractions] = useState<Attraction[]>([]);

    const handleAddAttraction = (attraction: Attraction) => {
        setAttractions([...attractions, attraction]);
    }

    const handleDayClick = (dayIndex: number) => {
        setSelectedDay(dayIndex);
    };

    const startMoment = moment(PlanDate.startDate, "DD/MM/YYYY");
    const endMoment = moment(PlanDate.endDate, "DD/MM/YYYY");
    const dateLength = endMoment.diff(startMoment, "days") + 1;

    const renderDayButtons = () => {
        const dayButtons = [];

        for (let i = 1; i <= dateLength; i++) {
            const dayNumber = i;
            const currentDate = startMoment.clone().add(i - 1, "days");
            const formattedDate = currentDate.format("DD/MM/YYYY");

            dayButtons.push(
                <div key={i} className="day-button-container">
                    <button
                        className={`day-button ${selectedDay === i ? "active" : ""}`}
                        onClick={() => handleDayClick(dayNumber)}
                    >
                        <div className="day-flex">
                            <h3>Day {dayNumber}</h3>
                            <p>{formattedDate}</p>
                        </div>
                    </button>
                </div>
            );
        }

        return dayButtons;
    };

    return (
        <div className="day-plan">
            <div className="days-nav">{renderDayButtons()}</div>
            {selectedDay && (
                <>
                    <DayPlan date={startMoment.clone().add(selectedDay - 1, "days").format("DD/MM/YYYY")} onAddAttraction={handleAddAttraction}/>
                </>
            )}
        </div>
    );
};

export default DaysPlan;