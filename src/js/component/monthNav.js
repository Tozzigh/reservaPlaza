import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { ResumeReserve } from "./resumeReserve";
import { format, getMonth, getYear, set } from "date-fns";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const MonthNav = () => {
	const { actions, store } = useContext(Context);
	const currentDay = store.currentDay;
	const currentMonth = getMonth(currentDay, "M");
	const [showMonth, setMonthDatapicker] = useState(currentMonth);
	const [showYear, setYearDatapicker] = useState(getYear(currentDay));
	const [showListMonth, showMonthpopup] = useState(false);
	const [dataMonthPickerdate, setDataMonthPickerdate] = useState(currentDay);
	const [show, setShow] = useState(false);
	const updatedDate = set(currentDay, { year: showYear, month: showMonth, date: format(currentDay, "d") });
	const arrayMonthsNames = [
		"Enero ",
		"Febrero ",
		"Marzo ",
		"Abril ",
		"Mayo ",
		"Junio ",
		"Julio ",
		"Agosto ",
		"Septiembre ",
		"Octubre ",
		"Noviembre ",
		"Diciembre "
	];

	const monthsTranslator = n => {
		return arrayMonthsNames[n - 1];
	};
	const month = (letter = "M") => {
		return monthsTranslator(format(currentDay, letter));
	};

	const setMonths = (e, month) => {
		let monthNo = arrayMonthsNames.indexOf(month);
		setMonthDatapicker(monthNo);
	};
	const setYear = e => {
		setYearDatapicker(getYear(new Date(e.target.value, showMonth, format(currentDay, "d"))));
	};

	const selectMonthList = () => {
		let popup = arrayMonthsNames.map(month => {
			return (
				<div key={month}>
					<a
						href="#"
						onClick={e => {
							setMonths(e, month);
						}}>
						{month}
					</a>
				</div>
			);
		});
		return <div className="month-popup">{popup}</div>;
	};

	return (
		<>
			<div className="calendar-container">
				<table className="calendar">
					<thead>
						<tr className="calendar-header">
							<td colSpan="5">
								<span className="label-month" onClick={e => showMonthpopup(!showListMonth)}>
									{arrayMonthsNames[showMonth]}
									{"  "}

									<>{showListMonth ? <>{selectMonthList()}</> : <>{}</>}</>
								</span>
								<input
									defaultValue={getYear(currentDay)}
									className="editor-year"
									type="number"
									placeholder="year"
									onChange={e => {
										setYear(e);
									}}
									value={showYear}
								/>
							</td>
						</tr>
					</thead>
					<ResumeReserve
						dataMonthPickerdate={dataMonthPickerdate}
						currentMonth={currentMonth}
						updatedDate={updatedDate}
						showMonth={showMonth}
						showYear={showYear}
					/>
				</table>
			</div>
		</>
	);
};
