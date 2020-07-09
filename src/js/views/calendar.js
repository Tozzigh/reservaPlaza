import React, { useState, useContext, useReducer } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.scss";
import { Scheduler } from "../component/scheduler";
import { Navbar } from "../component/navbar";

export const Calendar = () => {
	const [dropdownOpen, setOpen] = useState(false);

	const toggle = () => setOpen(!dropdownOpen);

	return (
		<div className="scheduler">
			<Navbar />
			<div className="list-group list-group-horizontal">
				<button className="btn btn-block btn-success btnDropdown">Ver espacios</button>

				<ButtonDropdown className="btnDropdown" isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle className="btnDropdown" caret size="md" color="success">
						Espacio a utilizar
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem>Cocina</DropdownItem>
						<DropdownItem>Barra</DropdownItem>
						<DropdownItem>Formación</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
				<input className="btnDropdown" placeholder="Mes en curso" />
				<input className="btnDropdown" placeholder="Horas contratadas" />
				<input className="btnDropdown" placeholder="Horas aplicadas" />
			</div>

			<div className="cont-cal">
				<Scheduler />
			</div>

			<div className="list-group list-group-horizontal d-flex justify-content-center">
				<button className="btn btn-success btnDropdown2">Finalizar</button>
				<button className="btn btn-success btnDropdown2">Reservar otro espacio</button>
			</div>
		</div>
	);
};
