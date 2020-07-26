import React, { useState, useContext } from "react";
import { addDays, subDays, startOfDay, format } from "date-fns";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Navbar } from "../component/navbar";
import { AdminBalance } from "../component/adminBalance";

export const Balance = () => {
	const { store, actions } = useContext(Context);
	var currentDay = store.currentDay;
	return (
		<>
			<Navbar />
			<div className="container ml-auto ">
				<div className="d-flex align-items-center justify-content-between w-100 my-3">
					<div className="d-flex">
						<i
							className="fa fa-arrow-left ml-3 mb-1"
							aria-hidden="true"
							onClick={() => actions.changeWeekOrDay("beforeDay")}
						/>
					</div>
					<h1>{format(currentDay, "dd/MM")}</h1>
					<div className="d-flex">
						<i
							className="fa fa-arrow-right mr-3 mb-1"
							aria-hidden="true"
							onClick={() => actions.changeWeekOrDay("afterDay")}
						/>
					</div>
				</div>
				{<AdminBalance day={currentDay} />}
			</div>
		</>
	);
};
