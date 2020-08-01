import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { HoursColumn } from "./hoursColumn";
import "../../styles/home.scss";
import { NewDay } from "./newDay";
import { format, addHours, subHours } from "date-fns";
import { Table, Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export const AdminBalance = n => {
	const { actions, store } = useContext(Context);
	var adminScheduler = [];
	var currentDay = n.day;
	var night = !store.night ? " d-none" : "";
	var scheduleSpaceIDToChange;
	var scheduleDateToChange;
	var scheduleDateHourToChange;

	const [show, setShow] = useState(false);

	function toggle() {
		setShow(!show);
	}

	var hoursOptions = [];
	for (let x = 0; x < 24; x++) {
		let value = x < 10 ? (value = "0" + x.toString() + ":00") : (value = x.toString() + ":00");
		hoursOptions.push(
			<option key={x} value={value}>
				{value}
			</option>
		);
	}

	for (let hour = 0; hour < 25; hour++) {
		var holderSpacesHours = [];
		var titleHour = hour < 11 ? `0${hour - 1}:00` : `${hour - 1}:00`;

		for (let currentSpace = 0; currentSpace < store.spaces.length; currentSpace++) {
			let spaceID = store.spaces[currentSpace]["id"];
			let id = format(subHours(currentDay, 1), "yyyy-MM-dd HH:mm:ss").toString();
			let className = actions.reservedDate(id, spaceID);
			if (hour == 0 && currentSpace == 0) {
				holderSpacesHours.push(
					<>
						<th className="px-2" />
						<th className="px-2 text-center">{store.spaces[currentSpace]["name"]}</th>
					</>
				);
			} else if (hour == 0) {
				holderSpacesHours.push(<th className="px-2 text-center">{store.spaces[currentSpace]["name"]}</th>);
			} else if (currentSpace == 0) {
				holderSpacesHours.push(
					<>
						<th className="px-2 text-center">{titleHour}</th>
						<td
							onClick={e => {
								if (className == " reserved") {
									setShow(!show),
										actions.selectScheduleToChange(e.target.id, store.spaces[currentSpace]["id"]);
								}
							}}
							className={"px-2 text-center" + className}
							id={id}>
							{store.spaces[currentSpace]["schedules"].map(schedule => {
								if (id == format(subHours(new Date(schedule["date"]), 2), "yyyy-MM-dd HH:mm:ss")) {
									return schedule["enterprise_name"];
								}
							})}
						</td>
					</>
				);
			} else {
				holderSpacesHours.push(
					<td
						onClick={e => {
							if (className == " reserved") {
								setShow(!show),
									actions.selectScheduleToChange(e.target.id, store.spaces[currentSpace]["id"]);
							}
						}}
						className={"px-2 text-center" + className}
						id={id}>
						{store.spaces[currentSpace]["schedules"].map(schedule => {
							if (id == format(subHours(new Date(schedule["date"]), 2), "yyyy-MM-dd HH:mm:ss")) {
								return schedule["enterprise_name"];
							}
						})}
					</td>
				);
			}
		}
		adminScheduler.push(<tr className={hour > 0 && hour < 9 ? night : ""}>{holderSpacesHours}</tr>);
		currentDay = addHours(currentDay, 1);
	}

	return (
		<>
			<Table responsive striped bordered hover variant="dark">
				{adminScheduler}
			</Table>
			<Modal className="modalChange" backdrop="false" isOpen={show} toggle={() => setShow(!show)}>
				<ModalBody>
					{store.scheduleToChange ? (
						<ul className="list-group">
							<li className="d-flex justify-content-center py-2">
								<h3 className="text-center">{store.scheduleToChange["enterprise_name"]}</h3>
							</li>
							<li className="d-flex row list-group-item text-left text-capitalize">
								<h3 className="col-2">Salas:</h3>
								<select onChange={e => (scheduleSpaceIDToChange = e.target.value)} className="col-9">
									{store.spaces.map(space => {
										if (store.scheduleToChange["space_id"] == space["id"]) {
											return (
												<option selected key={space["id"]} value={space["id"]}>
													{space["name"]}
												</option>
											);
										} else {
											return (
												<option key={space["id"]} value={space["id"]}>
													{space["name"]}
												</option>
											);
										}
									})}
								</select>
							</li>
							<li className="d-flex row list-group-item text-left text-capitalize">
								<h3 className="col-2">Fecha:</h3>
								<input
									onChange={e => (scheduleDateToChange = e.target.value)}
									className="col-6"
									type="date"
									onKeyDown={e => e.preventDefault()}
								/>
								<h3 className="col-1 ml-3">H:</h3>
								<select onChange={e => (scheduleDateHourToChange = e.target.value)} className="col-2">
									{hoursOptions}
								</select>
							</li>
						</ul>
					) : (
						""
					)}
				</ModalBody>
				<ModalFooter className="m-auto">
					<Button
						color="primary"
						onClick={
							store.scheduleToChange
								? () => {
										actions.changeSchedule(
											scheduleSpaceIDToChange,
											scheduleDateToChange,
											scheduleDateHourToChange
										);
										actions.changeSchedulePUT();
								  }
								: ""
						}>
						Confirmar
					</Button>
					<Button
						color="secondary"
						onClick={() => {
							setShow(!show);
						}}>
						Cancelar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
